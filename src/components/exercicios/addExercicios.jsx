import React, { useState, useEffect } from 'react';
import './exercicios.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function AddExerciseScreen({ exercise, onClose }) {
  const [creatingPlan, setCreatingPlan] = useState(false);
  const [newPlanName, setNewPlanName] = useState('');
  const [existingPlans, setExistingPlans] = useState([]);
  const [userWithEmail, setUserWithEmail] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    if (currentUser.planos) {
      setExistingPlans(currentUser.planos);
    }
    setUserWithEmail(currentUser);
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(allUsers);
  }, []);

  const handleCreatePlan = () => {
    setCreatingPlan(true);
  };

  const handleSavePlan = () => {
    const newPlan = { name: newPlanName, exercises: [exercise] };
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

    if (!currentUser.planos) {
      currentUser.planos = [];
    }

    const existingPlan = currentUser.planos.find((plan) => plan.name === newPlanName);
    if (existingPlan) {
      alert('Já existe um plano com esse nome. Escolha outro nome para o plano.');
      return;
    }

    currentUser.planos.push(newPlan);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    const updatedUsers = users.map((user) => {
      if (user.email === currentUser.email) {
        user.planos = user.planos || [];
        user.planos.push(newPlan);
      }
      return user;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Atualize o estado dos usuários com os novos planos
    setUsers(updatedUsers);

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
            {users && users.length > 0 && (
              <div>
                <h3 className='meusPlanos-titulo'>Meus Planos:</h3>
                <ul>
                  {users.map((user, index) => (
                    user.planos && user.planos.length > 0 && (
                      <div key={index}>
                        <h4>{user.email}'s Planos:</h4>
                        <ul>
                          {user.planos.map((plan, planIndex) => (
                            <button
                              className='planosExistentes'
                              key={index + planIndex}
                              onClick={() => {
                                if (plan.exercises.find((ex) => ex.id === exercise.id)) {
                                  alert('Este exercício já está no plano.');
                                } else {
                                  const updatedPlans = user.planos.map((p) => {
                                    if (p.name === plan.name) {
                                      p.exercises.push(exercise);
                                    }
                                    return p;
                                  });

                                  // Atualize o estado do usuário com os planos atualizados
                                  user.planos = updatedPlans;
                                  localStorage.setItem('users', JSON.stringify(users));

                                  onClose();
                                }
                              }}
                            >
                              {plan.name}
                            </button>
                          ))}
                        </ul>
                      </div>
                    )
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
            <button onClick={handleSavePlan}>Salvar Plano</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddExerciseScreen;
