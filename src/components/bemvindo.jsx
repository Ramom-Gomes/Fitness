import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function BemVindo() {
  const navigate = useNavigate();
  const menuOpen = useSelector((state) => state.menu.menuOpen);

  const [userData, setUserData] = useState({
    nome: "",
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUserData({
        nome: currentUser.nome,
      });
    }
  }, []);

  const handleLogout = () => {
    // Redirecionar para a página de login
    navigate('/');
  };

  return (
    <div className={`content ${menuOpen ? 'content-shifted' : ''}`}>
      <div>
        <h2>Olá, {userData.nome}!</h2>
        <span>
          <p>
            Seja bem-vindo(a) ao nosso espaço dedicado ao seu bem-estar
            físico e mental. Aqui, você encontrará tudo o que precisa para
            alcançar seus objetivos de fitness de forma personalizada
            e eficaz.
          </p>
          <p>
            Crie planos de treino personalizados que se adaptem às suas
            necessidades específicas. Nossas ferramentas intuitivas 
            permitem que você monte seu próprio plano de treino ou escolha 
            entre uma variedade de opções predefinidas. Encontre o plano 
            perfeito para alcançar seus objetivos.
          </p>
        </span>
        <span>
          <h3>Explore Nossos Recursos:</h3>
          <p>
            Exercícios Personalizados: Escolha os exercícios adequados para
            a sua meta e nível de condicionamento físico. Personalizamos
            cada plano para você. Planos de Treino: Crie e gerencie seus
            próprios planos de treino ou escolha entre os que
            oferecemos. Seu caminho para um corpo mais saudável começa aqui.
          </p>
        </span>
        <span>
          <h3>Pronto para Começar?</h3>
          <p>
            Se você está pronto para dar o próximo passo em direção a uma
            vida mais saudável e ativa, clique abaixo para começar seu plano
            de treino personalizado agora mesmo!Comece Seu Plano de
            TreinoNão importa qual seja a sua jornada fitness, estamos
            aqui para apoiar você em cada passo do caminho. Junte-se a
            nós e descubra o poder da transformação pessoal.
          </p>
        </span>
        <Link to="/atualizar-usuario">Atualizar Informações</Link>
        <button onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
}

export default BemVindo;
