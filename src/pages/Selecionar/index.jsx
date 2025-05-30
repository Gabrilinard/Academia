import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useAuth } from "../../contexts/AuthContext";  // Importando o contexto

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

const FormContainer = styled.div`
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

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  margin-bottom: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: ${({ disabled }) => (disabled ? "#f0f0f0" : "white")};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
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

const Selecionar = () => {
  const [modalidade, setModalidade] = useState("");
  const [genero, setGenero] = useState("");
  const [idade, setIdade] = useState("");
  const { user } = useAuth();  // Obtendo o usuário do contexto
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const modalidadeQuery = queryParams.get("modalidade");
    const origemQuery = queryParams.get("origem");

    if (modalidadeQuery) {
      setModalidade(modalidadeQuery);
    }

    if (modalidadeQuery === "Avançado") {
      setGenero(queryParams.get("genero") || "");
    }

    if (origemQuery === "curso" && modalidadeQuery === "Personalizado") {
      setModalidade("Personalizado");
    }
  }, [location]);

  const handleSubmitForm = async () => {
    if (modalidade && genero && idade) {
      if (!user) {
        alert("Usuário não autenticado.");
        return;
      }
  
      // Armazenar os dados no localStorage antes de navegar
      localStorage.setItem("formData", JSON.stringify({ modalidade, genero, idade }));
      alert("Formulário enviado. Aguardando o pagamento.");
  
      navigate("/Assinar"); // Redireciona para a página de pagamento
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };
  
  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        <FormContainer>
          <Title>Preencha o Formulário</Title>
          <FormGroup>
            <Label>Selecione a Modalidade</Label>
            <Select
              value={modalidade}
              onChange={(e) => setModalidade(e.target.value)}
              disabled={modalidade === "Avançado" || modalidade === "Personalizado" || modalidade === "Iniciante" || modalidade === "Intermediário"}
            >
              <option value="">Selecione...</option>
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
              <option value="Personalizado">Personalizado</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Selecione o Gênero</Label>
            <Select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Idade</Label>
            <Input
              type="number"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              required
            />
          </FormGroup>
          <Button onClick={handleSubmitForm}>Enviar</Button>
        </FormContainer>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default Selecionar;
