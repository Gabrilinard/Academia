import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import imgHome from '../../assets/img_home.png'; // Imagem da home
import creatinaImg from '../../assets/creatina.jpeg'; // Imagem de Creatina
import hipercaloricoImg from '../../assets/hipercalorico.jpeg'; // Imagem de Hipercalórico
import formhome from '../../assets/formhom.png'; // 
import logo from '../../assets/logolg.jpeg'; // 
import lg1 from '../../assets/imglg1.jpeg'; // 
import lg2 from '../../assets/imglg2.jpeg'; // 
import lg3 from '../../assets/imglg3.jpeg'; // 
import wheyImg from '../../assets/whey.jpeg'; // Imagem de Whey
import { WelcomeText, TextWrapper, Container, ImageContainer, Image, OverlayText, SectionTitle, ProductContainer, ProductImage, ProductInfo, ButtonAdd, ButtonLoja, FaleConoscoContainer, ContentContainer, LeftContent, Title, Description, ContactInfo, Form, Input, TextArea, SubmitButton, ImageContainer_2, RedesSociaisContainer, SocialButton, SocialImagesContainer, SocialImage, Display} from './style'; // Estilos
import { useAuth } from '../../contexts/AuthContext';
import emailjs from 'emailjs-com'; // Certifique-se de ter o emailjs configurado

const Home = () => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    mensagem: '',
  });
  const [mensagemEnviada, setMensagemEnviada] = useState('');
  const formRef = useRef();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // 🔹 Criando um array de produtos
  const products = [
    { id: 1, name: 'Creatina', price: 120.00, image: creatinaImg },
    { id: 2, name: 'Hipercalórico', price: 110.00, image: hipercaloricoImg },
    { id: 3, name: 'Whey Protein', price: 120.00, image: wheyImg }
  ];

  const handleAddToCart = async (produtoId, produtoNome, produtoPreco) => {
    if (!user) {
      alert("Você precisa estar logado para adicionar produtos ao carrinho.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/carrinho', {
        usuario_id: user.id,
        produto_id: produtoId,
        produto_nome: produtoNome,
        produto_preco: produtoPreco,
        quantidade: 1
      });

      if (response.status === 200) {
        alert('Produto adicionado ao carrinho com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
      alert('Erro ao adicionar o produto ao carrinho');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    <Container>
      <Header />
      <ImageContainer>
        <Image src={imgHome} alt="Imagem de Home" />
        <TextWrapper>
          <OverlayText>Bem-Vindo, Alunos!</OverlayText>
          <WelcomeText>
            Bem-vindo ao nosso universo fitness! Divirta-se navegando por nosso site, curta nossas ofertas, produtos e cursos.
          </WelcomeText>
        </TextWrapper>
      </ImageContainer>
      <SectionTitle>Produtos em Destaque</SectionTitle>
      <ProductContainer>
        {products.map((product) => (
          <ProductImage key={product.id}>
            <img src={product.image} alt={product.name} />
            <ProductInfo>
              <p>{product.name}</p>
              <p style={{ color: 'black' }}>R$ {product.price.toFixed(2).replace('.', ',')}</p>
              <ButtonAdd onClick={() => handleAddToCart(product.id, product.name, product.price)}>
                Adicionar ao Carrinho
              </ButtonAdd>
            </ProductInfo>
          </ProductImage>
        ))}
      </ProductContainer>
      <ButtonLoja onClick={() => window.location.href = '/loja'}>Ir para a Loja</ButtonLoja>
      <RedesSociaisContainer>
      <Display>
        <Title>Redes Sociais</Title>
        <SocialButton onClick={() => window.location.href = 'https://www.instagram.com/lg_suplementoss?igsh=MWhjczNkY3BxeTZiMQ=='}>
          Ir para o Instagram
        </SocialButton>
      </Display>
      <SocialImagesContainer>
        <SocialImage 
          src={lg1} 
          alt="Imagem 1" 
          lgId="lg1" 
          onClick={() => window.open('https://www.instagram.com/lg_suplementoss?igsh=MWhjczNkY3BxeTZiMQ==', '_blank')} 
          style={{ cursor: 'pointer' }} 
        />

        <SocialImage 
          src={logo} 
          alt="Imagem 2" 
          onClick={() => window.open('https://www.instagram.com/lg_suplementoss?igsh=MWhjczNkY3BxeTZiMQ==', '_blank')} 
          style={{ cursor: 'pointer' }} 
        />

        <SocialImage 
          src={lg2} 
          alt="Imagem 3" 
          lgId="lg2" 
          onClick={() => window.open('https://www.instagram.com/lg_suplementoss?igsh=MWhjczNkY3BxeTZiMQ==', '_blank')} 
          style={{ cursor: 'pointer' }} 
        />

        <SocialImage 
          src={lg3} 
          alt="Imagem 4" 
          style={{ objectPosition: 'right center', objectFit: 'cover', cursor: 'pointer' }} 
          onClick={() => window.open('https://www.instagram.com/lg_suplementoss?igsh=MWhjczNkY3BxeTZiMQ==', '_blank')} 
        />
      </SocialImagesContainer>


    </RedesSociaisContainer>
      <FaleConoscoContainer>
        <ContentContainer>
          <LeftContent>
            <Title>Fale Conosco</Title>
            <Description>Entre em contato para mais informações.</Description>
            <ContactInfo>
              <p><strong>Email:</strong> email@exemplo.com</p>
              <p><strong>Telefone:</strong> (555) 555-5555</p>
            </ContactInfo>
            <Form ref={formRef} onSubmit={sendEmail}>
              <Input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleInputChange} required />
              <Input type="text" name="sobrenome" placeholder="Sobrenome" value={formData.sobrenome} onChange={handleInputChange} required />
              <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
              <TextArea name="mensagem" placeholder="Mensagem" rows="5" value={formData.mensagem} onChange={handleInputChange} required />
              <SubmitButton type="submit">Enviar</SubmitButton>
            </Form>
          </LeftContent>
          <ImageContainer_2>
            <Image src={formhome} alt="Formulário Imagem" />
          </ImageContainer_2>
        </ContentContainer>
      </FaleConoscoContainer>
      <Footer />
    </Container>
  );
};

export default Home;
