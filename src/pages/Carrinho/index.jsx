import  { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CartContainer, CartTitle, EmptyCartMessage, ContinueShoppingButton, Container, CartItem, RemoveButton, PaymentButton, ContainerButton } from './style';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

const Carrinho = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!user || !user.id) return;

    const fetchCartFromDatabase = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/carrinho/${user.id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar carrinho');
        }
        const cartData = await response.json();

        // Certifique-se de que `produto_preco` e `produto_id` sejam números válidos antes de aplicá-los
        const formattedCart = cartData.map(item => ({
          ...item,
          produto_preco: Number(item.produto_preco),  // Converter para número
          quantidade: Number(item.quantidade),  // Garantir que a quantidade também seja um número
          produto_id: item.produto_id,  // Adicionar o produto_id
        }));

        setCartItems(formattedCart);
      } catch (error) {
        console.error('Erro ao carregar o carrinho:', error);
      }
    };

    fetchCartFromDatabase();
  }, [user]);

  const removeFromCart = async (productName) => {
    if (!user || !user.id) {
      alert("Você precisa estar logado para remover itens do carrinho.");
      return;
    }

    const confirmRemoval = window.confirm(`Você tem certeza que deseja remover uma unidade de ${productName} do carrinho?`);
    if (confirmRemoval) {
      try {
        const response = await fetch('http://localhost:5000/api/carrinho/remove', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            produto_nome: productName,
            usuario_id: user.id,
          }),
        });

        if (!response.ok) {
          throw new Error('Erro ao remover item do carrinho');
        }

        // Atualiza o estado local removendo o item
        setCartItems(prevCart =>
          prevCart
            .map(item =>
              item.produto_nome === productName
                ? { ...item, quantidade: item.quantidade - 1 }
                : item
            )
            .filter(item => item.quantidade > 0)
        );
      } catch (error) {
        console.error('Erro ao remover item do carrinho:', error);
      }
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.produto_preco * item.quantidade, 0);

  const handlePayment = () => {
    localStorage.setItem('totalAmount', totalAmount);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));  // Salva os itens do carrinho
  
    // Passando os ids dos produtos para a próxima página
    const productIds = cartItems.map(item => item.produto_id);  // Adicione `produto_id` no seu modelo de carrinho
    localStorage.setItem('productIds', JSON.stringify(productIds));  // Salva os ids dos produtos
  
    window.location.href = '/PagarLoja';
  };
  
  

  return (
    <Container>
      <Header />
      <CartContainer>
        <CartTitle>Carrinho de Compras</CartTitle>
        {cartItems.length === 0 ? (
          <EmptyCartMessage>Não há nenhum item no carrinho de compras.</EmptyCartMessage>
        ) : (
          <div>
            {cartItems.map((item) => (
              <CartItem key={item.produto_nome}>
                <p>{item.produto_nome} - R${item.produto_preco.toFixed(2)} x {item.quantidade}</p>
                <RemoveButton onClick={() => removeFromCart(item.produto_nome)}>Remover</RemoveButton>
              </CartItem>
            ))}
            <p><strong>Total: R${totalAmount.toFixed(2)}</strong></p>
            <ContainerButton>
              <ContinueShoppingButton onClick={() => window.location.href = '/Loja'}>
                Continuar Compras
              </ContinueShoppingButton>
              <PaymentButton onClick={handlePayment}>
                Pagar
              </PaymentButton>
            </ContainerButton>
          </div>
        )}
      </CartContainer>
      <Footer />
    </Container>
  );
};

export default Carrinho;
