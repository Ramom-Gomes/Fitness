import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

function RegisterPage({ registerUser, users }) {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
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
  });

  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (!validator.isFloat(newUser.altura, { locales: "pt-BR" })) {
      newErrors.altura = "A altura deve ser um número válido.";
    }

    // Validar que sexo, objetivo, nível de condicionamento e frequência de treino são strings não vazias
    if (typeof newUser.sexo !== "string" || newUser.sexo.trim() === "") {
      newErrors.sexo = "Informe o sexo.";
    }

    if (typeof newUser.objetivo !== "string" || newUser.objetivo.trim() === "") {
      newErrors.objetivo = "Informe o objetivo.";
    }

    if (typeof newUser.nivelCondicionamento !== "string" || newUser.nivelCondicionamento.trim() === "") {
      newErrors.nivelCondicionamento = "Informe o nível de condicionamento.";
    }

    if (typeof newUser.frequenciaTreino !== "string" || newUser.frequenciaTreino.trim() === "") {
      newErrors.frequenciaTreino = "Informe a frequência de treino.";
    }

    if (newUser.password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
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
          nome: "",
          idade: "",
          peso: "",
          palavraChave: "",
          altura: "",
          sexo: "",
          objetivo: "",
          nivelCondicionamento: "",
          frequenciaTreino: "",
        });
        setConfirmPassword("");

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
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        placeholder="Altura (ex: 1.70)"
        value={newUser.altura}
        onChange={(e) => setNewUser({ ...newUser, altura: e.target.value })}
      />
      {errors.altura && <p>{errors.altura}</p>}

      <input
        type="text"
        placeholder="Sexo"
        value={newUser.sexo}
        onChange={(e) => setNewUser({ ...newUser, sexo: e.target.value })}
      />
      {errors.sexo && <p>{errors.sexo}</p>}

      <input
        type="text"
        placeholder="Objetivo"
        value={newUser.objetivo}
        onChange={(e) => setNewUser({ ...newUser, objetivo: e.target.value })}
      />
      {errors.objetivo && <p>{errors.objetivo}</p>}

      <input
        type="text"
        placeholder="Nível de Condicionamento"
        value={newUser.nivelCondicionamento}
        onChange={(e) => setNewUser({ ...newUser, nivelCondicionamento: e.target.value })}
      />
      {errors.nivelCondicionamento && <p>{errors.nivelCondicionamento}</p>}

      <input
        type="text"
        placeholder="Frequência de Treino"
        value={newUser.frequenciaTreino}
        onChange={(e) => setNewUser({ ...newUser, frequenciaTreino: e.target.value })}
      />
      {errors.frequenciaTreino && <p>{errors.frequenciaTreino}</p>}

      <input
        type="text"
        placeholder="Palavra-chave"
        value={newUser.palavraChave}
        onChange={(e) => setNewUser({ ...newUser, palavraChave: e.target.value })}
      />
      {errors.palavraChave && <p>{errors.palavraChave}</p>}

      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
}

export default RegisterPage;
