import React, { useState } from 'react';
import '../estilizações/menu.css';
import { Link, useNavigate } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi';
import { TfiMenu } from 'react-icons/tfi';

function Menu() {

  const [menuAberto, setMenuAberto] = useState(true);
  const Navigate = useNavigate();

  const trocaMenu = () => {
    setMenuAberto(!menuAberto);
  }

  const handleLogout = () => {
    // Redirecionar para a página de login
    Navigate('/');
    window.location.reload();
  };

  return (
    <div className="container-menu">
      <h1 className='menuTitulo'>MyFitness</h1>
      <nav className='menu-responsivo'>
        <TfiMenu className='menu-logo' onClick={trocaMenu}/>
      </nav>
      <nav className={menuAberto ? "nav-list-active" : "nav-list"}>
        <Link className='links' to="/Home">Home</Link>
        <Link className='links' to="/atualizarInformacoes">Minhas informações</Link>
        <Link className='links' to="/exercise-list">Exercícios</Link>
        <Link className='links' to="meus-planos">Meus planos</Link>
        <Link className='link-user' to="/informacoes"><BiUserCircle size={30}/></Link>
        <Link className='linksSair' onClick={handleLogout}>Sair</Link>
      </nav>
    </div>
  );
}

export default Menu;
