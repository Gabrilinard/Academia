// Loja do cliente com produtos organizados por categoria e busca fixa

import React, { useState, useEffect } from 'react';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import styled from "styled-components";
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const StyledPage = styled.div`
  display: flex;
  background-color: rgb(227, 228, 222);
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: rgba(209, 209, 209, 0.9);
  padding: 20px;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 120px;
  height: fit-content;
  margin-right: 20px;
`;

const SidebarItem = styled.a`
  display: block;
  margin-bottom: 15px;
  font-size: 1.1rem;
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: green;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 0px 20px;
  max-width: 1200px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-family: 'Sansita', sans-serif;
  margin: 60px 0 20px 0;
  font-size: 4.5rem;
  color: #333;
`;

const ProductGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const ProductCard = styled.div`
  width: 250px;
  text-align: center;
  background-color: white;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
`;

const ProductTitle = styled.h4`
  font-size: 1rem;
  font-family: 'Nunito Sans', sans-serif;
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  font-size: 1.1rem;
  color: green;
`;

const ButtonAddToCart = styled.button`
  background-color: rgb(56, 128, 58);
  border-radius: 5px;
  color: white;
  padding: 8px 15px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4caf50;
  }
`;

const FixedSearchContainer = styled.div`
  top: 80px;
  left: 0;
  width: 100%;
  background-color: rgb(227, 228, 222);
  display: flex;
  justify-content: center;
  padding: 20px 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SearchInput = styled.input`
  padding: 15px;
  width: 60%;
  max-width: 700px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1.2rem;
`;

const Loja = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [quantidade, setQuantidade] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/produtos/solicitar');
        const produtosBackend = response.data.produtos;

        const categoriasSeparadas = {};

        produtosBackend.forEach(prod => {
          if (prod.quantidade > 0) {
            const categoria = prod.categoria || 'Outros';

            if (!categoriasSeparadas[categoria]) {
              categoriasSeparadas[categoria] = [];
            }

            categoriasSeparadas[categoria].push({
              id: prod.id,
              name: prod.nome,
              price: prod.preco,
              image: prod.imagem_url,
              category: categoria
            });
          }
        });

        const categoriasFormatadas = Object.keys(categoriasSeparadas).map(nome => ({
          name: nome,
          products: categoriasSeparadas[nome]
        }));

        setCategories(categoriasFormatadas);

      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
      alert('Erro ao adicionar o produto ao carrinho');
    }
  };

  return (
    <>
      <Header />
      <FixedSearchContainer>
        <SearchInput
          type="text"
          placeholder="Pesquise um produto..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </FixedSearchContainer>

      <StyledPage>
        <Sidebar>
          <h3>Categorias</h3>
          {categories.map((cat, idx) => (
            <SidebarItem key={idx} href={`#${cat.name}`}>{cat.name}</SidebarItem>
          ))}
        </Sidebar>
        <ContentArea>
          {categories.map((category, index) => {
            const filteredProducts = category.products.filter(product =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            return (
              <div key={index}>
                <SectionTitle id={category.name}>{category.name}</SectionTitle>
                <ProductGrid>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id}>
                      <ProductImage src={product.image} alt={product.name} />
                      <ProductTitle>{product.name}</ProductTitle>
                      <ProductPrice>R$ {Number(product.price).toFixed(2).replace('.', ',')}</ProductPrice>
                      <ButtonAddToCart onClick={() => handleAddToCart(product.id, product.name, product.price)}>
                        Adicionar ao Carrinho
                      </ButtonAddToCart>
                    </ProductCard>
                  ))}
                </ProductGrid>
              </div>
            );
          })}
        </ContentArea>
      </StyledPage>
      <Footer />
    </>
  );
};

export default Loja;
