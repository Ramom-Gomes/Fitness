import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../estilizações/informacoes.css';

function AtualizarInfo() {
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
  const [viewingUpdates, setViewingUpdates] = useState(false);

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

    const updateInfo = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      oldInfo: JSON.parse(localStorage.getItem("currentUser")),
      newInfo: currentUser,
    };
  
    const userEmail = currentUser.email;

    // Obtém o array de atualizações do localStorage ou cria um novo array vazio
    const updatesObject = JSON.parse(localStorage.getItem("atualizacoes")) || {};
  
    const userUpdatesArray = updatesObject[userEmail] || [];

    // Adiciona a nova atualização ao array
    userUpdatesArray.push(updateInfo);

    updatesObject[userEmail] = userUpdatesArray;
  
    // Salva o array atualizado no localStorage
    localStorage.setItem("atualizacoes", JSON.stringify(updatesObject));

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  
    // Chama getCurrentUser para garantir que currentUser seja o mais atualizado
    getCurrentUser();
  
    setEditMode(false);
  };

  const getCurrentUserUpdates = () => {
    const userEmail = currentUser.email;
    const updatesObject = JSON.parse(localStorage.getItem("atualizacoes")) || {};
    return updatesObject[userEmail] || [];
  };

  return (
    <div>
      {viewingUpdates ? (
        <div>
          <h2 className="tituloInfo">Suas Atualizações:</h2>
          {getCurrentUserUpdates().length === 0 ? (
            <p>Você não tem atualizações. Atualize suas informações para visualizar as atualizações.</p>
          ) : (
            <ul>
              {getCurrentUserUpdates().map((update, index) => (
                <li key={index}>
                  <p>Data: {update.date}</p>
                  <p>Hora: {update.time}</p>
                  <p>Informações Antigas: {JSON.stringify(update.oldInfo)}</p>
                  <p>Informações Novas: {JSON.stringify(update.newInfo)}</p>
                </li>
              ))}
            </ul>
          )}
          <button className="botaoInfoVoltar" onClick={() => setViewingUpdates(false)}>
            Voltar para Atualizar Informações
          </button>
        </div>
      ) : (
        <div className="containerInfo">
          <h2 className="tituloInfo">Suas informações:</h2>
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
                <button className="botaoInfo Atualizar " onClick={handleUpdate}>
                  Atualizar
                </button>
                <button className="botaoInfo" onClick={() => setEditMode(false)}>
                  Cancelar
                </button>
              </div>
            ) : (
              <div>
                <button className="botaoInfo" onClick={() => setEditMode(true)}>
                  Editar
                </button>
                <button className="botaoInfoVoltar" onClick={() => navigate(-1)}>
                  Voltar
                </button>
                <button className="botaoInfo" onClick={() => setViewingUpdates(true)}>
                  Visualizar Minhas Atualizações
                </button>
              </div>
            )}
          </div>
          <button className="botaoInfoVoltar" onClick={() => navigate(-1)}>
            Voltar
          </button>
        </div>
      )}
    </div>
  );
}

export default AtualizarInfo;
