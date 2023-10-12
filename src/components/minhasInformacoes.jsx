import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

function AtualizarUsuario() {
  const navigate = useNavigate();

  // Inicialize o estado com as informações do usuário
  const [user, setUser] = useState({
    email: "",
    password: "",
    nome: "",
    idade: "",
    peso: "",
    palavraChave: "",
    altura: "",
    sexo: "",
    objetivo: "",
    nivelCondicionamento: "",
    frequenciaTreino: ""
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleUpdate = () => {
    
    if (user.email === "" || user.password === "" || user.nome === "") {
      alert("Por favor, preencha todos os campos obrigatórios (email, senha, nome).");
      return;
    }

    // Verificar idade, peso e altura
    if (
      isNaN(user.idade) || 
      isNaN(user.peso) || 
      isNaN(user.altura) || 
      user.idade === "" || 
      user.peso === "" || 
      user.altura === ""
    ) {
      alert("Por favor, insira valores numéricos válidos para idade, peso e altura.");
      return;
    }

    // Verificar palavra-chave igual ao email e não em branco
    if (user.palavraChave === "") {
      alert("A palavra-chave não pode estar em branco.");
      return;
    }

    // Atualizar informações do usuário no localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Voltar ao modo de exibição padrão
    setEditMode(false);
  };

  return (
    <div>
      <h2>Suas informações:</h2>
      <label>Email: {editMode ? <input type="text" value={user.email} onChange={e => setUser({...user, email: e.target.value})} /> : user.email}</label><br />
      <label>Senha: {editMode ? <input type="password" value={user.password} onChange={e => setUser({...user, password: e.target.value})} /> : "******"}</label><br />
      <label>Nome: {editMode ? <input type="text" value={user.nome} onChange={e => setUser({...user, nome: e.target.value})} /> : user.nome}</label><br />
      <label>Idade: {editMode ? <input type="text" value={user.idade} onChange={e => setUser({...user, idade: e.target.value})} /> : user.idade}</label><br />
      <label>Peso: {editMode ? <input type="text" value={user.peso} onChange={e => setUser({...user, peso: e.target.value})} /> : user.peso}</label><br />
      <label>Palavra-Chave: {editMode ? <input type="text" value={user.palavraChave} onChange={e => setUser({...user, palavraChave: e.target.value})} /> : user.palavraChave}</label><br />
      <label>Altura: {editMode ? <input type="text" value={user.altura} onChange={e => setUser({...user, altura: e.target.value})} /> : user.altura}</label><br />
      <label>Sexo: {editMode ? <input type="text" value={user.sexo} onChange={e => setUser({...user, sexo: e.target.value})} /> : user.sexo}</label><br />
      <label>Objetivo: {editMode ? <input type="text" value={user.objetivo} onChange={e => setUser({...user, objetivo: e.target.value})} /> : user.objetivo}</label><br />
      <label>Nível de Condicionamento: {editMode ? <input type="text" value={user.nivelCondicionamento} onChange={e => setUser({...user, nivelCondicionamento: e.target.value})} /> : user.nivelCondicionamento}</label><br />
      <label>Frequência de Treino: {editMode ? <input type="text" value={user.frequenciaTreino} onChange={e => setUser({...user, frequenciaTreino: e.target.value})} /> : user.frequenciaTreino}</label><br />

      {editMode ? (
        <>
          <button onClick={handleUpdate}>Atualizar</button>
          <button onClick={() => setEditMode(false)}>Cancelar</button>
        </>
      ) : (
        <button onClick={() => setEditMode(true)}>Editar</button>
      )}

        <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}

export default AtualizarUsuario;
