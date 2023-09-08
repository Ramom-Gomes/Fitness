import React from 'react';

function UserExerciseList() {
  // Obtém o usuário logado do localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

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
