import { useEffect, useState } from "react";
import { FaQrcode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import { useAuth } from "../../contexts/AuthContext";
import emailjs from '@emailjs/browser';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: rgb(227, 228, 222);
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const PaymentContainer = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const PaymentMethods = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const PaymentOption = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px;
  margin: 0 10px;
  border: 2px solid ${(props) => (props.selected ? "green" : "#ccc")};
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Icon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: ${(props) => (props.selected ? "green" : "#555")};
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  color: white;
  background-color: green;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: darkgreen;
  }
`;

const QRCodeImage = styled.img`
  width: 80%;
  max-width: 300px;
  margin-top: 20px;
  display: ${(props) => (props.src ? "block" : "none")};
`;

const CopyButton = styled.button`
  display: block;
  width: 50%;
  margin: 20px auto;
  padding: 10px;
  font-size: 1rem;
  color: white;
  background-color: green;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: darkgreen;
  }
`;

const PaymentPage = () => {
  const [selectedMethod] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth(); // Pegando o usuário logado do contexto
  const navigate = useNavigate();
  const [qrCode, setQrCode] = useState("");
  const [copiado, setCopiado] = useState(false);


  const copiarParaClipboard = async () => {
    try {
      await navigator.clipboard.writeText(qrCode);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000); // Oculta o aviso após 2s
    } catch (err) {
      console.error("Erro ao copiar QR Code:", err);
    }
  };

  const handleClearCart = async () => {
    const usuarioId = user ? user.id : localStorage.getItem("usuario_id");
  
    if (!usuarioId) {
      alert("Usuário não identificado. Faça login novamente.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/carrinho/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_id: usuarioId,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao remover os itens do carrinho");
      }
  
      setCartItems([]);  
      localStorage.removeItem("totalAmount");
      localStorage.removeItem("cartItems");
      navigate("/Loja");
  
    } catch (error) {
      console.error("Erro ao processar a exclusão do carrinho:", error);
      alert("Erro ao processar a exclusão do carrinho: " + error.message);
    }
  };

  useEffect(() => {
    const storedTotalAmount = localStorage.getItem("totalAmount");
    const storedCartItems = localStorage.getItem("cartItems");
  
    if (storedTotalAmount) {
      setCartTotal(parseFloat(storedTotalAmount));
    }
  
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      // Verifique se parsedCartItems é um array válido antes de setar
      if (Array.isArray(parsedCartItems)) {
        setCartItems(parsedCartItems);
      } else {
        console.error("Erro: cartItems não é um array válido");
      }
    }
  }, []);
  
  const enviarEmail = async (emailData) => {
    if (!emailData.produtos || emailData.produtos.length === 0) {
      alert("Não há itens no carrinho para enviar.");
      return;
    }
  
    // Formatar a lista de produtos e suas quantidades
    const produtosList = emailData.produtos.map(item => `${item.produto_nome} - Quantidade: ${item.quantidade}`).join(", ");
  
    const templateParams = {
      nome: String(emailData.nome || ''),
      sobrenome: String(emailData.sobrenome || ''),
      email: String(emailData.email || ''),
      total: `R$ ${Number(emailData.total).toFixed(2)}`,
      produtos: String(produtosList),
    };
    
    // Logando o templateParams para verificar sua estrutura
    console.error('Template Params:', templateParams);
    console.log('Enviando para EmailJS com os seguintes dados:', {
      service_id: 'service_1yb1dkj',
      template_id: 'template_pv2hivq',
      public_key: '51GtvnMmEHno3_KsN',
      templateParams
    });    
  
    try {
      // Enviando o e-mail
      await emailjs.send('service_1yb1dkj', 'template_pv2hivq', templateParams, '51GtvnMmEHno3_KsN');
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
    }
  };   
  
  const criarPagamento = async () => {
  if (!cartTotal || cartTotal <= 0) {
    alert("O carrinho está vazio ou o valor total não foi encontrado.");
    return;
  }

  const email = user?.email || "gabrielleite729@gmail.com";

  try {
    const resposta = await fetch("http://localhost:5000/criar-pagamento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        valor: cartTotal,
        descricao: "Pagamento pelo evento",
        email,
        usuario_id: user?.id,
        cartItems,
        nome: user?.nome,
        sobrenome: user?.sobrenome,
      })
    });

    const dadosPagamento = await resposta.json();

    if (dadosPagamento.qrCodeBase64 && dadosPagamento.transaction_id) {
      setQrCode(dadosPagamento.qrCodeBase64);

      const transactionId = dadosPagamento.transaction_id;

      // Inicia a verificação apenas agora
      const intervalId = setInterval(async () => {
        try {
          const statusRes = await fetch(`http://localhost:5000/status-pagamento/${transactionId}`);
          const statusData = await statusRes.json();

          if (statusData.status === "approved") {
            clearInterval(intervalId); // para a verificação

            const emailData = {
              nome: user?.nome || "Usuário",
              sobrenome: user?.sobrenome || "",
              email: user?.email,
              total: cartTotal,
              produtos: cartItems,
            };

            await atualizarQuantidadeProdutos(cartItems);
            await enviarEmail(emailData);
            await handleClearCart();
            navigate("/Loja");
          }
        } catch (err) {
          console.error("Erro ao verificar status do pagamento:", err);
        }
      }, 10000); // Verifica a cada 10 segundos
    } else {
      alert("Ocorreu um erro ao tentar gerar o QR Code.");
    }

  } catch (erro) {
    console.error("Erro ao criar o pagamento:", erro);
  }
};

  
  // Função para atualizar a quantidade dos produtos no banco de dados após o pagamento
  const atualizarQuantidadeProdutos = async (cartItems) => {
    console.error(cartItems)
    for (const item of cartItems) {
      const produtoId = item.produto_id;  // ID do produto
      const quantidadeComprada = item.quantidade;  // Quantidade comprada do produto
    
      console.log("Atualizando produto ID:", produtoId);
      console.log("Quantidade comprada:", quantidadeComprada);
  
      const resposta = await fetch(`http://localhost:5000/api/produtos/${produtoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantidadeComprada,  // Envia a quantidade comprada para o backend
        }),
      });
    
      if (!resposta.ok) {
        throw new Error("Erro ao atualizar a quantidade do produto");
      }
    
      console.log("Quantidade do produto atualizada com sucesso!");
    }
  };  
  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=AYROVuejwmTav9wWeEFapRjXRJVLTWSrAPemWsp_2aY0nQM8UxIbG9ecEgd53npIGyuLr9THsfie3sRk&currency=BRL`;
    script.async = true;
    script.onload = () => {
      window.paypal.Buttons({
        createOrder(data, actions) {
          return actions.order.create({
            purchase_units: [{ amount: { value: cartTotal.toFixed(2) } }], 
          });
        },
        onApprove(data, actions) {
          return actions.order.capture().then(async (details) => {
            if (details.status === "COMPLETED") {
              alert("Pagamento realizado com sucesso!");
        
              const emailData = {
                nome: user?.nome || "Usuário",
                sobrenome: user?.sobrenome || "",
                email: user?.email,
                produtos: cartItems,
                total: cartTotal,
              };
        
              await enviarEmail(emailData);
              await handleClearCart();
              navigate("/Loja");
            } else {
              alert("Pagamento não foi concluído.");
              console.warn("Status inesperado:", details.status);
            }
          });
        },              
        onCancel() {
          alert("Pagamento cancelado.");
        },
        onError(err) {
          console.error(err);
        },
      }).render("#paypal-button-container");
    };
    document.body.appendChild(script);
  }, [cartTotal]);
  
  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        <PaymentContainer>
          <Title>Escolha seu Método de Pagamento</Title>
          <div>
            <h2>Valor a ser pago: R${cartTotal.toFixed(2)}</h2>
          </div>
          <div>
            <h3>Itens no Carrinho:</h3>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  <span>{item.produto_nome}</span> - Quantidade: {item.quantidade}
                </li>
              ))}
            </ul>
        </div>
          <PaymentMethods>
            <PaymentOption
              selected={selectedMethod === "pix"}
              onClick={criarPagamento}
            >
              <Icon selected={selectedMethod === "pix"}>
                <FaQrcode />
              </Icon>
              PIX
            </PaymentOption>
          </PaymentMethods>
          {qrCode && (
            <QRCodeImage
              src={qrCode}
              alt="QR Code PIX"
              style={{margin: 'auto'}}
            />
          )}
          <CopyButton onClick={copiarParaClipboard}>
            {copiado ? "Copiado!" : "Copiar Link PIX"}
          </CopyButton>
          <div id="paypal-button-container"></div>
        </PaymentContainer>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );  
}

export default PaymentPage;