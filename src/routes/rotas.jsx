import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from "../components/login";
import RegisterPage from "../components/registro";
import BemVindo from "../components/bemvindo";

const Rotas = ({ users , registerUser }) => (
  <Routes>
    <Route path="/" element={<LoginPage users={users} />} />
    <Route path="/registro" element={<RegisterPage users={users} registerUser={registerUser} />} />
    <Route path='/bemvindo/:name' element={<BemVindo/>}/>
  </Routes>
);

export default Rotas; 
