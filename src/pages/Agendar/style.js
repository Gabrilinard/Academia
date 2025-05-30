import styled from 'styled-components';


export const Container = styled.div`
    background-color: background-color: rgb(227, 228, 222);
    
`;

// Estilização específica para o conteúdo de agendamento
export const AgendarContainer = styled.div`
    flex: 1; /* Permite que o conteúdo cresça e ocupe o espaço disponível */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    gap: 40px;
    background-color: rgb(227, 228, 222);
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    max-width: 1200px;
    width: 100%;
    background-color: rgb(227, 228, 222);
`;

export const LeftSection = styled.div`
    flex: 1;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: rgb(227, 228, 222);
`;

export const Title = styled.h1`
    font-size: 3.1rem;
    color: black;
    font-weight: bold;
    margin-bottom: 20px;
    font-family: 'Sansita', sans-serif;
`;

export const Description = styled.p`
    font-size: 1.125rem;
    line-height: 1.75;
    color: #666;
    font-family: 'Merriweather', serif;
`;

export const RightSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: rgb(227, 228, 222);
`;

export const ServiceCard = styled.div`
    padding: 20px;
    border-radius: 8px;
    background-color: rgb(227, 228, 222);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const CardTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #333;
    font-family: 'Sansita', sans-serif;
`;

export const CardDescription = styled.p`
    font-size: 1rem;
    color: #666;
    margin-bottom: 10px;
    font-family: 'Merriweather', serif;
`;

export const CardList = styled.ul`
    margin-top: 10px;
    padding-left: 20px;
`;

export const CardListItem = styled.li`
    margin-bottom: 5px;
    font-size: 0.9rem;
    color: #444;
    font-family: 'Merriweather', serif;
`;

export const AgendarButton = styled.button`
    margin-top: 20px;
    background-color: #000;
    color: #fff;
    border: none;
    padding: 12px 24px;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.3s ease;

    &:hover {
        background-color: #444;
        transform: scale(1.05);
    }
`;

export const Footer = styled.footer`
    background-color: #333;
    color: #fff;
    padding: 20px;
    text-align: center;
    width: 100%;
    margin-top: auto; /* Adicionado para garantir que o footer se posicione no fundo */
`;

