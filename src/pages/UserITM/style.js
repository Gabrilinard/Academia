import styled from 'styled-components';

// Adicionando a estilização para centralizar a mensagem na tela
export const Message = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  border-radius: 10px;
  font-size: 1.2rem;
  z-index: 1000;
  text-align: center;
  width: 80%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 90%;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    width: 95%;
    font-size: 0.9rem;
  }
`;

// Container da página
export const Container = styled.div`
  background-color: rgb(227, 228, 222);
  font-family: Arial, sans-serif;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const Title_2 = styled.h3`
  font-size: 0.9rem;
  font-weight: bold;
  color: #444;
  margin-top: 10px;
  text-align: left;
  letter-spacing: 1px;
  font-family: 'Nunino', sans-serif;
`;

// Título principal
export const Title = styled.h1`
  font-family: 'Sansita', sans-serif;
  font-weight: bold;
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2em;
  }

  @media (max-width: 480px) {
    font-size: 1.5em;
  }
`;

// Subtítulo
export const SubTitle = styled.h2`
  font-family: 'Sansita', sans-serif;
  font-weight: bold;
  font-size: 1.8em;
  color: #555;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 1.5em;
  }

  @media (max-width: 480px) {
    font-size: 1.2em;
  }
`;

// Seção do vídeo
export const VideoSection = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;

  video {
    width: 35%;
  }

  @media (max-width: 768px) {
    video {
      width: 60%;
    }
  }

  @media (max-width: 480px) {
    video {
      width: 80%;
    }
  }
`;

// Barra de progresso
export const ProgressBar = styled.div`
  width: 51%;
  height: 30px;
  background-color: rgb(106, 104, 104);
  border-radius: 5px;
  margin-top: 20px;
  margin: auto;
  position: relative;

  .progress-bar-green {
    width: ${props => props.progress}%;
    height: 100%;
    background-color: #28a745;
    border-radius: 5px;
    transition: width 0.5s ease;
  }

  span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 90%;
  }
`;

// Contêiner do layout (imagem à esquerda e conteúdo à direita)
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ChapterContainer = styled.div`
  margin: 30px 0;
  margin: auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 765px;

  @media (max-width: 768px) {
    width: 100%;
    width: 400px;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 15px;
  }
`;

export const ChapterTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bolder;
  color: #333;
  margin-bottom: 15px;
  padding: 10px;
  color: black;
  border-radius: 4px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

// Contêiner do conteúdo (lado direito)
export const ContentContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
`;

// Checkbox para marcar vídeos assistidos
export const Checkbox = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  input[type="checkbox"] {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%; /* Tornando o checkbox redondo */
    border: 2px solid #007BFF; /* Cor da borda */
    margin-right: 10px; /* Distância do checkbox para o texto */
    position: relative;
    cursor: pointer;
    background-color: white;
    transition: all 0.2s ease-in-out;
  }

  input[type="checkbox"]:checked {
    background-color: #007BFF; /* Cor de fundo quando marcado */
    border-color: #007BFF; /* Borda quando marcado */
  }

  input[type="checkbox"]:checked::before {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  label {
    font-size: 16px;
    color: #333;
  }
`;

export const Container_2 = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 30px;
  text-align: left;

  @media (max-width: 768px) {
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

// Botão de Trocar Vídeo
export const ChangeVideoButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }

  @media (max-width: 768px) {
    font-size: 0.9em;
  }

  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;

// Botão de Remover Treino
export const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }

  @media (max-width: 768px) {
    font-size: 0.9em;
  }

  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;

export const Chapter = styled.div`
  background: white;
  padding: 20px;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 800px;

  h2 {
  font-family: 'Sansita', sans-serif;  
  font-weight: bolder;
  }
`;

// Botão de Adicionar Novo Treino
export const AddButton = styled.button`
  background-color: #ffc107;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 1.2em;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0a800;
  }

  @media (max-width: 768px) {
    font-size: 1em;
  }

  @media (max-width: 480px) {
    font-size: 0.9em;
  }
`;