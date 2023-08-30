import React, { useState } from 'react';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

function TrocarSenha({ users }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [keyword, setKeyword] = useState('');
  const [errors, setErrors] = useState({});

  const handlePasswordChange = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Digite o e-mail.';
    }
    if (!newPassword) {
      newErrors.newPassword = 'Digite a nova senha.';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirme a nova senha.';
    }
    if (!keyword) {
      newErrors.keyword = 'Digite a palavra-chave.';
    }

    if (Object.keys(newErrors).length === 0) {
      const userIndex = users.findIndex(user => user.email === email);

      if (userIndex === -1) {
        newErrors.email = 'Usuário não encontrado.';
      } else if (users[userIndex].palavraChave !== keyword) {
        newErrors.keyword = 'Palavra chave incorreta.';
      } else if (newPassword !== confirmPassword) {
        newErrors.confirmPassword = 'As senhas não coincidem.';
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
        setErrors({});

        // Fazer login do usuário automaticamente
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));

        // Redirecionar para a página de boas-vindas
        navigate('/bemvindo');
      }
    }

    setErrors(newErrors);
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
      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      
      <input
        type="password"
        placeholder="Nova Senha"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      {errors.newPassword && <p style={{ color: 'red' }}>{errors.newPassword}</p>}
      
      <input
        type="password"
        placeholder="Confirmar Nova Senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
      
      <input
        type="text"
        placeholder="Palavra-chave"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {errors.keyword && <p style={{ color: 'red' }}>{errors.keyword}</p>}
      
      <button onClick={handlePasswordChange}>Trocar Senha</button>
    </div>
  );
}

export default TrocarSenha;
