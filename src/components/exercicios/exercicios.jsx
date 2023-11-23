import React, { useEffect, useState } from 'react';
import AddExerciseScreen from './addExercicios';
import './exercicios.css';

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
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 20; // Define o número de exercícios por página

  // Usamos o localStorage para armazenar em cache os dados das partes do corpo
  const [cache, setCache] = useState(
    JSON.parse(localStorage.getItem('exerciseCache')) || {}
  );

  const handleAddExercise = (exercise) => {
    setSelectedExercise(exercise);
    setShowAddExerciseScreen(true);
  };

  const handleCloseAddExerciseScreen = () => {
    setShowAddExerciseScreen(false);
    setSelectedExercise(null);
  };

  const loadExercisesByBodyPart = async (bodyPart, page) => {
    // Calcula o índice de início com base na página atual
    const startIndex = (page - 1) * exercisesPerPage;
    // Calcula o índice de fim com base na página atual
    const endIndex = startIndex + exercisesPerPage;

    // Limpa o cache ao trocar de grupo muscular e redefina a página para 1
    if (selectedBodyPart !== bodyPart) {
      setCache((prevCache) => ({
        ...prevCache,
        [selectedBodyPart]: null,
      }));
      setCurrentPage(1);
    }

    // Verifica se os dados para a parte do corpo já estão em cache
    if (cache[bodyPart]) {
      setExerciseData((prevData) => ({
        ...prevData,
        [bodyPart]: cache[bodyPart].slice(startIndex, endIndex), // Retorna apenas os exercícios da página atual
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
        // Armazena os dados em cache
        setCache((prevCache) => ({
          ...prevCache,
          [bodyPart]: result,
        }));
        // Atualiza o estado com os exercícios da página atual
        setExerciseData((prevData) => ({
          ...prevData,
          [bodyPart]: result.slice(startIndex, endIndex), // Retorna apenas os exercícios da página atual
        }));

        // Atualiza o localStorage com os dados em cache
        localStorage.setItem('exerciseCache', JSON.stringify(cache));
      } else {
        console.error(`Erro na resposta da API para ${bodyPart}:`, response.status);
      }
    } catch (error) {
      console.error(`Erro ao buscar os dados para ${bodyPart}:`, error);
    }
  };

  useEffect(() => {
    loadExercisesByBodyPart(selectedBodyPart, currentPage);
  }, [selectedBodyPart, currentPage]);

  return (
    <div className='container-exercise-list'>
      <div className='section-titulo-partes'>
        <h1 className='titulo-exercise-list'>Lista de Exercícios por Parte do Corpo:</h1>
        <select
          className='select-exercise-list'
          value={selectedBodyPart}
          onChange={(e) => setSelectedBodyPart(e.target.value)}
        >
          {bodyParts.map((part, index) => (
            <option className='opcoes-exercise-list' key={index} value={part}>
              {part}
            </option>
          ))}
        </select>
      </div>

      {exerciseData[selectedBodyPart] && (
        <div className='exercise-list'>
          <h2 className='parteDoCorpo'>{selectedBodyPart}:</h2>
          <div className='pagination-buttons'>
        <button
          className='botao-voltar'
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
          disabled={currentPage === 1} // Desabilita se estiver na primeira página
        >
          Anterior
        </button>
        <button
          className='botao-proximo'
          onClick={() => {
            if (exerciseData[selectedBodyPart]?.length === exercisesPerPage) {
              setCurrentPage(currentPage + 1);
            }
          }}
          disabled={
            !exerciseData[selectedBodyPart] || exerciseData[selectedBodyPart]?.length < exercisesPerPage
          } // Desabilita se não houver mais exercícios
        >
          Próximo
        </button>
      </div>
          <ul className='listaDosExercicios'>
            {exerciseData[selectedBodyPart].map((exercise, index) => (
              <li className='exercicios' key={index}>
                <div>
                  <p className='exerciciosNumero'>Número: {exercise.id}</p>
                  <h3 className='exerciciosNome'>Nome: {exercise.name}</h3>
                  <p className='exerciciosEquipamento'>Equipamento: {exercise.equipment}</p>
                  <p className='exerciciosAlvo'>Músculo alvo: {exercise.target}</p>
                  <button className='exerciciosBotao' onClick={() => handleAddExercise(exercise)}>Adicionar</button>
                </div>
                <img className='exerciciosImagem' src={exercise.gifUrl} alt="" />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className='pagination-buttons-baixo'>
        <button
          className='botao-voltar'
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
          disabled={currentPage === 1} // Desabilita se estiver na primeira página
        >
          Anterior
        </button>
        <button
          className='botao-proximo'
          onClick={() => {
            if (exerciseData[selectedBodyPart]?.length === exercisesPerPage) {
              setCurrentPage(currentPage + 1);
            }
          }}
          disabled={
            !exerciseData[selectedBodyPart] || exerciseData[selectedBodyPart]?.length < exercisesPerPage
          } // Desabilita se não houver mais exercícios
        >
          Próximo
        </button>
      </div>

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
