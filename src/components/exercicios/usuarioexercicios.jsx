import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function UserExerciseList() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userPlansForEmail, setUserPlansForEmail] = useState({});
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    // Atualize o estado de userPlansForEmail quando o componente montar e sempre que o usuário mudar.
    const userEmail = currentUser.email;
    const userPlans = JSON.parse(localStorage.getItem('planos')) || {};
    setUserPlansForEmail(userPlans[userEmail] || {});
  }, [currentUser]);

  const selectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const goBack = () => {
    setSelectedPlan(null);
  };

  const handleDeletePlan = (planName) => {
    const updatedPlans = { ...userPlansForEmail };
    delete updatedPlans[planName];

    // Atualize o estado e o armazenamento local após a exclusão
    const userEmail = currentUser.email;
    const userPlans = JSON.parse(localStorage.getItem('planos')) || {};
    userPlans[userEmail] = updatedPlans;
    localStorage.setItem('planos', JSON.stringify(userPlans));
    setUserPlansForEmail(updatedPlans);
    setSelectedPlan(null);
  };

  return (
    <div className='container-meusPlanos'>
      <h1 className='meusPlanosTitulo'>Meus planos:</h1>
      {Object.keys(userPlansForEmail).length === 0 ? (
        <p className='semPlanos'>Nenhum plano criado ainda, visualize nossos <Link className='linkPlano' to="/exercise-list">exercícios</Link> e crie um plano personalizado para você. </p>
      ) : selectedPlan ? (
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
              <button
                className='excluir-plano'
                onClick={() => handleDeletePlan(plan.name)}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserExerciseList;
