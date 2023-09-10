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
    <div>
      <h1>Exercícios Adicionados</h1>
      {selectedPlan ? (
        <div>
          <button onClick={goBack}>Voltar para a lista de planos</button>
          <h2>Exercícios no Plano: {selectedPlan.name}</h2>
          <ul>
            {selectedPlan.exercises.map((exercise, index) => (
              <li key={index}>
                <h3>Nome: {exercise.name}</h3>
                {/* Renderize outras informações do exercício */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul>
          {currentUser && currentUser.planos ? (
            currentUser.planos.map((plan, index) => (
              <li key={index}>
                <button onClick={() => selectPlan(plan)}>{plan.name}</button>
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
