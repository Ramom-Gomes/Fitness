import React, { useEffect, useState } from 'react';

function ExerciseList() {
  const [exerciseList, setExerciseList] = useState([]);
  
  const loadExercises = async () => {
    const url = 'https://exercisedb.p.rapidapi.com/exercises';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3a240a2a0bmsh5f1c9de784f6d77p11cd54jsnd98baf62906d',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const result = await response.json();
        setExerciseList(result);
      } else {
        console.error('Erro na resposta da API:', response.status);
      }
    } catch (error) {
      console.error('Erro ao buscar os dados dos exercícios:', error);
    }
  };

  useEffect(() => {
    loadExercises();
  }, []);

  const addExerciseToUser = (exercise) => {
    // Obtenha o usuário logado do localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Verifique se o usuário já possui uma lista de exercícios (você pode criar uma se não existir)
    if (!currentUser.exercises) {
      currentUser.exercises = [];
    }

    // Adicione o exercício à lista de exercícios do usuário
    currentUser.exercises.push(exercise);

    // Atualize o usuário no localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Confirme a adição (você pode mostrar uma mensagem ou fazer o que preferir)
    alert(`Exercício "${exercise.name}" adicionado ao seu perfil.`);
  };

  return (
    <div>
      <h1>Lista de Exercícios</h1>
      <ul>
        {exerciseList.map((exercise, index) => (
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
            <button onClick={() => addExerciseToUser(exercise)}>Adicionar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExerciseList;
