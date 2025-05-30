import React, { Fragment } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import {
  Container,
  ContentContainer,
  LeftContent,
  RightContent,
  SectionTitle,
  SectionDescription,
  InstrutorImage,
  PrimeirosPassosContainer,
  PrimeirosPassosImage,
  TextOverlay,
  ButtonContainer,
  H2,
  Button,
} from './style';
// Importando as imagens da pasta assets
import instrutorImage from '../../assets/qm1.png'; // Ajuste o caminho se necessário
import primeirosPassosImage from '../../assets/img_home.png'; // Ajuste o caminho se necessário

const QuemSomos = () => {
  return (
    <Fragment>
      {/* Importando o Header */}
      <Header />
      <Container>
        {/* Conteúdo principal da página */}
        <ContentContainer>
          <LeftContent>
            <SectionTitle>Quem Somos</SectionTitle>
            <SectionDescription>
            Quem disse que malhar tem que ser chato? Transforme cada sessão de exercício em uma aventura energizante com nossos treinos dinâmicos e personalizados!
            </SectionDescription>
          </LeftContent>

          <RightContent>
            {/* Usando o componente de imagem estilizado */}
            <InstrutorImage src={instrutorImage} alt="Instrutor" />
          </RightContent>
        </ContentContainer>

        {/* Imagem "Primeiros Passos" com texto sobreposto */}
        <PrimeirosPassosContainer>
          <PrimeirosPassosImage src={primeirosPassosImage} alt="Primeiros Passos" />
          <TextOverlay>
            <H2>Primeiros passos</H2>
          </TextOverlay>
          <ButtonContainer>
            <Button>Ver Serviços</Button>
          </ButtonContainer>
        </PrimeirosPassosContainer>

        {/* Importando o Footer */}
        <Footer />
      </Container>
    </Fragment>
  );
};

export default QuemSomos;
