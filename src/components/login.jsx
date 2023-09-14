import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from 'react-icons/fa';
import '../estilizações/login.css';

function LoginPage({ users }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      setError("Usuário não encontrado.");
    } else if (user.password !== password) {
      setError("Senha incorreta.");
    } else {
      localStorage.setItem('currentUser', JSON.stringify(user)); // Armazena o usuário logado no localStorage
      navigate(`/bemvindo`); // Navegar para a página de boas-vindas
    }
  };

  return (
    <>
      <main className={`main`}>
        <h2>Login</h2>
        <input className={`campo-email`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {error && <p>{error}</p>}
        <input className={`campo-senha`} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p>{error}</p>}
        <div className={`links`}>
          <Link className={`link-criarLogin`} to="/registro">Criar meu login</Link>
          <Link className={`link-redefinirSenha`} to="/trocar-senha">Esqueci minha senha</Link>
        </div>
        <button className={`botao-login`} onClick={handleLogin}>Login</button>
      </main>
    </>
  );
}

export default LoginPage;
