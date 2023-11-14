import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../estilizações/informacoes.css';

function AtualizarUsuario() {
  const navigate = useNavigate();

  // Função auxiliar para obter as informações do usuário do localStorage
  const getUserFromLocalStorage = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser || {
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
      frequenciaTreino: "",
      dataUltimaAtualizacao: "",
      historicoAtualizacoes: []
    };
  };

  // Inicialize o estado com as informações do usuário
  const [user, setUser] = useState(getUserFromLocalStorage);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Se o usuário não estiver logado, redirecione para a página de login
    if (!user.email) {
      navigate('/login'); // Substitua '/login' pelo caminho da sua página de login
    }
  }, [user, navigate]);

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

    // Salvar histórico e atualizar informações do usuário no localStorage
    salvarHistoricoAtualizacoes();
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const salvarHistoricoAtualizacoes = () => {
    const dataAtual = new Date();
    const dataFormatada = `${dataAtual.getDate()}/${dataAtual.getMonth() + 1}/${dataAtual.getFullYear()} ${dataAtual.getHours()}:${dataAtual.getMinutes()}`;

    const historicoAtualizacoes = user.historicoAtualizacoes || [];

    const novoHistorico = {
      dataHora: dataFormatada,
      medidasAntigas: { idade: user.idade, peso: user.peso, altura: user.altura },
      medidasNovas: { ...user },
    };

    historicoAtualizacoes.push(novoHistorico);

    setUser(prevUser => ({
      ...prevUser,
      dataUltimaAtualizacao: dataFormatada,
      historicoAtualizacoes,
    }));

    // Armazenar histórico com base no email do usuário
    const userHistorico = JSON.parse(localStorage.getItem(user.email)) || {};
    userHistorico.historicoAtualizacoes = historicoAtualizacoes;
    localStorage.setItem(user.email, JSON.stringify(userHistorico));
  };

  return (
    <div>
      <div className="containerInfo">
        <h2 className="tituloInfo">Suas informações:</h2>
        <label>Email: {editMode ? <input className="inputInfo" type="text" value={user.email} onChange={e => setUser({...user, email: e.target.value})} /> : user.email}</label><br />
        <label>Senha: {editMode ? <input className="inputInfo" type="password" value={user.password} onChange={e => setUser({...user, password: e.target.value})} /> : "******"}</label><br />
        <label>Nome: {editMode ? <input className="inputInfo" type="text" value={user.nome} onChange={e => setUser({...user, nome: e.target.value})} /> : user.nome}</label><br />
        <label>Idade: {editMode ? <input className="inputInfo" type="text" value={user.idade} onChange={e => setUser({...user, idade: e.target.value})} /> : user.idade}</label><br />
        <label>Peso: {editMode ? <input className="inputInfo" type="text" value={user.peso} onChange={e => setUser({...user, peso: e.target.value})} /> : user.peso}</label><br />
        <label>Palavra-Chave: {editMode ? <input className="inputInfo" type="text" value={user.palavraChave} onChange={e => setUser({...user, palavraChave: e.target.value})} /> : user.palavraChave}</label><br />
        <label>Altura: {editMode ? <input className="inputInfo" type="text" value={user.altura} onChange={e => setUser({...user, altura: e.target.value})} /> : user.altura}</label><br />
        <label>Sexo: {editMode ? <input className="inputInfo" type="text" value={user.sexo} onChange={e => setUser({...user, sexo: e.target.value})} /> : user.sexo}</label><br />
        <label>Objetivo: {editMode ? <input className="inputInfo" type="text" value={user.objetivo} onChange={e => setUser({...user, objetivo: e.target.value})} /> : user.objetivo}</label><br />
        <label>Nível de Condicionamento: {editMode ? <input className="inputInfo" type="text" value={user.nivelCondicionamento} onChange={e => setUser({...user, nivelCondicionamento: e.target.value})} /> : user.nivelCondicionamento}</label><br />
        <label>Frequência de Treino: {editMode ? <input className="inputInfo" type="text" value={user.frequenciaTreino} onChange={e => setUser({...user, frequenciaTreino: e.target.value})} /> : user.frequenciaTreino}</label><br />

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
