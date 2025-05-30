import styled from 'styled-components';

export const Container = styled.div`
  background-color: rgb(227, 228, 222);
  font-family: Arial, sans-serif;
  padding: 20px;
  text-align: center;
  min-height: 100vh;
`;

export const Title = styled.h1`
  font-family: 'Sansita', sans-serif;
  font-weight: bold;
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;
`;

export const SubTitle = styled.h2`
  font-family: 'Sansita', sans-serif;
  font-weight: bold;
  font-size: 1.8em;
  color: #555;
  margin-top: 20px;
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

export const VideoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;

  video {
    width: 40%;
    max-width: 500px;
    border-radius: 8px;
  }
`;

export const Video = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;

  video {
    max-width: 80%;
    border-radius: 8px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  padding: 20px;
  width: 900px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

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
`;

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
`;
