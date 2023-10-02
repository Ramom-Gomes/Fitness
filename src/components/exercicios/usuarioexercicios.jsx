import React, { useState } from 'react';

function UserExerciseList() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Obtém o usuário logado do localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

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
          <ul>
            {selectedPlan.exercises.map((exercise, index) => (
              <li key={index}>
                <h3>Nome: {exercise.name}</h3>
                <img src={exercise.gifUrl} alt="" />
                {/* Renderize outras informações do exercício */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul className='meus-planos'>
          {currentUser && currentUser.planos ? (
            currentUser.planos.map((plan, index) => (
              <li key={index}>
                <button className='planos-existentes' onClick={() => selectPlan(plan)}>{plan.name}</button>
              </li>
            ))
          ) : (
            <p>Nenhum plano adicionado ainda.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default UserExerciseList;
