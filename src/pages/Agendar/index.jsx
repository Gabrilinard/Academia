import React from 'react';
import Header from '../../Components/Header'; // Importação do Header
import Footer from '../../Components/Footer'; // Importação do Footer
import {
    AgendarContainer,
    ContentWrapper,
    LeftSection,
    Title,
    Description,
    RightSection,
    ServiceCard,
    CardTitle,
    CardDescription,
    CardList,
    CardListItem,
    AgendarButton,
    Container,
} from './style';

const Agendar = () => {
    const handleAgendar = (service) => {
        const whatsappUrl = `https://wa.me/5598982021516?text=Quero%20agendar%20uma%20${service}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <Container>
            <Header />
            <AgendarContainer>
                <ContentWrapper>
                    <LeftSection>
                        <Title>Agendar</Title>
                        <Description>
                            Pronto para transformar sua rotina em uma experiência cheia de energia e diversão? 
                            Agende já sua aula experimental e descubra tudo o que as nossas academias e clubes de saúde têm a oferecer.
                        </Description>
                    </LeftSection>
                    <RightSection>
                        <ServiceCard>
                            <CardTitle>Consulta Gratuita</CardTitle>
                            <CardDescription>30 minutos</CardDescription>
                            <CardList>
                                <CardListItem>Avaliação inicial</CardListItem>
                                <CardListItem>Orientação sobre atividades</CardListItem>
                                <CardListItem>Sem custo</CardListItem>
                            </CardList>
                            <AgendarButton onClick={() => handleAgendar('consulta gratuita')}>Agendar</AgendarButton>
                        </ServiceCard>

                        <ServiceCard>
                            <CardTitle>Serviço Básico</CardTitle>
                            <CardDescription>1 hora - R$99</CardDescription>
                            <CardList>
                                <CardListItem>Acompanhamento personalizado</CardListItem>
                                <CardListItem>Acesso aos equipamentos</CardListItem>
                                <CardListItem>Plano inicial de treinos</CardListItem>
                            </CardList>
                            <AgendarButton onClick={() => handleAgendar('serviço básico')}>Agendar</AgendarButton>
                        </ServiceCard>

                        <ServiceCard>
                            <CardTitle>Serviço Avançado</CardTitle>
                            <CardDescription>1 hora - R$199</CardDescription>
                            <CardList>
                                <CardListItem>Treinamento especializado</CardListItem>
                                <CardListItem>Consultoria de saúde e bem-estar</CardListItem>
                                <CardListItem>Acesso VIP às instalações</CardListItem>
                            </CardList>
                            <AgendarButton onClick={() => handleAgendar('serviço avançado')}>Agendar</AgendarButton>
                        </ServiceCard>
                    </RightSection>
                </ContentWrapper>
            </AgendarContainer>
            <Footer />
        </Container>
    );
};

export default Agendar;
