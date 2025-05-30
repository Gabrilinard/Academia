import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useAuth } from "../../contexts/AuthContext"; // Importe o hook useAuth
import bronzeImage from "../../assets/p1.jpg";
import intermediarioImage from "../../assets/intermed.jpg"; // Nova imagem
import prataImage from "../../assets/p2.jpg";
import ouroImage from "../../assets/p3.jpg";

const Title = styled.h1`
  font-weight: bold;
  font-size: 2rem;
  margin: 20px 0;
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 1000;
  text-align: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

// Estilos
const PageWrapper = styled.div`
  font-family: 'Sansita', sans-serif;
  text-align: center;
  margin: 0 auto;
  background-color: rgb(227, 228, 222);
`;

const PlanContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin: 20px;
`;

const PlanCard = styled.div`
  text-align: center;
  border: 3px solid gold; /* Borda dourada fixa */
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  height: 450px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 80%;
    height: auto;
  }
`;

const PlanImage = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 5px;
  object-fit: cover;
`;

const PlanName = styled.h2`
  font-size: 1.5rem;
  margin: 10px 0;
`;

const PlanPrice = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 5px 0;
`;

const PlanDuration = styled.p`
  color: grey;
  margin: 5px 0;
`;

const SubscribeButton = styled.button`
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: darkgreen;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Reduz o tamanho do botão em telas menores */
  }
`;

const EscolhaPlano = () => {
  const { user } = useAuth(); // Usando o hook useAuth
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/Entrar"); // Se não estiver logado, redireciona para a página de login
    }
  }, [user, navigate]);

  const handleSubscribe = (path) => {
    if (user) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate(path);
      }, 2000);
    } else {
      alert("Você precisa estar logado para fazer um plano.");
      navigate("/Entrar");
    }
  };

  return (
    <PageWrapper>
      <Header />
      <Title>Escolha seu plano</Title>
      {user && ( // Exibe os planos apenas se o usuário estiver logado
        <PlanContainer>
          <PlanCard>
            <PlanImage src={bronzeImage} alt="Iniciante" />
            <PlanName>Iniciante</PlanName>
            <PlanPrice>R$ 99,90</PlanPrice>
            <PlanDuration>Mensal</PlanDuration>
            <SubscribeButton onClick={() => handleSubscribe("/Curso_i")}>Ver Treino</SubscribeButton>
          </PlanCard>

          <PlanCard>
            <PlanImage src={intermediarioImage} alt="Intermediário" />
            <PlanName>Intermediário</PlanName>
            <PlanPrice>R$ 129,90</PlanPrice>
            <PlanDuration>Mensal</PlanDuration>
            <SubscribeButton onClick={() => handleSubscribe("/Curso_intermediario")}>Ver Treino</SubscribeButton>
          </PlanCard>

          <PlanCard>
            <PlanImage src={prataImage} alt="Avançado" />
            <PlanName>Avançado</PlanName>
            <PlanPrice>R$ 149,90</PlanPrice>
            <PlanDuration>Mensal</PlanDuration>
            <SubscribeButton onClick={() => handleSubscribe("/Curso_avancado")}>Ver Treino</SubscribeButton>
          </PlanCard>

          <PlanCard borderColor="gold">
            <PlanImage src={ouroImage} alt="Personalizado" />
            <PlanName>Personalizado</PlanName>
            <PlanPrice>R$ 239,90</PlanPrice>
            <PlanDuration>Mensal</PlanDuration>
            <SubscribeButton onClick={() => handleSubscribe("/Curso")}>Ver Treino</SubscribeButton>
          </PlanCard>
        </PlanContainer>
      )}

      {showPopup && (
        <>
          <Overlay />
          <Popup>
            Redirecionando para a página de treinos...
          </Popup>
        </>
      )}

      <Footer />
    </PageWrapper>
  );
};

export default EscolhaPlano;
