import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../estilizações/bemvindo.css';

function BemVindo() {
  const navigate = useNavigate();

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
    // Redireciona para a página de login
    navigate('/');
    window.location.reload();
  };

  return (
    <div>
      <div className="containerHome">
        <h2 className="tituloHome">Olá, {userData.nome}!</h2>
        <span className="spanHome">
          <p className="textoHome">
            Seja bem-vindo(a) ao nosso espaço dedicado ao seu bem-estar
            físico e mental. Aqui, você encontrará tudo o que precisa para
            alcançar seus objetivos de fitness de forma personalizada
            e eficaz.
            Crie planos de treino personalizados que se adaptem às suas
            necessidades específicas. Nossas ferramentas intuitivas 
            permitem que você monte seu próprio plano de treino ou escolha 
            entre uma variedade de opções predefinidas. Encontre o plano 
            perfeito para alcançar seus objetivos.
          </p>
        </span>
        <span className="spanHome">
          <h3 className="subtituloHome">Explore Nossos Recursos:</h3>
          <p className="textoHome">
            Exercícios Personalizados: Escolha os <Link className="linksHome" to="/exercise-list">exercícios</Link> adequados para
            a sua meta e nível de condicionamento físico. Personalizamos
            cada plano para você. Planos de Treino: Crie e gerencie seus
            próprios <Link className="linksHome" to="/meus-planos">planos de treino</Link> ou escolha entre os que
            oferecemos. Seu caminho para um corpo mais saudável começa aqui.
          </p>
        </span>
        <span className="spanHome">
          <h3 className="subtituloHome">Pronto para Começar?</h3>
          <p className="textoHome">
            Se você está pronto para dar o próximo passo em direção a uma
            vida mais saudável e ativa, clique <Link className="linksHome" to="/exercise-list">aqui</Link> para visualizar nossos
            exercícios e começar seu plano
            de treino personalizado agora mesmo! Comece Seu Plano de
            Treino Não importa qual seja a sua jornada fitness, estamos
            aqui para apoiar você em cada passo do caminho. Junte-se a
            nós e descubra o poder da transformação pessoal.
          </p>
        </span>
        <button className="botaoHome" onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
}

export default BemVindo;
