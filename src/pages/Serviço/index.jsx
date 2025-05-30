import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { 
  Container, 
  ServiceSection, 
  CenteredText, 
  H2, 
  P, 
  ServiceCardsContainer, 
  ServiceCard, 
  ServiceButton, 
  HeroImage, 
  Overlay 
} from './style'; // Importando os estilos de style.js

import img from "../../assets/serv1.png";
import img2 from "../../assets/serv2.png";
import img3 from "../../assets/serv3.png";

const Servico = () => {
  return (
    <Container>
      <Header />

      <ServiceSection>
        <CenteredText>
          <H2>
            Nossos Serviços
          </H2>
          <P>
          Quem disse que malhar tem que ser chato? Transforme cada sessão de exercício em uma aventura energizante com nossos treinos dinâmicos e personalizados!
          </P>
        </CenteredText>

        <ServiceCardsContainer>
        {/* Seção para o "Flexfit Pass" */}
        <section>
          <ServiceCard>
            <img src={img} alt="Flexfit Pass" />
            <h3>Treino Alegre</h3>
            <p className="price">R$ 255,00</p>
            <p style={{ textAlign: 'justify' }}>
              Desperte sua rotina com sessões divertidas e dinâmicas que fazem você suar sorrindo. Transforme sua jornada fitness em pura alegria!
            </p>
            <ServiceButton>Agendar Agora</ServiceButton>
          </ServiceCard>
        </section>

        {/* Seção para o "Ritmo Fit" */}
        <section>
          <ServiceCard>
            <img src={img2} alt="Ritmo Fit" />
            <h3>Ritmo Fit</h3>
            <p className="price">R$ 385,00</p>
            <p style={{ textAlign: 'justify' }}>
            Explore o mundo enquanto se exercita! Nossos mapas de trilhas e circuitos fitness te levam a uma jornada cheia de energia e diversão.
            </p>
            <ServiceButton>Agendar Agora</ServiceButton>
          </ServiceCard>
        </section>

        {/* Seção para o "Espaço de Energia" */}
        <section>
          <ServiceCard>
            <img src={img3} alt="Espaço de Energia" />
            <h3>Dança e Suor</h3>
            <p className="price">R$ 515,00</p>
            <p style={{ textAlign: 'justify' }}>
            Mergulhe num mundo de passos animados com nossa aula de dança fitness! Queime calorias enquanto se diverte e descubra um novo ritmo de vida.
            </p>
            <ServiceButton>Agendar Agora</ServiceButton>
          </ServiceCard>
        </section>
      </ServiceCardsContainer>
      </ServiceSection>

      <HeroImage>
        <Overlay>
          <h2>Marque uma consulta gratuita</h2>
          <ServiceButton>Agendar Agora</ServiceButton>
        </Overlay>
      </HeroImage>

      <Footer />
    </Container>
  );
};

export default Servico;
