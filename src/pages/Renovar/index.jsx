import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { FaQrcode } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext"; // Importar o AuthContext
import axios from 'axios'; // Importar axios para fazer requisições HTTP

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
  font-family: 'Sansita', sans-serif;
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

const RenewCourse = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [paymentValue, setPaymentValue] = useState(0);
  const [userData, setUserData] = useState({});
  const { user } = useContext(AuthContext); // Acessando o usuário a partir do AuthContext
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null); // Adicionando estado para armazenar o curso

  useEffect(() => {
    if (!user) {
      // Redirecionar se o usuário não estiver autenticado
      navigate("/login");
      return;
    }

    const savedData = localStorage.getItem("formData"); // Certifique-se de pegar os dados do formData
    if (savedData) {
      const { modalidade, genero, idade } = JSON.parse(savedData);
      setUserData({ modalidade, genero, idade });
      setPaymentValue(calculatePaymentValue(modalidade)); // Usa a modalidade correta para calcular o valor
      fetchUserCourseData(user.id); // Carregar dados do curso do usuário usando a id do usuário
    } else {
      navigate("/Selecionar");
    }
  }, [navigate, user]);

  const fetchUserCourseData = async (usuario_id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cursos/${usuario_id}`);
      if (response.status === 200) {
        setCourseData(response.data);
      } else {
        alert("Curso não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao carregar dados do curso:", error);
      alert("Erro ao carregar os dados do curso.");
    }
  };

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

  const renewCourse = async (usuario_id) => {
    try {
      const response = await axios.put("http://localhost:5000/api/renovar_curso", {
        usuario_id,
        modalidade: userData.modalidade,
        genero: userData.genero,
        idade: userData.idade,
        tempo_restante: 30, // Exemplo de tempo restante a ser adicionado (ajuste conforme necessário)
      });
  
      if (response.status === 200) {
        alert("Curso renovado com sucesso!");
      } else {
        alert("Erro ao renovar curso.");
      }
    } catch (error) {
      console.error("Erro ao renovar curso:", error);
      alert("Erro ao renovar curso.");
    }
  };
  

  // Função para realizar o pagamento e renovar o curso
  const handlePayment = () => {
    if (user && user.id) {
      // Realizar o pagamento via PayPal
      completePayment(user.id);
    } else {
      alert("Usuário não encontrado.");
    }
  };

  const completePayment = (usuario_id) => {
    // Simulação de pagamento bem-sucedido
    alert("Pagamento realizado com sucesso!");
  
    // Chama a função de renovação do curso após o pagamento
    renewCourse(usuario_id);
  
    // Redireciona para a página MeusCursos
    navigate('/MeusCursos');
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
            renewCourse(usuario_id);

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

  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        <UserDetails>
          <h2>Detalhes da Renovação</h2>
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
              onClick={() => setSelectedMethod("pix")}
            >
              <Icon selected={selectedMethod === "pix"}>
                <FaQrcode />
              </Icon>
              PIX
            </PaymentOption>
          </PaymentMethods>
          <div id="paypal-button-container"></div>
          <Button onClick={handlePayment}>Simular Pagamento</Button>
        </PaymentContainer>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default RenewCourse;
