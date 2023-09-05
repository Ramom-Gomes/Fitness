import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Rotas from './routes/rotas';
import Header from './components/Header';
import Menu from './components/Menu';

function App() {
  const [users, setUsers] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const registerUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const hideHeaderAndMenu = location.pathname === '/' || 
  location.pathname === '/registro' || 
  location.pathname === '/trocar-senha';

  return (
    <div>
      {!hideHeaderAndMenu && (
        <div>
          <Menu />
        </div>
      )}
      {!hideHeaderAndMenu && <Header />}
      <Rotas users={users} registerUser={registerUser} />
    </div>
  );
}

export default App;
