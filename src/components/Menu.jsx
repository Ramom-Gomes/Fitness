import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../Redux/themeActions';
import '../estilizações/menu.css';
import { Link } from 'react-router-dom';

function Menu() {

  return (
    <div className="container-menu">
      <h1>Fitnes</h1>
      <nav>
        <Link to="/Home">Home</Link>
        <Link to="/informacoes">Minhas informações</Link>
        <Link to="/exercise-list">Exercícios</Link>
        <Link to="meus-planos">Meus planos</Link>
      </nav>
    </div>
  );
}

export default Menu;
