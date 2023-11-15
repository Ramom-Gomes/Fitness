import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../estilizações/informacoes.css';

function AtualizarUsuario() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
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

  // Função para obter o usuário atualizado do localStorage
  const getCurrentUser = () => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []); // Chama a função uma vez quando o componente é montado

  const handleUpdate = () => {
    if (currentUser.email === "" || currentUser.password === "" || currentUser.nome === "") {
      alert("Por favor, preencha todos os campos obrigatórios (email, senha, nome).");
      return;
    }

    if (
      isNaN(currentUser.idade) || 
      isNaN(currentUser.peso) || 
      isNaN(currentUser.altura) || 
      currentUser.idade === "" || 
      currentUser.peso === "" || 
      currentUser.altura === ""
    ) {
      alert("Por favor, insira valores numéricos válidos para idade, peso e altura.");
      return;
    }

    if (currentUser.palavraChave === "") {
      alert("A palavra-chave não pode estar em branco.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === currentUser.email ? currentUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  
    // Chama getCurrentUser para garantir que currentUser seja o mais atualizado
    getCurrentUser();
  
    setEditMode(false);
  };

  return (
    <div>
      <div className="containerInfo">
        <h2 className="tituloInfo">Suas informações:</h2>
        <label>Email: {editMode ? <input className="inputInfo" type="text" value={currentUser.email} onChange={e => setCurrentUser({...currentUser, email: e.target.value})} /> : currentUser.email}</label><br />
        <label>Senha: {editMode ? <input className="inputInfo" type="password" value={currentUser.password} onChange={e => setCurrentUser({...currentUser, password: e.target.value})} /> : "******"}</label><br />
        <label>Nome: {editMode ? <input className="inputInfo" type="text" value={currentUser.nome} onChange={e => setCurrentUser({...currentUser, nome: e.target.value})} /> : currentUser.nome}</label><br />
        <label>Idade: {editMode ? <input className="inputInfo" type="text" value={currentUser.idade} onChange={e => setCurrentUser({...currentUser, idade: e.target.value})} /> : currentUser.idade}</label><br />
        <label>Peso: {editMode ? <input className="inputInfo" type="text" value={currentUser.peso} onChange={e => setCurrentUser({...currentUser, peso: e.target.value})} /> : currentUser.peso}</label><br />
        <label>Palavra-Chave: {editMode ? <input className="inputInfo" type="text" value={currentUser.palavraChave} onChange={e => setCurrentUser({...currentUser, palavraChave: e.target.value})} /> : currentUser.palavraChave}</label><br />
        <label>Altura: {editMode ? <input className="inputInfo" type="text" value={currentUser.altura} onChange={e => setCurrentUser({...currentUser, altura: e.target.value})} /> : currentUser.altura}</label><br />
        <label>Sexo: {editMode ? <input className="inputInfo" type="text" value={currentUser.sexo} onChange={e => setCurrentUser({...currentUser, sexo: e.target.value})} /> : currentUser.sexo}</label><br />
        <label>Objetivo: {editMode ? <input className="inputInfo" type="text" value={currentUser.objetivo} onChange={e => setCurrentUser({...currentUser, objetivo: e.target.value})} /> : currentUser.objetivo}</label><br />
        <label>Nível de Condicionamento: {editMode ? <input className="inputInfo" type="text" value={currentUser.nivelCondicionamento} onChange={e => setCurrentUser({...currentUser, nivelCondicionamento: e.target.value})} /> : currentUser.nivelCondicionamento}</label><br />
        <label>Frequência de Treino: {editMode ? <input className="inputInfo" type="text" value={currentUser.frequenciaTreino} onChange={e => setCurrentUser({...currentUser, frequenciaTreino: e.target.value})} /> : currentUser.frequenciaTreino}</label><br />

        <div className="botaoPosicaoInfo">
          {editMode ? (
            <div>
              <button className="botaoInfo Atualizar " onClick={handleUpdate}>Atualizar</button>
              <button className="botaoInfo" onClick={() => setEditMode(false)}>Cancelar</button>
            </div>
          ) : (
            <button className="botaoInfo" onClick={() => setEditMode(true)}>Editar</button>
          )}
        </div>
          <button className="botaoInfoVoltar" onClick={() => navigate(-1)}>Voltar</button>
      </div>
    </div>
  );
}

export default AtualizarUsuario;
