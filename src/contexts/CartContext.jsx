import React, { createContext, useState, useEffect } from 'react';

// Criação do contexto
export const CartContext = createContext();

// Provedor de contexto para gerenciar o carrinho
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Pega o email do usuário logado
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (userEmail) {
      const savedCart = JSON.parse(localStorage.getItem(userEmail));
      if (savedCart) {
        setCart(savedCart);
      }
    }
  }, [userEmail]);

  const addItemToCart = (item) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, item];
      localStorage.setItem(userEmail, JSON.stringify(updatedCart)); // Armazenando no localStorage
      return updatedCart;
    });
  };

  const removeItemFromCart = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== itemId);
      localStorage.setItem(userEmail, JSON.stringify(updatedCart)); // Armazenando no localStorage
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
