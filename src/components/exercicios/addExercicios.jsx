import React from 'react';
import './style.css'; // Importe o arquivo de estilo

function AddExerciseScreen({ exercise, onClose }) {
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
      </div>
    </div>
  );
}

export default AddExerciseScreen;
