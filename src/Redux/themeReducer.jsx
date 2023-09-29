import { TOGGLE_THEME } from './themeActions';

const initialState = {
  theme: 'dark', // Pode ser 'light' ou 'dark'
};

const themeReducer = (state = initialState, action) => {
    console.log('Action:', state); // Adicione este log para verificar as ações
    switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
};

export default themeReducer;

