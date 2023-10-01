import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../estilizações/login.css';
import AlterarTema from './BotãoAlterarTema';
import { connect } from 'react-redux';
import Musculação from '../images/Musculação.png'

function LoginPage({ users, theme }) {
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

const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps)(LoginPage); // Conecte o componente ao Redux
