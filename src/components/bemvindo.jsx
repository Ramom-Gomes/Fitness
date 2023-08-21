import React, { useEffect, useState } from "react";

function BemVindo() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUserName(currentUser.nome);
    }
  }, []);

  return (
    <div>
      <h2>Olá, {userName}!</h2>
      Conteúdo da página de boas-vindas
   </div>
      );
    } 
    export default BemVindo;  