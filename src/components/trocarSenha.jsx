import React, { useState } from 'react';
import validator from 'validator';
import { useNavigate } from 'react-router-dom'; 
import '../estilizações/trocarSenha.css'; 
import { BsArrowLeft } from 'react-icons/bs';

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
        newErrors.email = 'E-mail errado.';
      } else if (users[userIndex].palavraChave !== keyword) {
        newErrors.keyword = 'Palavra chave incorreta.';
      } else if (newPassword !== confirmPassword) {
        newErrors.confirmPassword = 'As senhas não coincidem.';
      } else {
        // Atualiza a senha do usuário
        users[userIndex].password = newPassword;

        // Atualiza os dados no armazenamento local
        localStorage.setItem('users', JSON.stringify(users));

        // Limpa campos e erros
        setEmail('');
        setNewPassword('');
        setConfirmPassword('');
        setKeyword('');
        setErrors({});

        // Faz login do usuário automaticamente
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));

        // Redireciona para a página de boas-vindas
        navigate('/Home');
      }
    }

    setErrors(newErrors);
  };

  const voltarEtapa = () => {
      navigate(-1);
  };

  return (
    <div className='container'>
      <div className='main'>
        <BsArrowLeft size={25} className="voltarEtapa" onClick={voltarEtapa}/>
        <h2 className='titulo-trocarSenha'>Trocar Senha</h2>
        <input
          className='input-email'
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className={`email-error-novaSenha ${errors.email ? 'show' : ''}`}>{errors.email}</p>}
        
        <input
          className='input-senha'
          type="password"
          placeholder="Nova Senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {errors.newPassword && <p className={`senha-error-novaSenha ${errors.newPassword ? 'show' : ''}`}>{errors.newPassword}</p>}
        
        <input
          className='input-confirmarSenha'
          type="password"
          placeholder="Confirmar Nova Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <p className={`confirmarSenha-error ${errors.confirmPassword ? 'show' : ''}`}>{errors.confirmPassword}</p>}
        
        <input
          className='input-chave'
          type="text"
          placeholder="Palavra-chave"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        {errors.keyword && <p className={`chave-error ${errors.keyword ? 'show' : ''}`}>{errors.keyword}</p>}
        
        <button className='botao-registro' onClick={handlePasswordChange}>Trocar Senha</button>
      </div>
    </div>
  );
}

export default TrocarSenha;
