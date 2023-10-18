import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function UserExerciseList() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userPlans = JSON.parse(localStorage.getItem('planos')) || {};

  const userEmail = currentUser.email;
  const userPlansForEmail = userPlans[userEmail] || {};

  const selectPlan = (plan) => {
    setSelectedPlan(plan);
  };

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
          {Object.values(userPlansForEmail).map((plan, index) => (
            <li key={index}>
              <button className='planos-existentes' onClick={() => selectPlan(plan)}>{plan.name}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserExerciseList;
