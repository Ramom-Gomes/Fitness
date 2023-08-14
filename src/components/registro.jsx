import React, { useState } from "react";

function RegisterPage({ registerUser }) {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    nome: "",
    idade: "",
    peso: "",
  });

  const handleRegister = () => {
    // Implemente a lógica de registro de usuário aqui
    registerUser(newUser); // Adiciona o novo usuário ao estado
    setNewUser({
      email: "",
      password: "",
      nome: "",
      idade: "",
      peso: "",
    }); // Limpa os campos do formulário após o registro
  };

  return (
    <div>
      <h2>Registro</h2>
      <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
      <input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
      <input type="text" value={newUser.nome} onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })} />
      <input type="text" value={newUser.idade} onChange={(e) => setNewUser({ ...newUser, idade: e.target.value })} />
      <input type="text" value={newUser.peso} onChange={(e) => setNewUser({ ...newUser, peso: e.target.value })} />
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
}

export default RegisterPage;