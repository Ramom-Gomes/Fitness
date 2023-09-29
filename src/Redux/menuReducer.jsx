import { TOGGLE_MENU } from './themeActions';

const initialState = {
  menuOpen: false,
};

const menuReducer = (state = initialState, action) => {
  console.log('Action:', state)
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        menuOpen: !state.menuOpen,
      };
    default:
      return state;
  }
};

export default menuReducer;