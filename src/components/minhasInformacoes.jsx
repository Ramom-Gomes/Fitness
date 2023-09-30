import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AtualizarUsuario() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    nome: "",
    idade: "",
    peso: "",
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser({
        nome: currentUser.nome,
        idade: currentUser.idade,
        peso: currentUser.peso,
      });
    }
  }, []);

  const handleUpdate = () => {
    // Atualizar informações do usuário no localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.nome = user.nome;
    currentUser.idade = user.idade;
    currentUser.peso = user.peso;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Voltar ao modo de exibição padrão
    setEditMode(false);
  };

  return (
    <div>
      <h2>Atualizar Informações do Usuário</h2>
      <label>Nome: {editMode ? <input type="text" value={user.nome} onChange={e => setUser({...user, nome: e.target.value})} /> : user.nome}</label><br />
      <label>Idade: {editMode ? <input type="text" value={user.idade} onChange={e => setUser({...user, idade: e.target.value})} /> : user.idade}</label><br />
      <label>Peso: {editMode ? <input type="text" value={user.peso} onChange={e => setUser({...user, peso: e.target.value})} /> : user.peso}</label><br />

      {editMode ? (
        <>
          <button onClick={handleUpdate}>Atualizar</button>
          <button onClick={() => setEditMode(false)}>Cancelar</button>
        </>
      ) : (
        <button onClick={() => setEditMode(true)}>Editar</button>
      )}

      <button onClick={() => navigate('/Home')}>Voltar</button>
    </div>
  );
}

export default AtualizarUsuario;
