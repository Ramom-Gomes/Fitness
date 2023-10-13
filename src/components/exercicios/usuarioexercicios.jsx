import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function UserExerciseList() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Obtém o usuário logado do localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const users = JSON.parse(localStorage.getItem('users'));

  // Encontre o usuário atual com base no email
  const loggedInUser = users.find((user) => user.email === currentUser.email);

  // Obtenha os planos do usuário atual
  const userPlans = loggedInUser ? loggedInUser.planos : [];

  // Função para selecionar um plano
  const selectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  // Função para voltar à lista de planos
  const goBack = () => {
    setSelectedPlan(null);
  };

  return (
    <div className='container-meusPlanos'>
      <h1 className='meusPlanosTitulo'>Meus planos:</h1>
      {selectedPlan ? (
        <div className='meusPlanosLista'>
          <button className='MeusPlanosBotaoVoltarList' onClick={goBack}>Voltar para a lista de planos</button>
          <h2 className='MeusPlanosPlano'>Exercícios no Plano: {selectedPlan.name}</h2>
          <ul className='listaDosExercicios'>
            {selectedPlan.exercises.map((exercise, index) => (
              <li className='exercicios' key={index}>
                <div>
                  <p className='exerciciosNumero'>Número: {exercise.id}</p>
                  <h3 className='exerciciosNome'>Nome: {exercise.name}</h3>
                  <p className='exerciciosEquipamento'>Equipamento: {exercise.equipment}</p>
                  <p className='exerciciosAlvo'>Músculo alvo: {exercise.target}</p>
                </div>
                <img className='exerciciosImagem' src={exercise.gifUrl} alt="" />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul className='meus-planos'>
          {userPlans && userPlans.length > 0 ? (
            userPlans.map((plan, index) => (
              <li key={index}>
                <button className='planos-existentes' onClick={() => selectPlan(plan)}>{plan.name}</button>
              </li>
            ))
          ) : (
            <p className='semPlanos'>Nenhum plano criado ainda,
              visualize nossos <Link className='linkPlano' to="/exercise-list">exercícios</Link> e 
              crie um plano personalizado para você.
            </p>
          )}
        </ul>
      )}
    </div>
  );
}

export default UserExerciseList;
