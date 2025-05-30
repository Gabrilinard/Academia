import styled from 'styled-components';

// Estilos para o texto
export const WelcomeText = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  max-width: 80%;
  margin-top: 100px;

  @media (max-width: 768px) {
    font-size: 1.0rem;
    max-width: 100%;
    width: 380px;
    margin-top: 70px;
  }
`;

export const TextWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: 'Nunito Sans', sans-serif;
`;

// Container principal
export const Container = styled.div`
  background-color: rgb(227, 228, 222);
  display: flex;
  flex-direction: column;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

// Container da imagem principal
export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
`;

// Estilo da imagem
export const Image = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
  display: block;
  filter: brightness(0.4);

  @media (max-width: 768px) {
    height: 500px;
    border-radius: 10px;
  }
`;

// Texto sobreposto à imagem
export const OverlayText = styled.div`
  position: absolute;
  color: white;
  font-size: 4.5rem;
  font-weight: bold;
  text-align: center;
  z-index: 1;
  font-family: 'Sansita', sans-serif;

  @media (max-width: 768px) {
    font-size: 2.6rem;
  }
`;

// Título da seção de produtos
export const SectionTitle = styled.h2`
  text-align: center;
  margin-top: 30px;
  font-size: 2.5rem;
  font-weight: bold;
  color: black;
  font-family: 'Sansita', sans-serif;

  @media (max-width: 768px) {
    font-size: 2.1rem;
  }
`;

// Container para os produtos
export const ProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: 40px auto;
  width: 80%;
  flex-wrap: wrap;
  font-family: 'Nunito Sans', sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

// Estilo para cada imagem de produto
export const ProductImage = styled.div`
  width: 30%;
  text-align: center;

  @media (max-width: 768px) {
    width: 80%;
    margin: 10px auto;
  }

  img {
    width: 80%;
    height: 250px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 15px;
  }
`;


// Estilo das informações do produto
export const ProductInfo = styled.div`
  p {
    font-size: 1.4rem;
    color: #333;
  }
`;

// Botão de adicionar ao carrinho
export const ButtonAdd = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }

  @media (max-width: 768px) {
    padding: 2px 7px;
    font-size: 1.2rem;
`;

// Botão "Ir para a Loja"
export const ButtonLoja = styled.button`
  display: block;
  margin: 20px auto;
  padding: 15px 40px;
  background-color: rgb(31, 208, 73);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.4rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(17, 137, 27);
  }

  @media (max-width: 768px) {
    padding: 10px 30px;
    font-size: 1.2rem;
  }
`;

export const FaleConoscoContainer = styled.section`
  padding: 50px 20px;
  background-color: rgb(227, 228, 222);

  @media (max-width: 768px) {
    padding: 30px 10px;
    margin: auto;
  }
`;

export const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 70px;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    padding: 10px;
    text-align: center;
    margin: auto;
    display: inline-block;
  }
`;

export const LeftContent = styled.div`
  width: 60%;
  padding: 20px;
  background-color: rgb(227, 228, 222);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  font-family: 'Sansita', sans-serif;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const Description = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
`;

export const ContactInfo = styled.div`
  margin-bottom: 20px;
  
  p {
    font-size: 16px;
    color: #444;
  }
  
  strong {
    color: #333;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
  background-color: rgb(227, 228, 222);

  &:focus {
    border-color: #007BFF;
  }
`;

export const TextArea = styled.textarea`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
  background-color: rgb(227, 228, 222);

  &:focus {
    border-color: #007BFF;
  }
`;

export const SubmitButton = styled.button`
  padding: 15px;
  background-color: #007BFF;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

// Estilo para a imagem ao lado do formulário
export const ImageContainer_2 = styled.div`
  width: 35%;
  img {
    width: 100%;
    border-radius: 10px;
    height: 737px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const RedesSociaisContainer = styled.div`
  margin: 50px 0;
  background-color: rgb(227, 228, 222);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
    height: 500px;
  }
`;

export const Display = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SocialButton = styled.button`
  padding: 15px;
  background-color: transparent;
  color: rgb(79, 79, 79);
  font-size: 18px;
  font-weight: bold;
  border: 2px solid rgb(79, 79, 79);
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: rgb(79, 79, 79);
    color: white;
    border-color: transparent;
  }

  @media (max-width: 768px) {
    width: 50%;
    padding: 10px;
  }
`;


export const SocialImagesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    width: 90%;
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr; /* 1 imagem por linha em telas menores */
    gap: 10px;
    margin: auto;
  }
`;

export const SocialImage = styled.img`
  width: 24%;
  border-radius: 8px;
  object-fit: cover;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 10px;
    border-radius: 10px;

    /* Condicionalmente aplicar estilos */
    ${({ lgId }) => lgId === 'lg1' && `
      width: 160px;
      height: 157px;
      object-position: top center;
    `}

    ${({ lgId }) => lgId === 'lg2' && `
      width: 160px;
      height: 152px;
    `}
  }
`;



