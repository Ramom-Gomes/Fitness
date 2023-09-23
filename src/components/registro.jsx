import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

function RegisterPage({ registerUser, users }) {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

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
  const [emailInUse, setEmailInUse] = useState(false);

  const handleNextStep = async () => {
    const newErrors = {};

    // Valida os campos da etapa atual antes de avançar
    if (currentStep === 1) {
      if (!newUser.email || !validator.isEmail(newUser.email)) {
        newErrors.email = "Digite um e-mail válido.";
      }
      if (!newUser.password || newUser.password.length < 8) {
        newErrors.password = "A senha deve ter pelo menos 8 caracteres.";
      }
      if (!confirmPassword || newUser.password !== confirmPassword) {
        newErrors.confirmPassword = "As senhas não coincidem.";
      }
      if (!newUser.nome) {
        newErrors.nome = "Este campo é obrigatório.";
      }

      // Verifica se o e-mail já está em uso
      const existingUser = users.find((user) => user.email === newUser.email);

      if (existingUser) {
        setEmailInUse(true);
        return;
      } else {
        setEmailInUse(false);
      }
    } else if (currentStep === 2) {
      if (!newUser.idade || !validator.isInt(newUser.idade)) {
        newErrors.idade = "A idade deve ser um número inteiro.";
      }
      if (!newUser.peso || !validator.isFloat(newUser.peso, { locales: "pt-BR" })) {
        newErrors.peso = "O peso deve ser um número válido.";
      }
      if (!newUser.altura || !validator.isFloat(newUser.altura, { locales: "pt-BR" })) {
        newErrors.altura = "A altura deve ser um número válido.";
      }
      if (!newUser.sexo) {
        newErrors.sexo = "Este campo é obrigatório.";
      }
    } else if (currentStep === 3) {
      if (!newUser.objetivo) {
        newErrors.objetivo = "Este campo é obrigatório.";
      }
      if (!newUser.nivelCondicionamento) {
        newErrors.nivelCondicionamento = "Este campo é obrigatório.";
      }
      if (!newUser.frequenciaTreino) {
        newErrors.frequenciaTreino = "Este campo é obrigatório.";
      }
      if (!newUser.palavraChave) {
        newErrors.palavraChave = "Este campo é obrigatório.";
      }
    }

    if (Object.keys(newErrors).length === 0) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        registerUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
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
        navigate('/bemvindo');
      }
    }

    setErrors(newErrors);
  };

  return (
    <div>
      <h2>Registro - Etapa {currentStep}</h2>
      {currentStep === 1 && (
        <>
          <input
            type="email"
            placeholder="E-mail"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          {errors.email && <p>{errors.email}</p>}
          {emailInUse && <p>O e-mail já está em uso.</p>}

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
        </>
      )}

      {currentStep === 2 && (
        <>
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
        </>
      )}

      {currentStep === 3 && (
        <>
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
        </>
      )}

      <button onClick={handleNextStep}>
        {currentStep < 3 ? "Próxima Etapa" : "Registrar"}
      </button>
    </div>
  );
}

export default RegisterPage;
