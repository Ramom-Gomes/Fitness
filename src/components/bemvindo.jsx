import React, { useEffect, useState } from "react";

function BemVindo() {
  const [userData, setUserData] = useState({
    nome: "",
    idade: "",
    peso: "",
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUserData({
        nome: currentUser.nome,
        idade: currentUser.idade,
        peso: currentUser.peso,
      });
    }
  }, []);

  return (
    <div>
      <h2>Olá, {userData.nome}!</h2>
      <p>Idade: {userData.idade}</p>
      <p>Peso: {userData.peso} kg</p>
      {/* Conteúdo adicional da página de boas-vindas */}
    </div>
  );
}

export default BemVindo;
