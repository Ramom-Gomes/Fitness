import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importe o componente Link


function LoginPage({ registerUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implemente a lógica de autenticação aqui
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