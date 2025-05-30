import styled from 'styled-components';
import bannerImage from '../../assets/serv1.png';

export const Container = styled.div`
    margin: 0;
    padding: 0;
    background-color: rgb(227, 228, 222);
    font-family: 'Arial', sans-serif;
`;

export const Title = styled.h2`
    text-align: center;
    font-size: 4rem;
    margin: 40px 0 30px;
    font-weight: bold;
    font-family: 'Sansita', sans-serif;
    color: #333;
    @media (max-width: 768px) {
        font-size: 3rem;
    }
`;

export const Container_2 = styled.div`
    display: flex;
    justify-content: center; /* Centraliza as divs horizontalmente */
    align-items: center; /* Centraliza as divs verticalmente */
    gap: 20px;
    flex-wrap: wrap;
    margin: 20px;
    background-color: rgb(227, 228, 222);

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const H3 = styled.h3`
    font-family: 'Merriweather', serif;
    font-size: 2.0rem;
    color: #444;
    margin: 10px 0;
    line-height: 1.6;
    margin-top: 20px;
`;

export const Texto = styled.div`
    font-family: 'Merriweather', serif;
    font-size: 1.5rem;
    color: #444;
    margin: 10px 0;
    line-height: 1.6;

    @media (max-width: 768px) {
        font-size: 1.4rem;
    }
`;

export const Banner = styled.div`
    width: 100%;
    height: 350px;
    background: 
        linear-gradient(to bottom, rgba(227, 228, 222, 0.54) 0%, rgba(227, 228, 222, 0.8) 40%, rgba(227, 228, 222, 0) 100%),
        url(${bannerImage});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    position: relative;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);

    @media (max-width: 768px) {
        height: 250px;
    }
`;

// Estilo para as caixas dos treinos
export const Box = styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    width: 45%; /* Diminuímos a largura para tornar as divs mais naturais */
    height: 500px;
    text-align: center;
    font-family: 'Merriweather', serif;
    cursor: pointer;
    background-color: rgb(227, 228, 222);
    transition: background-color 0.3s;
    margin-bottom: 30px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: #e0e0e0;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 130px;
    }
`;

// Estilo para o botão "Ver Treino"
export const Button = styled.button`
background-color: #28a745; /* Botão verde */
color: white;
padding: 10px 20px;
border: none;
border-radius: 5px;
font-size: 1.2rem;
cursor: pointer;
transition: background-color 0.3s;

&:hover {
    background-color: #218838;
}
`;

// Estilo para a seção premium
export const PremiumSection = styled.div`
text-align: center;
padding: 20px;
border: 2px dashed #4caf50;
border-radius: 8px;
margin-top: 30px;
background: #f1f8e9;
width: 50%; /* Diminuímos a largura da div para "Ver Premium" ficar mais compacta */
margin: 0 auto; /* Centraliza a seção premium */

    h3 {
    color: #388e3c;
    }

    @media (max-width: 768px) {
        margin-top: 30px;
        width: 90%;
    }
`;

export const PremiumButton = styled.button`
background-color: #28a745;
color: white;
padding: 15px 40px;
border: none;
border-radius: 5px;
text-decoration: none;
transition: background-color 0.3s;
cursor: pointer;
margin-top: 30px;

&:hover {
    background-color: #218838;
}
`;

// Estilo para as imagens de treino
export const WorkoutImage = styled.img`
width: 50%; /* Diminuímos a largura das imagens para ficarem mais naturais */
height: 300px;
object-fit: cover;
object-position: center top;
border-radius: 10px;

@media (max-width: 768px) {
width: 100%;
height: 350px;
}
`;

export const WorkoutImage_1 = styled.img`
width: 50%; /* Diminuímos a largura das imagens para ficarem mais naturais */
height: 300px;
object-fit: cover;
object-position: center center;
border-radius: 10px;

@media (max-width: 768px) {
width: 100%;
height: 350px;
}
`;
