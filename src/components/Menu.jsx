import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../Redux/themeActions';
import '../estilizações/menu.css';

function Menu() {
  const dispatch = useDispatch();
  const menuOpen = useSelector((state) => state.menu.menuOpen);

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="container-menu">
        <h1>MENU</h1>
    </div>
  );
}

export default Menu;
