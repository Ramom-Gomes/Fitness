import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function LoginPage({ users }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
  
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user)); // Armazena o usuário logado no localStorage
      navigate(`/bemvindo`); // Navegar para a página de boas-vindas
    } else {
      alert("Crie seu usuário, por favor!");
      // Lógica para tratamento de erro ou feedback de login inválido
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>
        Ainda não tem um login? <Link to="/registro">Criar meu login</Link>
      </p>
    </div>
  );
}

export default LoginPage; 