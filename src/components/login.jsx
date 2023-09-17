import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from 'react-icons/fa';
import '../estilizações/login.css';

function LoginPage({ users }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorUser, setErrorUser] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setEmail(currentUser.email);
      setPassword(currentUser.password);
    }
  }, []);

  const handleLogin = () => {
    const user = users.find(
      (user) => user.email === email
    );
  
    if (!user) {
      setErrorUser("Usuário não encontrado.");
      setErrorPassword("");
    } else if (user.password !== password) {
      setErrorPassword("Senha incorreta.");
      setErrorUser("");
    } else {
      localStorage.setItem('currentUser', JSON.stringify(user)); // Armazena o usuário logado no localStorage
      navigate(`/bemvindo`); // Navegar para a página de boas-vindas
    }
  };

  return (
    <div className={`container`}>
      <main className={`main`}>
        <h2 className={`imagem`}>Login</h2>
        <input className={`campo-email`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errorUser && <p>{errorUser}</p>}
        <input className={`campo-senha`} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errorPassword && <p>{errorPassword}</p>}
        <div className={`links`}>
          <Link className={`link-criarLogin`} to="/registro">Criar meu login</Link>
          <Link className={`link-redefinirSenha`} to="/trocar-senha">Esqueci minha senha</Link>
        </div>
        <button className={`botao-login`} onClick={handleLogin}>Login</button>
      </main>
    </div>
  );
}

export default LoginPage;
