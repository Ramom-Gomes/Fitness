import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from "../components/login";
import RegisterPage from "../components/registro";

const Rotas = ({ registerUser }) => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/registro" element={<RegisterPage registerUser={registerUser} />} />
  </Routes>
);

export default Rotas;
