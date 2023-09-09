import React, { useState } from 'react';
import './style.css'; // Importe o arquivo de estilo

function AddExerciseScreen({ exercise, onClose }) {
  const [creatingPlan, setCreatingPlan] = useState(false);
  const [newPlanName, setNewPlanName] = useState('');

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

    // Adicione o novo plano aos planos do usuário
    currentUser.planos.push(newPlan);

    // Atualize o usuário no localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Após a conclusão, redefina o estado
    setCreatingPlan(false);
    setNewPlanName('');
  };

  const handleAddExercise = () => {
    // Lógica para adicionar o exercício ao usuário
    // ...
    // Após a conclusão, chame onClose para fechar a tela
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
        <button onClick={handleAddExercise}>Adicionar</button>

        {!creatingPlan ? (
          <button onClick={handleCreatePlan}>Criar meu Plano</button>
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
