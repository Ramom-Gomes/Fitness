// store.js
import { createStore, combineReducers } from 'redux';
import themeReducer from './themeReducer'; // Importe seu themeReducer
import menuReducer from './menuReducer'; // Importe seu menuReducer

const rootReducer = combineReducers({
  theme: themeReducer,
  menu: menuReducer, // Adicione o menuReducer sob o nome 'menu'
});

const store = createStore(rootReducer);

export default store;
