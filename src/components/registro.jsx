import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

function RegisterPage({ registerUser, users }) {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nome: "",
    idade: "",
    peso: "",
    palavraChave: "",
  });

  const [errors, setErrors] = useState({});

  const handleRegister = () => {
    const newErrors = {};

    for (const key in newUser) {
      if (!newUser[key]) {
        newErrors[key] = "Este campo é obrigatório.";
      }
    }

    if (!validator.isEmail(newUser.email)) {
      newErrors.email = "Digite um e-mail válido.";
    }

    if (!validator.isLength(newUser.nome, { max: 40 })) {
      newErrors.nome = "O nome deve ter no máximo 40 caracteres.";
    }

    if (!validator.isInt(newUser.idade)) {
      newErrors.idade = "A idade deve ser um número inteiro.";
    }

    if (!validator.isFloat(newUser.peso, { locales: "pt-BR" })) {
      newErrors.peso = "O peso deve ser um número válido.";
    }

    if (newUser.password !== newUser.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }

    if (!newUser.palavraChave) {
      newErrors.palavraChave = "Digite uma palavra-chave.";
    }

    if (Object.keys(newErrors).length === 0) {
      const existingUser = users.find((user) => user.email === newUser.email);

      if (existingUser) {
        newErrors.email = "Este e-mail já está sendo usado.";
      } else {
        // Registra o novo usuário
        registerUser(newUser);

        // Armazena dados do usuário no localStorage
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        // Limpa campos do formulário após o registro
        setNewUser({
          email: "",
          password: "",
          confirmPassword: "",
          nome: "",
          idade: "",
          peso: "",
          palavraChave: "",
        });

        // Redireciona para a página de boas-vindas
        navigate('/bemvindo');
      }
    }

    setErrors(newErrors);
  };

  return (
    <div>
      <h2>Registro</h2>
      <input
        type="email"
        placeholder="E-mail"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      {errors.email && <p>{errors.email}</p>}

      <input
        type="password"
        placeholder="Senha"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      {errors.password && <p>{errors.password}</p>}

      <input
        type="password"
        placeholder="Confirme a senha"
        value={newUser.confirmPassword}
        onChange={(e) =>
          setNewUser({ ...newUser, confirmPassword: e.target.value })
        }
      />
      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

      <input
        type="text"
        placeholder="Nome"
        value={newUser.nome}
        onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
      />
      {errors.nome && <p>{errors.nome}</p>}

      <input
        type="text"
        placeholder="Idade"
        value={newUser.idade}
        onChange={(e) => setNewUser({ ...newUser, idade: e.target.value })}
      />
      {errors.idade && <p>{errors.idade}</p>}

      <input
        type="text"
        placeholder="Peso"
        value={newUser.peso}
        onChange={(e) => setNewUser({ ...newUser, peso: e.target.value })}
      />
      {errors.peso && <p>{errors.peso}</p>}

      <input
        type="text"
        placeholder="Palavra-chave"
        value={newUser.palavraChave}
        onChange={(e) =>
          setNewUser({ ...newUser, palavraChave: e.target.value })
        }
      />
      {errors.palavraChave && <p>{errors.palavraChave}</p>}

      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
}

export default RegisterPage;
