import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { Container, Banner, Title, Container_2, Box, PremiumSection, PremiumButton, WorkoutImage_1, WorkoutImage, H3, Texto } from './style';
import bannerImage from '../../assets/serv1.png';
import masculinoImage from '../../assets/h3.jpg';
import femininoImage from '../../assets/m2.jpg';
import styled from 'styled-components';

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
  text-align: center;
  z-index: 1000;
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

const Treinos = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState("");  // Estado para controlar o input
  const navigate = useNavigate();

  const handleRedirect = (modalidade, origem) => {
    setShowPopup(true);
    setInputValue(modalidade);  // Atualiza o valor do input com "Personalizado"
    setTimeout(() => {
      setShowPopup(false);
      navigate(`/Selecionar?modalidade=${modalidade}&origem=${origem}`);
    }, 2000);
  };

  return (
    <Container>
      <Header />
      <Banner>
        <div style={{ backgroundImage: `url(${bannerImage})` }} />
      </Banner>
      <Title>Curso</Title>
      <Container_2>
        <Box onClick={() => handleRedirect("Personalizado", "curso")}>
          <WorkoutImage_1 src={masculinoImage} alt="masculino" />
          <H3>Treino Padrão Masculino Personalizado</H3>
          <Texto>Explore treinos para ganho de massa muscular.</Texto>
          <button 
            onClick={(e) => { e.stopPropagation(); handleRedirect("Personalizado", "curso"); }}
            style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Personalize aqui
          </button>
        </Box>
        <Box onClick={() => handleRedirect("Personalizado", "curso")}>
          <WorkoutImage src={femininoImage} alt="feminino" />
          <H3>Treino Padrão Feminino Personalizado</H3>
          <Texto>Descubra treinos focados em tonificação e força.</Texto>
          <button 
            onClick={(e) => { e.stopPropagation(); handleRedirect("Personalizado", "curso"); }}
            style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Personalize aqui
          </button>
        </Box>
      </Container_2>
      <PremiumSection>
        <Texto>Vire premium e tenha acesso a treinos exclusivos, dicas de nutrição e muito mais!</Texto>
        <PremiumButton onClick={() => handleRedirect("Personalizado", "curso")}>
          VIRAR PREMIUM
        </PremiumButton>
      </PremiumSection>

      {showPopup && (
        <>
          <Overlay />
          <Popup>
            Redirecionando para a página de seleção...
          </Popup>
        </>
      )}

      <Footer />
    </Container>
  );
};

export default Treinos;
