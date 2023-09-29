import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../Redux/themeActions';

function Menu() {
  const dispatch = useDispatch();
  const menuOpen = useSelector((state) => state.menu.menuOpen);

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  return (
    <div>
      <button className="menu-button" onClick={handleToggleMenu}>
        ☰ Abrir Menu
      </button>

      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={handleToggleMenu}>
          ✕ Fechar Menu
        </button>
        <h1>MENU</h1>
        {/* Itens do menu aqui */}
      </div>
    </div>
  );
}

export default Menu;
