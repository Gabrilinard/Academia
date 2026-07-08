import styled from 'styled-components';

// Adicionando a estilização para centralizar a mensagem na tela
// Container da página
export const Container = styled.div`
  background-color: rgb(227, 228, 222);
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* Centraliza o conteúdo na horizontal */
  text-align: center;
  min-height: 100vh;
  padding: 20px;

  /* Media Query para telas pequenas (mobile) */
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Container_geral = styled.div`
  background-color: rgb(227, 228, 222);
  font-family: Arial, sans-serif;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* Centraliza o conteúdo na horizontal */
  text-align: center;
  min-height: 100vh;

  /* Media Query para telas pequenas (mobile) */
  @media (max-width: 768px) {
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

  /* Media Query para telas pequenas (mobile) */
  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

// Subtítulo
export const SubTitle = styled.h2`
  font-family: 'Sansita', sans-serif;
  font-weight: bold;
  font-size: 1.8em;
  color: #555;
  margin-top: 20px;

  /* Media Query para telas pequenas (mobile) */
  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;

// Contêiner do layout
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column; /* Alinha os itens na coluna */
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px; /* Limita o tamanho máximo */
  margin-top: 20px;

  /* Media Query para telas pequenas (mobile) */
  @media (max-width: 768px) {
    margin-top: 10px;
    max-width: 100%;
    padding: 10px;
  }
`;

// Contêiner do conteúdo (lado direito)
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza o conteúdo */
  justify-content: space-between;
  text-align: left;
  padding: 20px;
  width: 100%;
  max-width: 900px;

  /* Media Query para telas pequenas (mobile) */
  @media (max-width: 768px) {
    padding: 10px;
    max-width: 100%;
  }
`;

export const Cont = styled.div`
  display: flex;
  align-items: center; /* Centraliza o conteúdo */
  justify-content: space-between;

  /* Media Query para telas pequenas (mobile) */
  @media (max-width: 768px) {
  }
`;

// Barra de progresso
export const ProgressBar = styled.div`
  width: 90%;
  height: 30px;
  background-color: rgb(106, 104, 104);
  border-radius: 5px;
  margin: 20px auto;
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

  /* Media Query para telas pequenas (mobile) */
  @media (max-width: 768px) {
    width: 80%;
  }
`;

// Seção do vídeo
export const VideoSection = styled.div`
  display: flex;
  flex-direction: column; /* Alinha o conteúdo em coluna */
  align-items: center; /* Centraliza o conteúdo */
  gap: 20px;
  margin-bottom: 20px;

  video {
    width: 90%;
    max-width: 500px;
    border-radius: 8px;
  }

  /* Media Query para telas pequenas (mobile) */
  @media (max-width: 768px) {
    video {
      max-width: 100%;
    }
  }
`;

// Checkbox para marcar vídeos assistidos
export const Checkbox = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1em;
  color: #333;
  margin-top: 20px;
  
  input {
    margin-right: 5px;
    transform: scale(1.3);
  }

  label {
    cursor: pointer;
    font-family: 'Nunino', sans-serif;
  }

  /* Media Query para telas pequenas (mobile) */
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

// Botão de adicionar treino
export const AddButton = styled.button`
  background-color: #28a745;
  color: white;
  font-size: 1.2rem;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 10px;

  &:hover {
    background-color: #218838;
  }

  /* Media Query para telas pequenas (mobile) */
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 5px 8px;
  }
`;

// Botões de ação (Renomear, Trocar vídeo, Remover)
export const RenameButton = styled.button`
  background-color: #ffc107;
  color: white;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 15px;

  &:hover {
    background-color: #e0a800;
  }

  /* Media Query para telas pequenas (mobile) */
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 15px;
  }
`;

export const ChangeVideoButton = styled.button`
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 15px;

  &:hover {
    background-color: #0056b3;
  }

  /* Media Query para telas pequenas (mobile) */
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 15px;
  }
`;

export const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #c82333;
  }

  /* Media Query para telas pequenas (mobile) */
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 15px;
  }
`;

// Mensagem de progresso centralizada
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

  /* Media Query para telas pequenas (mobile) */
  @media (max-width: 768px) {
    width: 90%;
    font-size: 1rem;
    padding: 15px;
  }
`;
