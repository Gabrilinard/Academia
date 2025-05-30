import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { Container, Banner, Title, Container_2, Box, PremiumSection, PremiumButton, WorkoutImage_1, WorkoutImage, H3, Texto } from './style';
import bannerImage from '../../assets/serv1.png';
import masculinoImage from '../../assets/h_a.jpg';
import femininoImage from '../../assets/m_a.jpg';

const Treinos = () => {
    return (
        <Container>
            <Header />
            {/* Alterado para não passar o src diretamente */}
            <Banner>
                <div style={{ backgroundImage: `url(${bannerImage})` }} />
            </Banner>
            <Title>Curso</Title>
            <Container_2>
                <Box onClick={() => window.location.href = '/Avancado_h'}>
                    <WorkoutImage_1 src={masculinoImage} alt="masculino" />
                    <H3>Treino Padrão Masculino Avançado</H3>
                    <Texto>Explore treinos para ganho de massa muscular.</Texto>
                    <button style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Ver Treino</button>
                </Box>
                <Box onClick={() => window.location.href = '/Avancado_m'}>
                    <WorkoutImage src={femininoImage} alt="feminino" />
                    <H3>Treino Padrão Feminino Avançado</H3>
                    <Texto>Descubra treinos focados em tonificação e força.</Texto>
                    <button style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Ver Treino</button>
                </Box>
            </Container_2>
            <PremiumSection>
                <Texto>Vire premium e tenha acesso a treinos exclusivos, dicas de nutrição e muito mais!</Texto>
                <PremiumButton onClick={() => window.location.href = '/Selecionar?modalidade=Avançado'}>
                    VIRAR PREMIUM
                </PremiumButton>

            </PremiumSection>
            <Footer />
        </Container>
    );
};

export default Treinos;
