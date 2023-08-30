import React, { useState } from 'react';
import validator from 'validator';

function TrocarSenha({ users }) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = () => {
    const user = users.find(user => user.email === email);

    if (!user) {
      setError('Usuário não encontrado.');
    } else if (user.palavraChave !== keyword) {
      setError('Palavra chave incorreta.');
    } else if (!validator.isLength(newPassword, { min: 6 })) {
      setError('A senha deve ter pelo menos 6 caracteres.');
    } else if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
    } else {
      // Atualizar a senha do usuário
      user.password = newPassword;

      // Atualizar os dados no armazenamento local
      localStorage.setItem('users', JSON.stringify(users));

      // Limpar campos e erros
      setEmail('');
      setNewPassword('');
      setConfirmPassword('');
      setKeyword('');
      setError('Senha alterada com sucesso.');
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
