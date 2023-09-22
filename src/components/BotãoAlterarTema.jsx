import React from 'react';
import { connect } from 'react-redux';
import { toggleTheme } from '../Redux/themeActions';

function AlterarTema({ theme, toggleTheme }) {
  return (
    <button onClick={toggleTheme}>
      Alternar Tema ({theme === 'light' ? 'Claro' : 'Escuro'})
    </button>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps, { toggleTheme })(AlterarTema);
