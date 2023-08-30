import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
      <p>
        Ainda não tem um login? <Link to="/registro">Criar meu login</Link>
      </p>
    </div>
  );
}

export default LoginPage;
