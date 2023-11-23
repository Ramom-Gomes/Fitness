import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../estilizações/login.css';
import Musculação from '../images/Musculação.png';

function LoginPage() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [errorUser, setErrorUser] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setEmail(storedUser.email);
      setPassword(storedUser.password);
    }
  }, []);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.email === email);

    if (!user) {
      setErrorUser("Usuário não encontrado.");
      setErrorPassword("");
      return;
    }

    if (user.password !== password) {
      setErrorPassword("Senha incorreta.");
      setErrorUser("");
      return;
    }

    const updatedUser = {
      ...user,
      planos: user.planos
    };

    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    navigate(`/Home`);
  };

  

  return (
    <div className={`container${theme === 'light' ? '-light' : ''}`}>
      <main className={`main`}>
        <img src={Musculação} className="imagem" alt="" />
        <input className={`campo-email`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <p className={`email-error-login ${errorUser ? 'show' : ''}`}>{errorUser}</p>
        <input className={`campo-senha`} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <p className={`senha-error-login ${errorPassword ? 'show' : ''}`}>{errorPassword}</p>

        <div className={`links-login`}>
          <Link className={`link-criarLogin`} to="/registro">Criar meu login</Link>
          <Link className={`link-redefinirSenha`} to="/trocar-senha">Esqueci minha senha</Link>
        </div>
        <button className={`botao-login`} onClick={handleLogin}>Login</button>
      </main>
    </div>
  );
}

export default LoginPage;
