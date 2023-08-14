import React, { useState, useEffect } from "react";
import LoginPage from "./components/login";
import RegisterPage from "./components/registro";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const registerUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div>
      {/* Renderize o componente de login */}
      <LoginPage />

      {/* Renderize o componente de registro, passando a função registerUser */}
      <RegisterPage registerUser={registerUser} />
      
      {/* Outros componentes e funcionalidades */}
    </div>
  );
}

export default App;
