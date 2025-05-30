import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { FaQrcode } from "react-icons/fa";
import axios from 'axios'; 
import { AuthContext } from "../../contexts/AuthContext"; 
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
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const UserDetails = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  text-align: center;
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
  justify-content: space-between;
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

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [paymentValue, setPaymentValue] = useState(0);
  const [userData, setUserData] = useState({});
  const { user } = useContext(AuthContext); // Acessando o usuário a partir do AuthContext
  const navigate = useNavigate();
  const [qrCode, setQrCode] = useState(null); // imagem do Pix
  const [transactionId, setTransactionId] = useState(null);



  useEffect(() => {
    const savedData = localStorage.getItem("formData"); // Certifique-se de pegar os dados do formData
    if (savedData) {
      const { modalidade, genero, idade } = JSON.parse(savedData);
      setUserData({ modalidade, genero, idade });
      setPaymentValue(calculatePaymentValue(modalidade)); // Usa a modalidade correta para calcular o valor
    } else {
      navigate("/Selecionar");
    }
  }, [navigate]);
  
  const calculatePaymentValue = (modalidade) => {
    switch (modalidade) {
      case "Avançado":
        return 0.02;  // Ajuste o valor de pagamento conforme a modalidade
      case "Personalizado":
        return 0.03;
      default:
        return 0.01;
    }
  };
  

  const registerCourse = async (usuario_id, modalidade, genero, idade) => {
    try {
      const response = await axios.post("http://localhost:5000/api/cursos", {
        usuario_id: user.id,
        modalidade,
        genero,
        idade,
      });
  
      if (response.status === 200) {
        console.log('Curso registrado:', response.data);
        alert("Curso registrado com sucesso!");
      } else {
        alert("Erro ao registrar curso.");
      }
    } catch (error) {
      console.error("Erro ao registrar curso:", error.response || error);
      alert("Erro ao registrar curso.");
    }
  };


const enviarEmailPagamento = async () => {
  const templateParams = {
    to_email: 'acadluc17@gmail.com',
    user_name: user?.nome || 'Nome não informado',
    user_sobrenome: user?.sobrenome || 'Sobrenome não informado',
    user_email: user?.email,
    user_id: user?.id,
    modalidade: userData.modalidade,
    genero: userData.genero,
    idade: userData.idade,
    valor: paymentValue.toFixed(2),
  };  

  try {
    await emailjs.send(
      'service_1yb1dkj',
      'template_l7syhpe',
      templateParams,
      '51GtvnMmEHno3_KsN'
    );
    console.log('Email enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar email:', error);
  }
};

  
  // Função para assinar agora, incluindo os dados do usuário
  const assinarAgora = () => {
    const user = JSON.parse(localStorage.getItem("user")); // ou use o contexto de autenticação
    const modalidade = userData.modalidade;  // Pegue os dados do formulário
    const genero = userData.genero;  // Pegue os dados do formulário
    const idade = userData.idade;  // Pegue os dados do formulário
  
    if (user && user.id) {
      // Chama a função de registro passando os dados do usuário
      registerCourse(user.id, modalidade, genero, idade);
    } else {
      alert("Usuário não autenticado.");
    }
  
    // Redireciona para a página "MeusCursos"
    navigate('/MeusCursos');
  };

  const verificarPagamento = async () => {
    try {
      const statusRes = await fetch(`http://localhost:5000/verificar-status-curso/${transactionId}`);
      const statusData = await statusRes.json();
  
      if (statusData.status === "approved") {
        await registerCourse(user.id, userData.modalidade, userData.genero, userData.idade);
        await enviarEmailPagamento();
        navigate("/MeusCursos");
      } else {
        alert("Pagamento ainda não foi confirmado.");
      }
    } catch (err) {
      console.error("Erro ao verificar status do pagamento:", err);
    }
  };
  
  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=Aa-HoRa40BTWhIiplNRHvneT6ML0OiXJzis8pBSsCWCF01LRJg817oyXiEyJhYkwjpbB11Ir5hxmJr4o&currency=BRL`;
    script.async = true;
    script.onload = () => {
      window.paypal.Buttons({
        createOrder(data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: paymentValue.toFixed(2),
              },
            }],
          });
        },
        onApprove(data, actions) {
          return actions.order.capture().then((details) => {
            alert("Pagamento realizado com sucesso!");
            localStorage.setItem("paymentCompleted", "true");
  
            // Enviar os dados para o backend após o pagamento
            const usuario_id = user.id; // Pegue o ID do usuário de onde for necessário, agora usando o user.id do AuthContext
            const { modalidade, genero, idade } = userData;
            registerCourse(usuario_id, modalidade, genero, idade);
  
            navigate("/MeusCursos");
          });
        },
        onCancel(data) {
          alert("Pagamento cancelado.");
        },
        onError(err) {
          console.error(err);
        }
      }).render("#paypal-button-container");
    };
    document.body.appendChild(script);
  }, [paymentValue, userData, navigate, user]);


  const criarPagamento = async () => {
    if (!paymentValue || paymentValue <= 0) {
      alert("O valor não pode ser zero.");
      return;
    }
  
    const email = user?.email || "gabrielleite729@gmail.com";
    const { modalidade, genero, idade } = userData;
  
    try {
      const resposta = await fetch("http://localhost:5000/criar-pagamento-curso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          valor: paymentValue,
          descricao: "Pagamento por curso",
          email,
          usuario_id: user?.id,
          modalidade,
          genero,
          idade,
        })
      });
  
      const dadosPagamento = await resposta.json();
  
      if (dadosPagamento.qrCodeBase64 && dadosPagamento.transaction_id) {
        setQrCode(dadosPagamento.qrCodeBase64);
        setTransactionId(dadosPagamento.transaction_id); 
      } else {
        alert("Erro ao gerar QR Code.");
      }
  
    } catch (erro) {
      console.error("Erro ao criar o pagamento:", erro);
    }
  };
  

  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        <UserDetails>
          <h2>Detalhes da Assinatura</h2>
          <p><strong>Modalidade:</strong> {userData.modalidade}</p>
          <p><strong>Gênero:</strong> {userData.genero}</p>
          <p><strong>Idade:</strong> {userData.idade}</p>
        </UserDetails>

        <PaymentContainer>
          <Title>Escolha seu Método de Pagamento</Title>
          <h2>Valor a ser pago: R${paymentValue.toFixed(2)}</h2>
          <PaymentMethods>
            <PaymentOption
                selected={selectedMethod === "pix"}
                onClick={() => {
                  setSelectedMethod("pix");
                  criarPagamento(); 
                }}
              >
              <Icon selected={selectedMethod === "pix"}>
              <FaQrcode />
              </Icon>
              PIX
            </PaymentOption>
          </PaymentMethods>
          {selectedMethod === "pix" && (
            <>
              {qrCode && (
                <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <h3 style={{ textAlign: "center" }}>Escaneie o QR Code com seu app bancário:</h3>
                  <img
                    src={qrCode}
                    alt="QR Code Pix"
                    style={{ width: "320px", maxWidth: "90%", borderRadius: "8px", marginTop: "10px" }}
                  />
                  <Button onClick={verificarPagamento} style={{ marginTop: "20px", maxWidth: "300px", marginBottom: "30px" }}>
                    Já paguei, confirmar
                  </Button>
                </div>
              )}
            </>
          )}
          <div id="paypal-button-container"></div>
        </PaymentContainer>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default Payment;
