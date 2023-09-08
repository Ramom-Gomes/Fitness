import React, { useEffect, useState } from 'react';

function ExerciseList() {
  const [exerciseList, setExerciseList] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const loadExercises = async (start) => {
    const url = `https://exercisedb.p.rapidapi.com/exercises?start=${start}&limit=20&sort=id`; // Adicione &sort=id
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
    loadExercises(startIndex);
  }, [startIndex]);

  const handleNext = () => {
    setStartIndex(startIndex + 20);
  };

  const handlePrevious = () => {
    if (startIndex >= 20) {
      setStartIndex(startIndex - 20);
    }
  };

  return (
    <div>
      <h1>Lista de Exercícios</h1>
      <button onClick={handlePrevious} disabled={startIndex === 0}>
        Anterior
      </button>
      <button onClick={handleNext}>Próximo</button>
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExerciseList;
