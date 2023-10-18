import React, { useState } from 'react';
import './exercicios.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function AddExerciseScreen({ exercise, onClose }) {
  const [creatingPlan, setCreatingPlan] = useState(false);
  const [newPlanName, setNewPlanName] = useState('');

  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const userEmail = currentUser.email;

  // Recupere os planos do usuário atual com base em seu e-mail
  const userPlans = JSON.parse(localStorage.getItem('planos')) || {};
  const userPlansForEmail = userPlans[userEmail] || {};

  const handleCreatePlan = () => {
    setCreatingPlan(true);
  };

  const handleSavePlan = () => {
    const newPlan = { name: newPlanName, exercises: [exercise] };

    if (userPlansForEmail[newPlanName]) {
      alert('Já existe um plano com esse nome. Escolha outro nome para o plano.');
      return;
    }

    userPlansForEmail[newPlanName] = newPlan;

    // Atualize os planos do usuário atual com base em seu e-mail
    userPlans[userEmail] = userPlansForEmail;

    localStorage.setItem('planos', JSON.stringify(userPlans));

    setCreatingPlan(false);
    setNewPlanName('');
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <AiOutlineCloseCircle onClick={onClose} size={25} className='modal-close'/>
        <h2 className='adicionar-titulo'>Adicione o exercício</h2>
        <p className='adicionar-nome'>Nome do Exercício: {exercise.name}</p>

        {!creatingPlan ? (
          <div>
            <button className='criarPlano' onClick={handleCreatePlan}>Criar meu Plano</button>
            {Object.keys(userPlansForEmail).length > 0 && (
              <div>
                <h3 className='meusPlanos-titulo'>Meus Planos:</h3>
                <ul>
                  {Object.keys(userPlansForEmail).map((planName, planIndex) => (
                    <button
                      className='planosExistentes'
                      key={planIndex}
                      onClick={() => {
                        const selectedPlan = userPlansForEmail[planName];
                        if (selectedPlan.exercises.find((ex) => ex.id === exercise.id)) {
                          alert('Este exercício já está no plano.');
                        } else {
                          selectedPlan.exercises.push(exercise);
                          localStorage.setItem('planos', JSON.stringify(userPlans));
                          onClose();
                        }
                      }}
                    >
                      {planName}
                    </button>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Nome do Plano"
              value={newPlanName}
              onChange={(e) => setNewPlanName(e.target.value)}
            />
            <button className="salvarPlano" onClick={handleSavePlan}>Salvar Plano</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddExerciseScreen;
