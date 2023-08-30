import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from "../components/login";
import RegisterPage from "../components/registro";
import BemVindo from "../components/bemvindo";
import TrocarSenha from "../components/trocarSenha";
import AtualizarUsuario from "../components/minhasInformacoes";

const Rotas = ({ users , registerUser }) => (
  <Routes>
    <Route path="/" element={<LoginPage users={users} />} />
    <Route path="/registro" element={<RegisterPage users={users} registerUser={registerUser} />} />
    <Route path='/bemvindo' element={<BemVindo/>}/>
    <Route path="/trocar-senha" element={<TrocarSenha users={users} />} />
    <Route path="/atualizar-usuario" element={<AtualizarUsuario />} />
  </Routes>
);

export default Rotas; 
