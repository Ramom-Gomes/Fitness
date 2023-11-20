import './App.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Rotas from './routes/rotas';
import Menu from './components/Menu';
import { Provider } from 'react-redux';
import store from './Redux/store';

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
    // Atualize o usuário atual no estado
    setCurrentUser(user);

    // Atualize o localStorage com o novo usuário
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const addExerciseToUser = (exercise) => {
    // Clone o objeto de usuário atual
    const updatedUser = { ...currentUser };

    // Adicione o exercício à lista de exercícios do usuário
    updatedUser.exercises.push(exercise);

    // Atualize o usuário no estado
    setCurrentUser(updatedUser);

    // Atualize o localStorage com o novo usuário
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const hideHeaderAndMenu =
    location.pathname === '/' ||
    location.pathname === '/registro' ||
    location.pathname === '/trocar-senha';

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;