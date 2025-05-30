import styled from 'styled-components';
import img4 from "../../assets/serv4.jpg"; 

const Container = styled.div`
  background-color: rgb(227, 228, 222);
`;

const ServiceSection = styled.section`
  width: 100%;
  padding: 40px 20px;
  background-color: rgb(227, 228, 222);
  text-align: center;
`;

const CenteredText = styled.div`
  margin: 0 auto 40px;
  margin-bottom: 150px;
  display: flex;
  flex-direction: row; /* Exibe o título e o parágrafo lado a lado */
  justify-content: center;
  align-items: center;
  text-align: center; /* Centralizando o texto de ambos os elementos */
  gap: 350px; /* Espaço entre o título e o parágrafo */

  @media (max-width: 768px) {
    flex-direction: column; /* No mobile, o título fica em cima e o parágrafo embaixo */
    gap: 20px; /* Menor espaçamento entre o título e o parágrafo */
    text-align: justify; /* Justificando o parágrafo em telas menores */
    margin-bottom: 50px;
  }

  @media (max-width: 480px) {
    flex-direction: column; /* No mobile, o título fica em cima e o parágrafo embaixo */
    gap: 20px; /* Ajustando o espaço em telas menores */
    text-align: center;
    margin-bottom: 50px;
  }
`;

const H2 = styled.h2`
  font-size: 3.5rem;
  color: #333;
  font-weight: bold;
  font-family: 'Sansita', sans-serif;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const P = styled.p`
  font-size: 1.1rem;
  color: #666;
  font-family: 'Nunito Sans', sans-serif;
  text-align: justify;
  margin-top: 60px;
  width: 500px;

  @media (max-width: 768px) {
    width: 70%;
    font-size: 1rem;
    text-align: justify;
    margin-top: 10px;
  }

  @media (max-width: 480px) {
    width: 90%;
    font-size: 0.9rem;
    text-align: justify;
    margin-top: 10px;
  }
`;



const ServiceCardsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 100px;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 5px;
  }
`;

const ServiceCard = styled.div`
  background-color: rgb(227, 228, 222);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 400px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    border-radius: 10px;
  }

  h3 {
    font-size: 1.5rem;
    color: #333;
    margin: 10px 0;
    font-family: 'Sansita', sans-serif;
  }

  .price {
    font-size: 1.2rem;
    color: black;
    font-weight: bold;
    font-family: 'Nunito Sans', sans-serif;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 15px;
    font-family: 'Nunito Sans', sans-serif;
  }

  @media (max-width: 768px) {
    width: 320px;
  }

  @media (max-width: 480px) {
    width: 250px;
  }
`;

const ServiceButton = styled.button`
  background-color: rgb(100, 181, 70);
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  font-weight: bold;

  &:hover {
    background-color: rgb(73, 140, 49);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 12px;
  }
`;

const HeroImage = styled.div`
  width: 100%;
  height: 500px;
  background-image: url(${img4});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`;

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: white;

  h2 {
    font-size: 2.7rem;
    margin-bottom: 10px;
    font-family: 'Sansita', sans-serif;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 2rem;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export { Container, ServiceSection, CenteredText, H2, P, ServiceCardsContainer, ServiceCard, ServiceButton, HeroImage, Overlay };
