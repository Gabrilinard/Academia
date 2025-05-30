import styled from 'styled-components';

// Container principal do Carrinho
export const Container = styled.div`
  background-color: rgb(227, 228, 222);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// Estilo para o container da página de carrinho
export const CartContainer = styled.div`
  margin: 0;
  padding: 20px;
  background-color: rgb(227, 228, 222);
  font-family: 'Arial', sans-serif;
`;

// Estilo para o título "Carrinho de Compras"
export const CartTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  font-family: 'Sansita', sans-serif;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

// Estilo para a mensagem quando o carrinho está vazio
export const EmptyCartMessage = styled.p`
  text-align: center;
  font-size: 1.6rem;
  color: #555;
  margin-top: 20px;
  font-family: 'Nunito Sans', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

// Estilo para o botão "Continuar Compras"
export const ContinueShoppingButton = styled.button`
  display: block;
  padding: 15px 40px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  margin: auto;
  display: block;
  font-size: 1.4rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

// Estilo para o botão de pagamento
export const PaymentButton = styled.button`
  display: block;
  padding: 15px 40px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.4rem;
  margin: auto;
  display: block;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

// Estilo para os itens do carrinho
export const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

// Estilo para o item do carrinho
export const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 1.6rem;
`;

// Estilo para o nome e preço do produto
export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.6rem;
  color: #333;
`;

// Estilo para o botão de remover do carrinho
export const RemoveButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: darkred;
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;
