import { useState, useEffect, useRef } from 'react';
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
import wheyImg from '../../assets/whey.jpeg'; 
import { WelcomeText, TextWrapper, Container, ImageContainer, Image, OverlayText, SectionTitle, ProductContainer, ProductImage, ProductInfo, ButtonAdd, ButtonLoja, FaleConoscoContainer, ContentContainer, LeftContent, Title, Description, ImageContainer_2, RedesSociaisContainer, SocialButton, SocialImagesContainer, SocialImage, Display, WhatsAppButton} from './style'; // Estilos
import { useAuth } from '../../contexts/AuthContext';
import emailjs from 'emailjs-com'; 

const Home = () => {
  const [cart, setCart] = useState([]);
  const [quantidade] = useState(1);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    mensagem: '',
  });
  const [mensagemEnviada, setMensagemEnviada] = useState('');
  const formRef = useRef();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/produtos/solicitar');
        const todos = response.data.produtos;

        const nomeParaImagem = {
          'Creatina': creatinaImg,
          'Hipercalórico': hipercaloricoImg,
          'Whey': wheyImg
        };

        const produtosDesejados = ['Creatina', 'Hipercalórico', 'Whey'];

        const filtrados = produtosDesejados.map(nome => {
          const encontrado = todos.find(p => p.nome === nome);
          return {
            id: encontrado?.id || null,
            name: nome,
            price: Number(encontrado?.preco || 0),
            quantidade: encontrado?.quantidade || 0,
            image: nomeParaImagem[nome] || '',
          };
        });

        setProducts(filtrados);
      } catch (error) {
        console.error('Erro ao buscar produtos em destaque:', error);
      }
    };

    fetchProdutos();
}, []);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

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
      quantidade
    });

    if (response.status === 200) {
      alert('Produto adicionado ao carrinho com sucesso!');
    }
  } catch (error) {
    console.error('Erro ao adicionar produto ao carrinho:', error);
    alert('Não temos mais esse produto em nosso estoque.');
  }
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
              {product.quantidade > 0 ? (
                <ButtonAdd onClick={() => handleAddToCart(product.id, product.name, product.price)}>
                  Adicionar ao Carrinho
                </ButtonAdd>
              ) : (
                <p style={{ color: 'red' }}><strong>Produto indisponível no momento</strong></p>
    )}
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
          <Description>
            Se tiver dúvidas ou quiser falar conosco, clique abaixo para conversar diretamente pelo WhatsApp.
          </Description>
          <WhatsAppButton onClick={() => window.open("https://wa.me/5598982021516?text=Olá!%20Gostaria%20de%20falar%20com%20vocês.", "_blank")}>
            Falar no WhatsApp
          </WhatsAppButton>
        </LeftContent>
      </ContentContainer>
</FaleConoscoContainer>
      <Footer />
    </Container>
  );
};

export default Home;
