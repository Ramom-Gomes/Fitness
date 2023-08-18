import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function LoginPage({ users }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Verifica se o usuário existe no localStorage
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Navegar para a página de boas-vindas com o nome do usuário
      navigate(`/bemvindo/${user.nome}`);
    } else {
      alert("cria seu usuario porra!")
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