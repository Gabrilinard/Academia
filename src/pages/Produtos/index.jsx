// Loja do admin com produtos organizados por categoria, criando categoria nova dinamicamente ao adicionar produto

import React, { useState, useEffect } from 'react';
import Footer from "../../Components/Footer";
import styled from "styled-components";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const StyledPage = styled.div`
  background-color: rgb(227, 228, 222);
  padding: 0px 0;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-family: 'Sansita', sans-serif;
  margin: 60px 0 20px 0;
  font-size: 2rem;
  color: #333;
`;

const ProductGrid = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 20px;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 270px;
  margin: 20px auto;

  @media (max-width: 768px) {
    max-width: 50%;
    height: 480px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
`;

const ProductTitle = styled.h4`
  font-size: 1rem;
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
  padding: 10px 40px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4caf50;
  }

  @media (max-width: 768px) {
    padding: 8px 20px;
  }
`;

const RemoveProductButton = styled.button`
  background-color: red;
  color: white;
  padding: 8px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  border-radius: 5px;

  &:hover {
    background-color: darkred;
  }
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s ease;

  &:focus {
    border-color: #007bff;
  }
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const ProductQuantityControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const QuantityButton = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const BackButton = styled(Link)`
  background-color: #555;
  color: white;
  padding: 8px 12px;
  text-decoration: none;
  border-radius: 5px;
  &:hover {
    background-color: #777;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
`;

const Loja = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductImage, setNewProductImage] = useState(null);
  const [newProductQuantity, setNewProductQuantity] = useState(1);
  const [newProductCategory, setNewProductCategory] = useState('');
  const [quantidades, setQuantidades] = useState({});

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/produtos/solicitar');
        const produtosBackend = response.data.produtos;

        const categoriasSeparadas = {};
        produtosBackend.forEach(prod => {
          const categoria = prod.categoria || 'Outros';
          if (!categoriasSeparadas[categoria]) {
            categoriasSeparadas[categoria] = [];
          }
          categoriasSeparadas[categoria].push({
            id: prod.id,
            name: prod.nome,
            price: prod.preco,
            categoria: prod.categoria,
            quantidade: prod.quantidade,
            image: prod.imagem_url,
          });
        });

        const categoriasFormatadas = Object.keys(categoriasSeparadas).map(nome => ({
          name: nome,
          products: categoriasSeparadas[nome]
        }));

        setCategories(categoriasFormatadas);

        const quantidadesAtualizadas = {};
        for (const prod of produtosBackend) {
          if (prod.id) {
            quantidadesAtualizadas[prod.id] = prod.quantidade;
          }
        }
        setQuantidades(quantidadesAtualizadas);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  const updateQuantityInDatabase = async (productId, quantity) => {
    try {
      await axios.put('http://localhost:5000/produto/update-quantity', {
        produto_id: productId,
        quantidade: quantity
      });
    } catch (error) {
      console.error("Erro ao atualizar a quantidade do produto no banco:", error);
    }
  };

  const handleAddQuantity = async (productId) => {
    const novaQuantidade = (quantidades[productId] || 0) + 1;
    await updateQuantityInDatabase(productId, novaQuantidade);
    setQuantidades(prev => ({ ...prev, [productId]: novaQuantidade }));
  };

  const handleSubtractQuantity = async (productId) => {
    const atual = quantidades[productId] || 0;
    const novaQuantidade = atual > 0 ? atual - 1 : 0;
    await updateQuantityInDatabase(productId, novaQuantidade);
    setQuantidades(prev => ({ ...prev, [productId]: novaQuantidade }));
  };

  const addProductToCategory = async () => {
    if (!newProductImage || !newProductCategory) return;

    const formData = new FormData();
    formData.append('nome', newProductName);
    formData.append('preco', newProductPrice);
    formData.append('categoria', newProductCategory);
    formData.append('quantidade', newProductQuantity);
    formData.append('imagem', newProductImage);

    try {
      const response = await axios.post('http://localhost:5000/api/produtos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const newProduct = response.data.produto;
      if (!newProduct || !newProduct.imagem_url) return;

      setCategories(prevCategories => {
        const existingCategoryIndex = prevCategories.findIndex(c => c.name === newProduct.categoria);

        if (existingCategoryIndex !== -1) {
          const updated = [...prevCategories];
          updated[existingCategoryIndex].products.push({
            id: newProduct.id,
            name: newProduct.nome,
            price: newProduct.preco,
            image: newProduct.imagem_url
          });
          return updated;
        } else {
          return [
            ...prevCategories,
            {
              name: newProduct.categoria,
              products: [{
                id: newProduct.id,
                name: newProduct.nome,
                price: newProduct.preco,
                image: newProduct.imagem_url
              }]
            }
          ];
        }
      });

      setNewProductName('');
      setNewProductPrice('');
      setNewProductImage(null);
      setNewProductQuantity(1);
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  const removeProduct = async (categoryIndex, productId) => {
    const confirmRemove = window.confirm('Você tem certeza que deseja remover este produto?');
    if (confirmRemove) {
      try {
        const response = await axios.delete('http://localhost:5000/api/produtos/remove-seguro', {
          data: { id: productId },
        });
  
        if (response.status === 200) {
          alert('Produto removido com sucesso!');
  
          // Remove do estado local
          setCategories(prev => {
            const updated = [...prev];
            updated[categoryIndex].products = updated[categoryIndex].products.filter(
              product => product.id !== productId
            );
            return updated;
          });
        }
      } catch (error) {
        console.error('Erro ao remover produto:', error);
        alert('Erro ao remover produto.');
      }
    }
  };
  

  return (
    <StyledPage>
      <Header>
        <h1>Detalhes do Produto</h1>
        <BackButton to="/AdminDashboard">Voltar</BackButton>
      </Header>
      <ContentArea>
        <FormContainer>
          <Input type="text" placeholder="Nome do Produto" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} />
          <Input type="number" placeholder="Preço" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} />
          <Input type="number" placeholder="Quantidade" value={newProductQuantity} onChange={(e) => setNewProductQuantity(Number(e.target.value))} />
          <Input type="file" onChange={(e) => setNewProductImage(e.target.files[0])} />
          <select value={newProductCategory} onChange={(e) => setNewProductCategory(e.target.value)} style={{ marginRight: '10px', borderRadius: '5px' }}>
            <option value="">Selecione uma categoria</option>
            <option value="Whey Protein">Whey Protein</option>
            <option value="Hipercalóricos">Hipercalóricos</option>
            <option value="Termogênicos">Termogênicos</option>
            <option value="Vitaminas">Vitaminas</option>
            <option value="Pré-Treinos">Pré-Treinos</option>
            <option value="Combos">Combos</option>
            <option value="Camisas e Acessórios">Camisas e Acessórios</option>
            <option value="Pasta de Amendoim">Pasta de Amendoim</option>
          </select>
          <ButtonAddToCart onClick={addProductToCategory}>
            Adicionar Produto
          </ButtonAddToCart>
        </FormContainer>

        {categories.map((category, index) => (
          <div key={index}>
            <SectionTitle>{category.name}</SectionTitle>
            <ProductGrid>
              {category.products.map((product) => (
                <ProductCard key={product.id}>
                  <ProductImage src={product.image} alt={product.name} />
                  <ProductTitle>{product.name}</ProductTitle>
                  <ProductPrice>R$ {product.price},00</ProductPrice>
                  <ProductQuantityControls>
                    <QuantityButton onClick={() => handleSubtractQuantity(product.id)}>-</QuantityButton>
                    <p>Quantidade: {quantidades[product.id] || 0}</p>
                    <QuantityButton onClick={() => handleAddQuantity(product.id)}>+</QuantityButton>
                  </ProductQuantityControls>
                  <RemoveProductButton onClick={() => removeProduct(index, product.id)}>Excluir Produto</RemoveProductButton>
                </ProductCard>
              ))}
            </ProductGrid>
          </div>
        ))}
        <Footer />
      </ContentArea>
    </StyledPage>
  );
};

export default Loja;
