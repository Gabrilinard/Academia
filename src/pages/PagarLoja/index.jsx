import { useEffect, useState, useRef } from "react";
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

const Icon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: ${(props) => (props.selected ? "green" : "#555")};
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

const PaymentOption = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px;
  margin: 0 10px;
  border: 2px solid ${(props) => (props.selected ? "green" : "#ccc")};
  border-radius: 10px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: transform 0.2s;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  filter: ${(props) => (props.disabled ? "grayscale(100%)" : "none")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  &:hover {
    transform: ${(props) => (props.disabled ? "none" : "scale(1.05)")};
  }
`;

const EnderecoSection = styled.div`
  margin: 30px auto;
  padding: 25px;
  width: 100%;
  max-width: 600px;
  background-color: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const EnderecoInput = styled.input`
  padding: 12px;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const EnderecoSelect = styled.select`
  padding: 12px;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const EnderecoTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const PaymentPage = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const [qrCode, setQrCode] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [mercadoPago, setMercadoPago] = useState(null);
  const cardFormRef = useRef(null);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [checkoutLink, setCheckoutLink] = useState("");
  const [endereco, setEndereco] = useState({
  rua: '', cidade: '', estado: '', cep: '', apt: ''
});
  const [enderecoConfirmado, setEnderecoConfirmado] = useState(false);

  const estadosCidades = {
  "AC": ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira"],
  "AL": ["Maceió", "Arapiraca", "Palmeira dos Índios"],
  "AM": ["Manaus", "Parintins", "Itacoatiara"],
  "AP": ["Macapá", "Santana", "Laranjal do Jari"],
  "BA": ["Salvador", "Feira de Santana", "Vitória da Conquista"],
  "CE": ["Fortaleza", "Caucaia", "Juazeiro do Norte"],
  "DF": ["Brasília"],
  "ES": ["Vitória", "Vila Velha", "Serra"],
  "GO": ["Goiânia", "Aparecida de Goiânia", "Anápolis"],
  "MA": ["São Luís", "Imperatriz", "Caxias"],
  "MG": ["Belo Horizonte", "Uberlândia", "Contagem"],
  "MS": ["Campo Grande", "Dourados", "Três Lagoas"],
  "MT": ["Cuiabá", "Várzea Grande", "Rondonópolis"],
  "PA": ["Belém", "Ananindeua", "Santarém"],
  "PB": ["João Pessoa", "Campina Grande", "Santa Rita"],
  "PE": ["Recife", "Jaboatão dos Guararapes", "Olinda"],
  "PI": ["Teresina", "Parnaíba", "Picos"],
  "PR": ["Curitiba", "Londrina", "Maringá"],
  "RJ": ["Rio de Janeiro", "Niterói", "Duque de Caxias"],
  "RN": ["Natal", "Mossoró", "Parnamirim"],
  "RO": ["Porto Velho", "Ji-Paraná", "Ariquemes"],
  "RR": ["Boa Vista", "Rorainópolis", "Caracaraí"],
  "RS": ["Porto Alegre", "Caxias do Sul", "Pelotas"],
  "SC": ["Florianópolis", "Joinville", "Blumenau"],
  "SE": ["Aracaju", "Nossa Senhora do Socorro", "Lagarto"],
  "SP": ["São Paulo", "Campinas", "São Bernardo do Campo"],
  "TO": ["Palmas", "Araguaína", "Gurupi"]
};

useEffect(() => {
    if (selectedMethod === "cartao" && !cardFormRef.current.hasChildNodes()) {
      const mp = new window.MercadoPago("APP_USR-e5fce221-9f17-4163-a03d-4f933d063be3");

      const bricksBuilder = mp.bricks();

      bricksBuilder.create("cardPayment", "card-form-container", {
        initialization: {
          amount: cartTotal,
        },
        callbacks: {
          onSubmit: async (cardData) => {
            console.log("Dados do cartão:", cardData);

            const res = await fetch("http://localhost:5000/processar-pagamento-cartao-produtos", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                token: cardData.token,
                payment_method_id: cardData.paymentMethodId,
                issuer_id: cardData.issuerId,
                email: user.email,
                amount: cartTotal,
                installments: cardData.installments,
                description: "Pagamento dos produtos",
                usuario_id: user.id,
                cartItems,
              }),
            });

            const result = await res.json();
            console.log("Resultado do pagamento:", result);

            if (result.status === "approved") {
              alert("Pagamento aprovado!");
              // limpar carrinho, redirecionar etc
            } else {
              alert("Pagamento não aprovado.");
            }
          },
          onError: (error) => {
            console.error("Erro no Brick:", error);
          },
          onReady: () => {
            console.log("Brick pronto!");
          },
        },
      });
    }
  }, [selectedMethod, cartTotal, user]);


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
      endereco_rua: endereco.rua,
      endereco_apt: endereco.apt || 'Nenhum dado informado.',
      endereco_cidade: endereco.cidade,
      endereco_estado: endereco.estado,
      endereco_cep: endereco.cep
    };
  
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

  const email = user?.email || "gabriel_linard.leite@somosicev.com";

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

const criarPagamentoCredito = async () => {
  if (!cartTotal || cartTotal <= 0) {
    alert("O carrinho está vazio ou o valor total não foi encontrado.");
    return;
  }

  const email = user?.email || "email@exemplo.com";

  try {
    const resposta = await fetch("http://localhost:5000/criar-pagamento-cartao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        valor: cartTotal,
        descricao: "Pagamento por produtos da loja",
        email,
        usuario_id: user?.id,
        cartItems,
        nome: user?.nome,
        sobrenome: user?.sobrenome,
      })
    });

    const dados = await resposta.json();

    if (dados.init_point) {
      setCheckoutLink(dados.init_point);

      const transactionId = dados.transaction_id;

      // Verificar status do pagamento a cada 10 segundos
      const intervalId = setInterval(async () => {
        try {
          const statusRes = await fetch(`http://localhost:5000/status-pagamento/${transactionId}`);
          const statusData = await statusRes.json();

          if (statusData.status === "approved") {
            clearInterval(intervalId);

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
      }, 10000);

    } else {
      alert("Erro ao iniciar pagamento com cartão.");
    }
  } catch (erro) {
    console.error("Erro ao criar pagamento com cartão:", erro);
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
  
  return (
    <PageContainer>
      <Header />
      <EnderecoSection>
        <EnderecoTitle>Confirme seu Endereço</EnderecoTitle>

        <EnderecoInput
          type="text"
          placeholder="Bairro + Rua"
          value={endereco.rua}
          onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })}
        />

        <EnderecoSelect
          value={endereco.estado}
          onChange={(e) => {
            setEndereco({ ...endereco, estado: e.target.value, cidade: "" });
          }}
        >
          <option value="">Selecione o estado</option>
          {Object.keys(estadosCidades).map((uf) => (
            <option key={uf} value={uf}>{uf}</option>
          ))}
        </EnderecoSelect>

        <EnderecoSelect
          value={endereco.cidade}
          onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
          disabled={!endereco.estado}
        >
          <option value="">Selecione a cidade</option>
          {endereco.estado &&
            estadosCidades[endereco.estado].map((cidade) => (
              <option key={cidade} value={cidade}>{cidade}</option>
            ))}
        </EnderecoSelect>

        <EnderecoInput
          type="text"
          placeholder="APT (opcional)"
          value={endereco.apt}
          onChange={(e) => setEndereco({ ...endereco, apt: e.target.value })}
        />

        <EnderecoInput
          type="text"
          placeholder="CEP"
          value={endereco.cep}
          onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })}
        />

        <CopyButton
          onClick={() => {
            if (endereco.rua && endereco.cidade && endereco.estado && endereco.cep) {
              setEnderecoConfirmado(true);
              alert("Endereço confirmado!");
            } else {
              alert("Preencha todos os campos do endereço.");
            }
          }}
        >
          Confirmar Endereço
        </CopyButton>
      </EnderecoSection>
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
              disabled={!enderecoConfirmado}
              onClick={() => {
                if (!enderecoConfirmado) return;
                setSelectedMethod("pix");
                criarPagamento();
              }}
            >
              <Icon selected={selectedMethod === "pix"}>
                <FaQrcode />
              </Icon>
              PIX
            </PaymentOption>

            <PaymentOption
              selected={selectedMethod === "cartao"}
              disabled={!enderecoConfirmado}
              onClick={() => {
                if (!enderecoConfirmado) return;
                setSelectedMethod("cartao");
              }}
            >
              <Icon selected={selectedMethod === "cartao"}>
                💳
              </Icon>
              Cartão de Crédito
            </PaymentOption>
        </PaymentMethods>
          {selectedMethod === "pix" && qrCode && (
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <h3 style={{ textAlign: "center" }}>Escaneie o QR Code com seu app bancário:</h3>
              <img
                src={qrCode}
                alt="QR Code Pix"
                style={{ width: "320px", maxWidth: "90%", borderRadius: "8px", marginTop: "10px" }}
              />
              <CopyButton onClick={copiarParaClipboard}>
                {copiado ? "Copiado!" : "Copiar Link PIX"}
              </CopyButton>
            </div>
          )}

          {selectedMethod === "cartao" && (
  <div style={{ marginTop: "20px", width: "100%" }}>
    <div id="card-form-container" ref={cardFormRef} style={{ width: "100%" }}></div>
  </div>
)}
        </PaymentContainer>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );  
}

export default PaymentPage;