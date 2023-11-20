import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../estilizações/informacoes.css';
import { Link } from "react-router-dom";

function AtualizarUsuario() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  const [userStats, setUserStats] = useState({
    planCount: 0,
    exerciseCount: 0,
    updateCount: 0,
  });

  useEffect(() => {
    // Obtenha as informações do usuário do localStorage ou da API, se aplicável
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    setCurrentUser(currentUser);
    
    // Obtenha a contagem de planos do usuário
    const userPlans = JSON.parse(localStorage.getItem("planos")) || {};
    const planCount = Object.keys(userPlans[currentUser.email] || {}).length;

    // Obtenha a contagem total de exercícios nos planos do usuário
    const exerciseCount = Object.values(userPlans[currentUser.email] || {}).reduce(
      (total, plan) => total + (plan.exercises ? plan.exercises.length : 0),
      0
    );

    // Obtenha a contagem de atualizações do usuário
    const userEmail = currentUser.email;
    const updatesObject = JSON.parse(localStorage.getItem("atualizacoes")) || {};
    const updateCount = (updatesObject[userEmail] || []).length;

    // Atualize o estado com as estatísticas do usuário
    setUserStats({
      planCount,
      exerciseCount,
      updateCount,
    });
  }, []); // Execute apenas uma vez no montagem do componente

  return (
    <div className="containerInfo">
      <div className="positionInputs">
        <h2 className="tituloInfo">Seu Perfil:</h2>
        <p className="Qt">Quantidade de Planos: {userStats.planCount}</p>
        <p className="Qt">Quantidade de Exercícios nos Planos: {userStats.exerciseCount}</p>
        <p className="Qt">Quantidade de Atualizações: {userStats.updateCount}</p>
          <label className="Input">Nome: {currentUser.nome}</label><br />
          <label className="Input">Idade: {currentUser.idade}</label><br />
          <label className="Input">Peso: {currentUser.peso}</label><br />
          <label className="Input">Palavra-Chave: {currentUser.palavraChave}</label><br />
          <label className="Input">Altura: {currentUser.altura}</label><br />
          <label className="Input">Sexo: {currentUser.sexo}</label><br />
          <label className="Input">Objetivo: {currentUser.objetivo}</label><br />
          <label className="Inputt">Nível de Condicionamento: {currentUser.nivelCondicionamento}</label><br />
          <label className="Input">Frequência de Treino: {currentUser.frequenciaTreino}</label><br />
        <button className="botaoInfoOfici" onClick={() => navigate(-1)}>
          Voltar
        </button>
        <button className="botaoInfoOfici" onClick={() => navigate("/")}>
          Sair
        </button>
        <p className="infoSemAtualizacoes">Para atualizar suas informações clique <Link className="linksHome" to="/atualizarInformacoes">aqui</Link></p>
      </div>
    </div>
  );
}

export default AtualizarUsuario;
