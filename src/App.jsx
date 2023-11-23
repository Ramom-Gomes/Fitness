import './App.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Rotas from './routes/rotas';
import Menu from './components/Menu';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers === undefined || storedUsers === null) {
      localStorage.clear();
      setUsers([]);
    } else {
      setUsers(storedUsers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const registerUser = (newUser) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  };

  const updateCurrentUser = (user) => {
    // Atualiza o usuário atual no estado
    setCurrentUser(user);

    // Atualiza o localStorage com o novo usuário
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const addExerciseToUser = (exercise) => {
    // Clona o objeto de usuário atual
    const updatedUser = { ...currentUser };

    // Adiciona o exercício à lista de exercícios do usuário
    updatedUser.exercises.push(exercise);

    // Atualiza o usuário no estado
    setCurrentUser(updatedUser);

    // Atualiza o localStorage com o novo usuário
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const hideHeaderAndMenu =
    location.pathname === '/' ||
    location.pathname === '/registro' ||
    location.pathname === '/trocar-senha';

  return (
      <div className="container-app">
        <header>
          {!hideHeaderAndMenu && <Menu className="menu" />}
        </header>
        <div className="routes">
          <Rotas
            users={users}
            registerUser={registerUser}
            addExerciseToUser={addExerciseToUser}
            updateCurrentUser={updateCurrentUser}
            setUsers={setUsers}
          />
        </div>
      </div>
  );
}

export default App;