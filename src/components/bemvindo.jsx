import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function BemVindo() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    nome: "",
    idade: "",
    peso: "",
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUserData({
        nome: currentUser.nome,
        idade: currentUser.idade,
        peso: currentUser.peso,
      });
    }
  }, []);

  const handleLogout = () => {
    // Redirecionar para a página de login
    navigate('/');
  };

  return (
    <div>
      <h2>Olá, {userData.nome}!</h2>
      <p>Idade: {userData.idade}</p>
      <p>Peso: {userData.peso} kg</p>
      <Link to="/atualizar-usuario">Atualizar Informações</Link>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default BemVindo;
