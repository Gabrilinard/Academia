import React from 'react';
import styled from 'styled-components';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import contatoImg from '../../assets/fale1.png';

const FaleConoscoContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: rgb(227, 228, 222);
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px 50px;
  flex: 1;
  background-color: rgb(227, 228, 222);

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
`;

const LeftContent = styled.div`
  width: 50%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    width: 100%;
    padding-right: 0;
    text-align: center;
  }
`;

const RightContent = styled.div`
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;

  @media (max-width: 1024px) {
    width: 100%;
    margin-top: 30px;
    justify-content: center;
  }
`;

const ContactImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 1024px) {
    max-width: 90%;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 3.7rem;
  margin-bottom: 20px;
  margin-left: 10px;
  font-family: 'Sansita', sans-serif;
`;

const Description = styled.p`
  font-size: 1.1rem;
  margin-bottom: 20px;
  margin-left: 10px;
  line-height: 1.5;
  font-family: 'Merriweather', serif;
`;

const WhatsAppButton = styled.button`
  margin-left: 10px;
  padding: 12px 25px;
  font-size: 1.1rem;
  background-color: #25D366;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: fit-content;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1ebe5d;
  }
`;

const Contato = () => {
  const handleWhatsAppRedirect = () => {
    const whatsappUrl = `https://wa.me/5598982021516?text=Olá!%20Gostaria%20de%20falar%20com%20vocês.`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <FaleConoscoContainer>
      <Header />
      <ContentContainer>
        <LeftContent>
          <Title>Fale Conosco</Title>
          <Description>
            Se tiver dúvidas, sugestões ou quiser falar diretamente conosco, clique no botão abaixo e fale com a gente pelo WhatsApp. Estamos prontos para te atender!
          </Description>
          <WhatsAppButton onClick={handleWhatsAppRedirect}>
            Falar no WhatsApp
          </WhatsAppButton>
        </LeftContent>
        <RightContent>
          <ContactImage src={contatoImg} alt="Fale Conosco" />
        </RightContent>
      </ContentContainer>
      <Footer />
    </FaleConoscoContainer>
  );
};

export default Contato;