import React, { useState } from 'react';
import '../estilizações/menu.css';
import { Link } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi';
import { TfiMenu } from 'react-icons/tfi';

function Menu() {

  const [menuAberto, setMenuAberto] = useState(true);

  const trocaMenu = () => {
    setMenuAberto(!menuAberto);
  }

  return (
    <div className="container-menu">
      <h1 className='menuTitulo'>Fitnes</h1>
      <nav className='menu-responsivo'>
        <TfiMenu className='menu-logo' onClick={trocaMenu}/>
      </nav>
      <nav className={menuAberto ? "nav-list-active" : "nav-list"}>
        <Link className='links' to="/Home">Home</Link>
        <Link className='links' to="/atualizarInformacoes">Teste</Link>
        <Link className='links' to="/exercise-list">Exercícios</Link>
        <Link className='links' to="meus-planos">Meus planos</Link>
        <Link className='link-user' to="/informacoes"><BiUserCircle size={30}/></Link>
      </nav>
    </div>
  );
}

export default Menu;
