import React, { useState, useEffect } from 'react';
import './exercicios.css'; // Importe o arquivo de estilo

function AddExerciseScreen({ exercise, onClose }) {
  const [creatingPlan, setCreatingPlan] = useState(false);
  const [newPlanName, setNewPlanName] = useState('');
  const [existingPlans, setExistingPlans] = useState([]); // Armazenar planos existentes

  useEffect(() => {
    // Quando a tela é aberta, verifique se o usuário tem planos existentes no localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.planos) {
      setExistingPlans(currentUser.planos);
    }
  }, []);

  const handleCreatePlan = () => {
    setCreatingPlan(true);
  };

  const handleSavePlan = () => {
    // Lógica para salvar o novo plano
    const newPlan = { name: newPlanName, exercises: [exercise] }; // Inclui o exercício atual no plano

    // Obtenha o usuário logado do localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Verifique se o usuário tem a propriedade "planos"
    if (!currentUser.planos) {
      currentUser.planos = [];
    }

    // Verifique se já existe um plano com o mesmo nome
    const existingPlan = currentUser.planos.find((plan) => plan.name === newPlanName);
    if (existingPlan) {
      alert('Já existe um plano com esse nome. Escolha outro nome para o plano.');
      return;
    }

    // Adicione o novo plano aos planos do usuário
    currentUser.planos.push(newPlan);

    // Atualize o usuário no localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Após a conclusão, redefina o estado
    setCreatingPlan(false);
    setNewPlanName('');
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <h2>Adicionar Exercício</h2>
        <p>Nome do Exercício: {exercise.name}</p>
        {/* Outros campos para adicionar informações do exercício */}

        {!creatingPlan ? (
          <div>
            <button onClick={handleCreatePlan}>Criar meu Plano</button>

            {/* Exibir planos existentes como botões */}
            {existingPlans.length > 0 && (
              <div>
                <h3>Meus Planos Existentes:</h3>
                <ul>
                  {existingPlans.map((plan, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        // Verifique se o exercício já está no plano
                        if (plan.exercises.find((ex) => ex.id === exercise.id)) {
                          alert('Este exercício já está no plano.');
                        } else {
                          // Adicione o exercício ao plano selecionado
                          const updatedPlans = existingPlans.map((p) => {
                            if (p.name === plan.name) {
                              p.exercises.push(exercise);
                            }
                            return p;
                          });

                          // Atualize os planos do usuário no localStorage
                          const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                          currentUser.planos = updatedPlans;
                          localStorage.setItem('currentUser', JSON.stringify(currentUser));

                          // Feche a tela após adicionar o exercício ao plano
                          onClose();
                        }
                      }}
                    >
                      {plan.name}
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
            <button onClick={handleSavePlan}>Salvar Plano</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddExerciseScreen;
