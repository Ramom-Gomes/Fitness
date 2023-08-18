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
