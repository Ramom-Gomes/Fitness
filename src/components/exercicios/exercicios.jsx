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

  const [selectedBodyPart, setSelectedBodyPart] = useState('waist');
  const [exerciseData, setExerciseData] = useState({});
  const [showAddExerciseScreen, setShowAddExerciseScreen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Usamos o localStorage para armazenar em cache os dados das partes do corpo
  const [cache, setCache] = useState(
    JSON.parse(localStorage.getItem('exerciseCache')) || {}
  );

  const handleAddExercise = (exercise) => {
    setSelectedExercise(exercise);
    setShowAddExerciseScreen(true);
    console.log('sim');
  };

  const handleCloseAddExerciseScreen = () => {
    setShowAddExerciseScreen(false);
    setSelectedExercise(null);
  };

  const loadExercisesByBodyPart = async (bodyPart) => {
    // Verifique se os dados para a parte do corpo já estão em cache
    if (cache[bodyPart]) {
      setExerciseData((prevData) => ({
        ...prevData,
        [bodyPart]: cache[bodyPart],
      }));
      return;
    }

    const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '7b0db3975cmsh3cab4257d2d34f8p1ba700jsn763981227f44',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const result = await response.json();
        // Armazene os dados em cache
        setCache((prevCache) => ({
          ...prevCache,
          [bodyPart]: result,
        }));
        setExerciseData((prevData) => ({
          ...prevData,
          [bodyPart]: result,
        }));

        // Atualize o localStorage com os dados em cache
        localStorage.setItem('exerciseCache', JSON.stringify(cache));
      } else {
        console.error(`Erro na resposta da API para ${bodyPart}:`, response.status);
      }
    } catch (error) {
      console.error(`Erro ao buscar os dados para ${bodyPart}:`, error);
    }
  };

  useEffect(() => {
    loadExercisesByBodyPart(selectedBodyPart);
  }, [selectedBodyPart]);

  return (
    <div>
      <h1>Lista de Exercícios por Parte do Corpo</h1>
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
