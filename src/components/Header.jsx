import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UpdateUserInformation() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Inicialize o estado com as informações do usuário
  const [user, setUser] = useState({
    peso: currentUser.peso || "",
    altura: currentUser.altura || "",
    objetivo: currentUser.objetivo || "",
    nivelCondicionamento: currentUser.nivelCondicionamento || "",
    frequenciaTreino: currentUser.frequenciaTreino || ""
  });

  const [editMode, setEditMode] = useState(false);

  const email = currentUser.email; // Obtém o email do usuário atual

  useEffect(() => {
    // Carrega o histórico de atualizações do localStorage com base no email do usuário
    const historicoAtualizacoes = JSON.parse(localStorage.getItem(`historicoAtualizacoes_${email}`)) || [];
    setUser({
      ...user,
      historicoAtualizacoes: historicoAtualizacoes
    });
  }, [email]);

  const handleUpdate = () => {
    // Obtenha a data e hora atuais no formato "dd/mm/aaaa hh:mm"
    const now = new Date();
    const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;

    // Crie um objeto de atualização com data, hora e informações do usuário
    const atualizacao = {
      dataHora: formattedDate,
      informacoes: { ...user }
    };

    // Adicione esta atualização ao histórico de atualizações
    const historicoAtualizacoes = [...user.historicoAtualizacoes, atualizacao];

    // Atualize as informações do usuário no localStorage
    const updatedUser = { ...currentUser, ...user };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Atualize o histórico de atualizações no localStorage com base no email do usuário
    localStorage.setItem(`historicoAtualizacoes_${email}`, JSON.stringify(historicoAtualizacoes));

    // Voltar ao modo de exibição padrão
    setEditMode(false);
  };

  return (
    <div>
      <h2>Atualizar Informações</h2>
      <div>
        <label>Peso (em kg):</label>
        {editMode ? (
          <input type="text" value={user.peso} onChange={(e) => setUser({ ...user, peso: e.target.value })} />
        ) : (
          <span>{user.peso}</span>
        )}
      </div>
      <div>
        <label>Altura (em metros):</label>
        {editMode ? (
          <input type="text" value={user.altura} onChange={(e) => setUser({ ...user, altura: e.target.value })} />
        ) : (
          <span>{user.altura}</span>
        )}
      </div>
      <div>
        <label>Objetivo:</label>
        {editMode ? (
          <input type="text" value={user.objetivo} onChange={(e) => setUser({ ...user, objetivo: e.target.value })} />
        ) : (
          <span>{user.objetivo}</span>
        )}
      </div>
      <div>
        <label>Nível de Condicionamento:</label>
        {editMode ? (
          <input type="text" value={user.nivelCondicionamento} onChange={(e) => setUser({ ...user, nivelCondicionamento: e.target.value })} />
        ) : (
          <span>{user.nivelCondicionamento}</span>
        )}
      </div>
      <div>
        <label>Frequência de Treino:</label>
        {editMode ? (
          <input type="text" value={user.frequenciaTreino} onChange={(e) => setUser({ ...user, frequenciaTreino: e.target.value })} />
        ) : (
          <span>{user.frequenciaTreino}</span>
        )}
      </div>

      {/* Mostra o histórico de atualizações */}
      <div>
        <h3>Histórico de Atualizações:</h3>
        <ul>
          {user.historicoAtualizacoes.map((atualizacao, index) => (
            <li key={index}>
              <strong>Data e Hora:</strong> {atualizacao.dataHora}<br />
              <strong>Informações Atualizadas:</strong>
              <ul>
                {Object.keys(atualizacao.informacoes).map((campo) => (
                  <li key={campo}>
                    <strong>{campo}:</strong> {atualizacao.informacoes[campo]}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleUpdate}>Atualizar Informações</button>
      <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}

export default UpdateUserInformation;
