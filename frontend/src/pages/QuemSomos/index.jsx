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

// Imagens
import instrutorImage from '../../assets/qm1.png';
import primeirosPassosImage from '../../assets/img_home.png';
import foto1 from '../../assets/PHOTO-2025-07-11-21-00-56 2.jpg';
import foto2 from '../../assets/PHOTO-2025-07-11-21-00-56 3.jpg';
import foto3 from '../../assets/PHOTO-2025-07-11-21-00-56.jpg';
import foto4 from '../../assets/PHOTO-2025-07-11-21-03-03.jpg';
import foto5 from '../../assets/Último.png';

const QuemSomos = () => {
  return (
    <Fragment>
      <Header />
      <Container>
        <ContentContainer>
          <LeftContent>
            <SectionTitle>Mais que Suplementos: Transformação Real com Suporte Profissional</SectionTitle>
            <SectionDescription>
              Somos mais que uma loja de suplementos. Somos um projeto de vida dedicado a transformar corpos, mentes e rotinas por meio da saúde, da performance e da orientação certa.

              Unindo experiência prática como personal trainer com conhecimento em treinamento físico de resultados, criamos um espaço completo: aqui você encontra suplementos selecionados com qualidade garantida e um serviço de consultoria online personalizada, pensado para quem busca evolução constante com suporte profissional.

              Nosso compromisso é com você, com o seu progresso, com a sua saúde e com a sua conquista. Cada produto da nossa loja é escolhido com critério. Cada treino é elaborado com foco no seu objetivo, no seu nível atual e na sua rotina.

              Aqui, você encontra mais que produtos ou treinos: encontra suporte, motivação e acompanhamento de verdade.

              Saúde, performance e resultados, tudo em um só lugar.
            </SectionDescription>

            <SectionTitle>Evolução Contínua e Treinamento Personalizado</SectionTitle>
            <SectionDescription>
              Nosso programa de treinamento foi criado para acompanhar o progresso dos alunos de forma eficiente e segura, proporcionando uma experiência completa e adaptada a cada nível de condicionamento físico.

              A base do sucesso está em respeitar o ritmo de cada pessoa, e por isso oferecemos quatro modalidades de treino: Iniciante, Intermediário, Avançado e Personalizado.

              Cada etapa foi pensada para promover uma evolução natural, com foco na motivação e no rendimento contínuo. Com os treinos certos e o acompanhamento certo, cada aluno alcança o seu melhor.
            </SectionDescription>
          </LeftContent>

          <RightContent>
            <InstrutorImage src={instrutorImage} alt="Instrutor" />
          </RightContent>
        </ContentContainer>

        {/* Galeria de fotos responsiva */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            padding: '0 20px',
            margin: '40px 0',
          }}
        >
          {[foto1, foto2, foto3, foto4, foto5].map((foto, index) => (
            <div key={index} style={{ width: '100%', overflow: 'hidden', borderRadius: '12px' }}>
              <img
                src={foto}
                alt={`Galeria ${index + 1}`}
                style={{
                  width: '100%',
                  height: '360px',
                  aspectRatio: '4 / 3',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  display: 'block',
                }}
              />
            </div>
          ))}
        </div>

        <PrimeirosPassosContainer>
          <PrimeirosPassosImage src={primeirosPassosImage} alt="Primeiros Passos" />
          <TextOverlay>
            <H2>Primeiros passos</H2>
          </TextOverlay>
          <ButtonContainer>
            <Button>Ver Serviços</Button>
          </ButtonContainer>
        </PrimeirosPassosContainer>

        <Footer />
      </Container>
    </Fragment>
  );
};

export default QuemSomos;