import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from "../components/login";
import RegisterPage from "../components/registro";
import BemVindo from "../components/bemvindo";
import TrocarSenha from "../components/trocarSenha";
import AtualizarUsuario from "../components/minhasInformacoes";
import ExerciseList from '../components/exercicios/exercicios';
import UserExerciseList from '../components/exercicios/usuarioexercicios';
import AtualizarInfo from '../components/atualizarInfo';

const Rotas = ({ users , registerUser, addExerciseToUser, updateCurrentUser, setUsers }) => (
  <Routes>
    <Route path="/" element={<LoginPage users={users} />} />
    <Route path="/registro" element={<RegisterPage users={users} registerUser={registerUser} setUsers={setUsers} updateCurrentUser={updateCurrentUser} />} />
    <Route path='/Home' element={<BemVindo/>}/>
    <Route path="/trocar-senha" element={<TrocarSenha users={users} />} />
    <Route path="/informacoes" element={<AtualizarUsuario />} />
    <Route path="/exercise-list" element={<ExerciseList users={users} addExerciseToUser={addExerciseToUser}/>} />
    <Route path="/meus-planos" element={<UserExerciseList />} />
    <Route path="/atualizarInformacoes" element={<AtualizarInfo />} />
  </Routes>
);

export default Rotas; 
