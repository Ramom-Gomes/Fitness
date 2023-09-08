import React from 'react';

function UserExerciseList() {
  // Obtém o usuário logado do localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Função para remover um exercício da lista do usuário
  const removeExercise = (index) => {
    // Certifique-se de que o usuário e a lista de exercícios existem
    if (currentUser && currentUser.exercises && currentUser.exercises.length > 0) {
      // Remova o exercício pelo índice
      currentUser.exercises.splice(index, 1);

      // Atualize o usuário no localStorage
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      // Força a atualização do componente para refletir as mudanças
      window.location.reload();
    }
  };

  return (
    <div>
      <h1>Exercícios Adicionados</h1>
      <ul>
        {currentUser && currentUser.exercises ? (
          currentUser.exercises.map((exercise, index) => (
            <li key={index}>
              <h3>Nome: {exercise.name}</h3>
              <p>ID: {exercise.id}</p>
              <p>Parte do Corpo: {exercise.bodyPart}</p>
              <p>Equipamento: {exercise.equipment}</p>
              <img
                src={exercise.gifUrl}
                alt={`Imagem do exercício ${exercise.name}`}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <p>Alvo: {exercise.target}</p>
              <button onClick={() => removeExercise(index)}>Remover</button>
            </li>
          ))
        ) : (
          <p>Nenhum exercício adicionado ainda.</p>
        )}
      </ul>
    </div>
  );
}

export default UserExerciseList;
