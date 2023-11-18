import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import '../estilizações/registro.css'; 
import { BsArrowLeft } from 'react-icons/bs';

function RegisterPage({ registerUser, users, updateCurrentUser, setUsers }) {
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
      if (!newUser.password || newUser.password.length < 1) {
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
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        updateCurrentUser(newUser);

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = [...users, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
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
        navigate('/Home');
      }
    }

    setErrors(newErrors);
  };

  const voltarEtapa = () => {
    if (currentStep === 1) {
      navigate(-1);
    } else if (currentStep === 2) {
      setCurrentStep(1); 
    } else if (currentStep === 3) {
      setCurrentStep(2); 
    }
  };

  return (
    <div className={'container'}>
      <div className={'main'}>
        <BsArrowLeft size={25} className="voltarEtapa" onClick={voltarEtapa}/>
        <h2 className="registro-titulo">Registro - Etapa {currentStep}</h2>
        {currentStep === 1 && (
          <>
            <div className={'mensagem-container'}>
              <p className={'mensagem-motivacional'}>"Fique forte, comece pelo básico! 
                O primeiro passo é cuidar da sua saúde e definir seus objetivos."
              </p>
            </div>
            <input
              className={'input-email'}
              type="email"
              placeholder="E-mail"
              value={newUser.email} 
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            {errors.email && <p className={`email-error ${errors.email ? 'show' : ''}`}>{errors.email}</p>}
            {emailInUse && <p className={`email-error-user ${emailInUse ? 'show' : ''}`}>O e-mail já está em uso.</p>}
            
            <input
              className={'input-senha'}
              type="password"
              placeholder="Senha"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            {errors.password && <p className={`senha-error ${errors.password ? 'show' : ''}`}>{errors.password}</p>}

            <input
              className={'input-confirmarSenha'}
              type="password"
              placeholder="Confirme a senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className={`confirmarSenha-error ${errors.confirmPassword ? 'show' : ''}`}>{errors.confirmPassword}</p>}

            <input
              className={'input-nome'}
              type="text"
              placeholder="Nome"
              value={newUser.nome}
              onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
            />
            {errors.nome && <p className={`nome-error ${errors.nome ? 'show' : ''}`}>{errors.nome}</p>}
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className={'mensagem-container'}>
              <p className={'mensagem-motivacional'}>"Sua jornada para um corpo saudável está em andamento! 
                A idade é apenas um número, e sua determinação fará a diferença."
              </p>
            </div>
            <input
              className={'input-idade'}
              type="text"
              placeholder="Idade"
              value={newUser.idade}
              onChange={(e) => setNewUser({ ...newUser, idade: e.target.value })}
            />
            {errors.idade && <p className={`idade-error ${errors.idade ? 'show' : ''}`}>{errors.idade}</p>}

            <input
              className={'input-peso'}
              type="text"
              placeholder="Peso"
              value={newUser.peso}
              onChange={(e) => setNewUser({ ...newUser, peso: e.target.value })}
            />
            {errors.peso && <p className={`peso-error ${errors.peso ? 'show' : ''}`}>{errors.peso}</p>}

            <input
              className={'input-altura'}
              type="text"
              placeholder="Altura (ex: 1.70)"
              value={newUser.altura}
              onChange={(e) => setNewUser({ ...newUser, altura: e.target.value })}
            />
            {errors.altura && <p className={`altura-error ${errors.altura ? 'show' : ''}`}>{errors.altura}</p>}

            <input
              className={'input-sexo'}
              type="text"
              placeholder="Sexo"
              value={newUser.sexo}
              onChange={(e) => setNewUser({ ...newUser, sexo: e.target.value })}
            />
            {errors.sexo && <p className={`sexo-error ${errors.sexo ? 'show' : ''}`}>{errors.sexo}</p>}
          </>
        )}

        {currentStep === 3 && (
          <>
            <div className={'mensagem-container'}>
              <p className={'mensagem-motivacional'}>"Continue firme na busca pelos seus objetivos! Sua determinação e consistência na 
                definição de metas e na frequência de treino o levarão a 
                uma vida mais saudável e ativa."
              </p>
            </div>
            <input
              className={'input-objetivo'}
              type="text"
              placeholder="Objetivo"
              value={newUser.objetivo}
              onChange={(e) => setNewUser({ ...newUser, objetivo: e.target.value })}
            />
            {errors.objetivo && <p className={`objetivo-error ${errors.objetivo ? 'show' : ''}`}>{errors.objetivo}</p>}

            <input
              className={'input-condicionamento'}
              type="text"
              placeholder="Nível de Condicionamento"
              value={newUser.nivelCondicionamento}
              onChange={(e) => setNewUser({ ...newUser, nivelCondicionamento: e.target.value })}
            />
            {errors.nivelCondicionamento && <p className={`condicionamento-error ${errors.nivelCondicionamento ? 'show' : ''}`}>{errors.nivelCondicionamento}</p>}

            <input
              className={'input-frequencia'}
              type="text"
              placeholder="Frequência de Treino"
              value={newUser.frequenciaTreino}
              onChange={(e) => setNewUser({ ...newUser, frequenciaTreino: e.target.value })}
            />
            {errors.frequenciaTreino && <p className={`frequencia-error ${errors.frequenciaTreino ? 'show' : ''}`}>{errors.frequenciaTreino}</p>}

            <input
              className={'input-chave'}
              type="text"
              placeholder="Palavra-chave"
              value={newUser.palavraChave}
              onChange={(e) => setNewUser({ ...newUser, palavraChave: e.target.value })}
            />
            {errors.palavraChave && <p className={`chave-error ${errors.palavraChave ? 'show' : ''}`}>{errors.palavraChave}</p>}
          </>
        )}

        <button className={'botao-registro'} onClick={handleNextStep}>
          {currentStep < 3 ? "Próxima Etapa" : "Registrar"}
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
