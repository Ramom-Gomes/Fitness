import React, { useState } from 'react';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

function TrocarSenha({ users }) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Usar o hook useNavigate para navegação

  const handlePasswordChange = () => {
    if (!email || !newPassword || !confirmPassword || !keyword) {
      setError('Preencha todos os campos.');
    } else {
      const userIndex = users.findIndex(user => user.email === email);

      if (userIndex === -1) {
        setError('Usuário não encontrado.');
      } else if (users[userIndex].palavraChave !== keyword) {
        setError('Palavra chave incorreta.');
      } else if (newPassword !== confirmPassword) {
        setError('As senhas não coincidem.');
      } else {
        // Atualizar a senha do usuário
        users[userIndex].password = newPassword;

        // Atualizar os dados no armazenamento local
        localStorage.setItem('users', JSON.stringify(users));

        // Limpar campos e erros
        setEmail('');
        setNewPassword('');
        setConfirmPassword('');
        setKeyword('');
        setError('');

        // Fazer login do usuário automaticamente
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));

        // Redirecionar para a página de boas-vindas
        navigate('/bemvindo');
      }
    }
  };

  return (
    <div>
      <h2>Trocar Senha</h2>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Nova Senha"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmar Nova Senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Palavra-chave"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handlePasswordChange}>Trocar Senha</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default TrocarSenha;
