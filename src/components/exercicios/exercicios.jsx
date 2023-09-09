import React, { useEffect, useState } from 'react';
import AddExerciseScreen from './addExercicios';

function BodyPartList() {
  const [bodyParts, setBodyParts] = useState([
    'waist',
    'upper legs',
    'back',
    'lower legs',
    'chest',
    'upper arms',
    'cardio',
    'shoulders',
    'lower arms',
    'neck',
  ]);

  const [selectedBodyPart, setSelectedBodyPart] = useState('waist'); // Defina "waist" como o valor inicial
  const [exerciseData, setExerciseData] = useState({});
  const [showAddExerciseScreen, setShowAddExerciseScreen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleAddExercise = (exercise) => {
    setSelectedExercise(exercise);
    setShowAddExerciseScreen(true);
    console.log("sim");
  };

  const handleCloseAddExerciseScreen = () => {
    setShowAddExerciseScreen(false);
    setSelectedExercise(null);
  };

  const loadExercisesByBodyPart = async (bodyPart) => {
    const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`;
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
        setExerciseData((prevData) => ({
          ...prevData,
          [bodyPart]: result,
        }));
      } else {
        console.error(`Erro na resposta da API para ${bodyPart}:`, response.status);
      }
    } catch (error) {
      console.error(`Erro ao buscar os dados para ${bodyPart}:`, error);
    }
  };

  useEffect(() => {
    // Carregue os exercícios para a parte do corpo inicialmente selecionada ("waist")
    loadExercisesByBodyPart(selectedBodyPart);
  }, [selectedBodyPart]);

  return (
    <div>
      <h1>Lista de Exercícios por Parte do Corpo</h1>
      {/* Dropdown para selecionar a parte do corpo */}
      <select
        value={selectedBodyPart}
        onChange={(e) => setSelectedBodyPart(e.target.value)}
      >
        {bodyParts.map((part, index) => (
          <option key={index} value={part}>
            {part}
          </option>
        ))}
      </select>

      {exerciseData[selectedBodyPart] && (
        <div>
          <h2>{selectedBodyPart}</h2>
          <ul>
            {exerciseData[selectedBodyPart].map((exercise, index) => (
              <li key={index}>
                <h3>Nome: {exercise.name}</h3>
                <p>ID: {exercise.id}</p>
                <button onClick={() => handleAddExercise(exercise)}>Adicionar</button>
                {/* Outros detalhes do exercício */}
              </li>
            ))}
          </ul>
        </div>
      )}
      {showAddExerciseScreen && (
        <AddExerciseScreen
          exercise={selectedExercise}
          onClose={handleCloseAddExerciseScreen}
        />
      )}
    </div>
  );
}

export default BodyPartList;
