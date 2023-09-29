import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function BemVindo() {
  const navigate = useNavigate();
  const menuOpen = useSelector((state) => state.menu.menuOpen);

  const [userData, setUserData] = useState({
    nome: "",
    idade: "",
    peso: "",
    altura: "",
    sexo: "",
    objetivo: "",
    nivelCondicionamento: "",
    frequenciaTreino: "",
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUserData({
        nome: currentUser.nome,
        idade: currentUser.idade,
        peso: currentUser.peso,
        altura: currentUser.altura,
        sexo: currentUser.sexo,
        objetivo: currentUser.objetivo,
        nivelCondicionamento: currentUser.nivelCondicionamento,
        frequenciaTreino: currentUser.frequenciaTreino,
      });
    }
  }, []);

  const handleLogout = () => {
    // Redirecionar para a página de login
    navigate('/');
  };

  return (
    <div className={`content ${menuOpen ? 'content-shifted' : ''}`}>
      <h2>Olá, {userData.nome}!</h2>
      <p>Idade: {userData.idade}</p>
      <p>Peso: {userData.peso} kg</p>
      <p>Altura: {userData.altura} m</p>
      <p>Sexo: {userData.sexo}</p>
      <p>Objetivo: {userData.objetivo}</p>
      <p>Nível de Condicionamento: {userData.nivelCondicionamento}</p>
      <p>Frequência de Treino: {userData.frequenciaTreino}</p>
      <Link to="/atualizar-usuario">Atualizar Informações</Link>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default BemVindo;
