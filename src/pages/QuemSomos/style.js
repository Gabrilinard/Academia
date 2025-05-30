import styled from 'styled-components';

export const Container = styled.div`
  background-color: rgb(227, 228, 222);
`;

export const Html = styled.html`
  background-color: rgb(227, 228, 222); /* Cor de fundo aplicada a toda a página */
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif; /* Ajuste a fonte global aqui */
`;

export const SectionTitle = styled.h1`
  font-family: 'Sansita', sans-serif;
  font-weight: bold;
  font-size: 4.1rem;
  color: black;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 3.2rem;
    width: 400px;
  }

  @media (max-width: 480px) {
    font-size: 2.0rem;
  }
`;

export const SectionDescription = styled.p`
  font-family: 'Merriweather', serif;
  font-size: 1.2rem;
  color: black;
  text-align: left;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 1.0rem;
    text-align: justify;
    width: 300px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const TextOverlay = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 5.0rem;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const H2 = styled.h2`
  color: white;
  font-size: 4.5rem;
  font-family: 'Sansita', sans-serif;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 2.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;


// Container do conteúdo principal
export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 20px;
  margin-bottom: 40px;
  background-color: rgb(227, 228, 222); /* Aplicando a cor de fundo */
  width: 100%; /* Garantir que ocupe toda a largura da tela */
  flex-wrap: wrap; /* Garante que o conteúdo se ajuste em telas menores */
`;

// Seção da esquerda
export const LeftContent = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 80px;

  @media (max-width: 768px) {
    margin-left: 16px;
  }

  @media (max-width: 480px) {
    margin-left: 16px;
  }
`;

// Seção da direita (Imagem vertical)
export const RightContent = styled.div`
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center; /* Garante que a imagem fique centralizada */
  margin-bottom: 20px; /* Adiciona espaçamento inferior para a imagem */

  @media (max-width: 1024px) {
    width: 100%; /* Ocupa a largura total em telas menores */
  }
`;

export const InstrutorImage = styled.img`
  width: 80%; /* Ajusta a largura da imagem */
  max-width: 600px; /* Define um tamanho máximo */
  height: auto; /* Mantém a proporção */
  border-radius: 10px; /* Bordas arredondadas */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Sombra */

  @media (max-width: 1024px) {
    width: 90%; /* Aumenta a largura para telas menores */
    max-width: 700px; /* Aumenta o limite */
  }

  @media (max-width: 768px) {
    width: 95%; /* Maior ocupação da tela */
    max-width: 100%; /* Remove limite de tamanho */
  }
`;


export const PrimeirosPassosContainer = styled.div`
  position: relative;
  width: 100%;
  height: 550px; /* Ajusta a altura da imagem */
  overflow: hidden; /* Garante que a imagem não ultrapasse os limites */
`;

export const PrimeirosPassosImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Garante que a imagem esteja completamente visível */
  filter: brightness(0.8); /* Reduz um pouco o brilho para destacar o texto */
`;

export const ButtonContainer = styled.div`
  position: absolute;
  top: 50%; /* Ajusta o botão para ficar um pouco mais abaixo da frase */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  z-index: 1; /* Garante que o botão fique acima da imagem */
`;

export const Button = styled.button`
  padding: 15px 100px;
  font-size: 1.2rem;
  background-color: rgb(34, 155, 68);
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 30px;
  font-family: 'Merriweather', serif;

  &:hover {
    background-color: rgb(81, 165, 106);
  }
`;
