import styled from 'styled-components';

export const Message = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 25px;
  border-radius: 10px;
  font-size: 1.5rem;  /* aumentado */
  z-index: 1000;
  text-align: center;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 90%;
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    width: 95%;
    font-size: 1rem;
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
  font-size: 2.5rem;
  font-weight: bold;
  color: #444;
  text-align: left;
  letter-spacing: 1px;
  font-family: 'Nunino', sans-serif;

  @media (max-width: 768px) {
    text-align: left;
    font-size: 1.8rem;
  }
`;

export const SubTitle = styled.h2`
  font-family: 'Sansita', sans-serif;
  font-weight: bold;
  font-size: 3.5em;
  color: #555;
  margin-top: 5px;

  @media (max-width: 768px) {
    font-size: 2.7rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2em;
    text-align: center;
  }
`;

export const Title = styled.h1`
  font-family: 'Sansita', sans-serif;
  font-weight: bold;
  font-size: 3.9rem; /* aumentado */
  margin-bottom: 25px;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.5em;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 2em;
  }
`;

export const VideoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 30px 0;
  gap: 20px;

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
  }

  .video-wrapper {
    flex: 1;
    display: flex;
    justify-content: flex-end;

    .video-container {
      position: relative;
      width: 100%;
      max-width: 100%; /* Usa 100% da largura disponível */
      margin-top: 10px;
      height: 300px;
      
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      .checkbox-inside-video {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 255, 255, 0.85);
        padding: 6px 10px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: bold;
        font-size: 0.9rem;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

        @media (max-width: 480px) {
          position: static;
          margin-top: 10px;
          margin-left: 0;
          align-self: flex-start;
          background: transparent;
          box-shadow: none;
          justify-content: flex-start;
          padding: 0;
          font-size: 1rem;
        }
      }

      @media (max-width: 768px) {
        max-width: 100%;
        width: 270px;
        height: 250px;
      }

      @media (max-width: 480px) {
        max-width: 100%;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    .info {
      text-align: center;
      align-items: center;
    }

    .video-wrapper {
      justify-content: center;

      .video-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
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

export const ContentContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;

  @media (max-width: 480px) {
    text-align: center;
    align-items: center;
  }
`;

export const Checkbox = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 16px;
  user-select: none;

  input[type="checkbox"] {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #28a745;
    border-radius: 4px;
    background-color: #fff;
    position: relative;
    transition: all 0.2s ease;

    &:checked {
      background-color: #28a745;
      border-color: #28a745;
    }

    &:checked::after {
      content: '';
      position: absolute;
      left: 5px;
      top: 1px;
      width: 6px;
      height: 11px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.3);
    }
  }

  span {
    color: #333;
    font-weight: 500;
  }

  @media (max-width: 480px) {
    justify-content: flex-start;
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