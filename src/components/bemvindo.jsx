import React from "react";
import { useParams } from "react-router-dom";

function BemVindo() {
  const { name } = useParams();

  return (
    <div>
      <h2>Olá, {name}!</h2>
      {/* Conteúdo da página de boas-vindas */}
    </div>
  );
}

export default BemVindo;

/*
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
      { Conteúdo da página de boas-vindas}
      </div>
      );
    } 
    export default BemVindo;  
*/    
