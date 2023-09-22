import React from 'react';
import { connect } from 'react-redux';
import { toggleTheme } from '../Redux/themeActions';
import { FaSun, FaMoon } from 'react-icons/fa';

function AlterarTema({ theme, toggleTheme }) {
  return (
    <p onClick={toggleTheme}>{theme === 'light' ? <FaMoon/> : <FaSun/>}</p>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps, { toggleTheme })(AlterarTema);