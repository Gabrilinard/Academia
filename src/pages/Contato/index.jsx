import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import contatoImg from '../../assets/fale1.png';

const FaleConoscoContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: rgb(227, 228, 222);
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que os elementos quebrem para a linha de baixo */
  justify-content: space-between;
  padding: 20px 50px;
  flex: 1;
  background-color: rgb(227, 228, 222);

  @media (max-width: 1024px) {
    flex-direction: column; /* Empilha os elementos na vertical */
    align-items: center; /* Centraliza os itens */
    padding: 20px;
  }
`;

const LeftContent = styled.div`
  width: 50%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    width: 100%; /* Ocupa toda a largura */
    padding-right: 0;
    text-align: center; /* Centraliza o conteúdo */
  }
`;

const RightContent = styled.div`
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;

  @media (max-width: 1024px) {
    width: 100%; /* Ocupa toda a largura em telas menores */
    margin-top: 30px; /* Adiciona espaçamento */
    display: flex;
    justify-content: center;
  }
`;

const ContactImage = styled.img`
  width: 100%;
  max-width: 600px; /* Define um limite para a imagem */
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 1024px) {
    max-width: 90%; /* Aumenta a largura em telas menores */
  }

  @media (max-width: 768px) {
    max-width: 100%; /* Ocupa toda a largura em telas muito pequenas */
  }
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 3.7rem;
  margin-bottom: 20px;
  margin-left: 10px;
  font-family: 'Sansita', sans-serif;
`;

const Description = styled.p`
  font-size: 1.1rem;
  margin-bottom: 20px;
  margin-left: 10px;
  line-height: 1.5;
  font-family: 'Merriweather', serif;
`;

const ContactInfo = styled.div`
  margin-bottom: 30px;
  font-size: 1rem;
  line-height: 1.5;
  margin-left: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: rgb(227, 228, 222);
  color: black;
  &::placeholder {
    color: black;
  }
`;

const TextArea = styled.textarea`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 15px;
  resize: vertical;
  background-color: rgb(227, 228, 222);
  color: black;
  &::placeholder {
    color: black;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: green;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: darkgreen;
  }
`;

const MessageBox = styled.div`
  margin-top: 15px;
  padding: 10px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
`;

const Contato = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    mensagem: '',
  });

  const [mensagemEnviada, setMensagemEnviada] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    
    const templateParams = {
      from_name: `${formData.nome} ${formData.sobrenome}`,
      to_name: "Nome do Destinatário", // Substitua pelo nome correto se necessário
      message: formData.mensagem,
      reply_to: formData.email,
    };

    emailjs
      .send('service_7b9tizr', 'template_ma23lyu', templateParams, 'vQZdInaP6mqPXTsxO')
      .then(
        () => {
          alert('Mensagem enviada com sucesso!');
          setMensagemEnviada(formData.mensagem);
          setFormData({ nome: '', sobrenome: '', email: '', mensagem: '' });
        },
        (error) => {
          alert('Erro ao enviar a mensagem.');
          console.error('Erro:', error.text);
        }
      );
  };

  return (
    <FaleConoscoContainer>
      <Header />
      <ContentContainer>
        <LeftContent>
          <Title>Fale Conosco</Title>
          <Description>
            Descreva os possíveis motivos para entrar em contato com você e o que esperar após o envio da mensagem.
          </Description>
          <ContactInfo>
            <p><strong>Email:</strong> email@exemplo.com</p>
            <p><strong>Telefone:</strong> (555) 555-5555</p>
          </ContactInfo>
          <Form ref={formRef} onSubmit={sendEmail}>
            <Input
              type="text"
              name="nome"
              placeholder="Nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
            <Input
              type="text"
              name="sobrenome"
              placeholder="Sobrenome"
              value={formData.sobrenome}
              onChange={handleInputChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <TextArea
              name="mensagem"
              placeholder="Mensagem"
              rows="5"
              value={formData.mensagem}
              onChange={handleInputChange}
              required
            ></TextArea>

            <SubmitButton type="submit">Enviar</SubmitButton>
          </Form>

          {mensagemEnviada && (
            <MessageBox>
              <strong>Mensagem enviada:</strong> {mensagemEnviada}
            </MessageBox>
          )}
        </LeftContent>
        <RightContent>
          <ContactImage src={contatoImg} alt="Fale Conosco" />
        </RightContent>
      </ContentContainer>
      <Footer />
    </FaleConoscoContainer>
  );
};

export default Contato;
