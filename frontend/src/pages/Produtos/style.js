import styled from 'styled-components';

export const LojaContainer = styled.div`
  padding: 20px;
  text-align: center;
  max-width: 1200px;  // Limit the container's width for better responsiveness
  margin: 0 auto;  // Center the container horizontally
`;

export const ProductsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;  // Center the products
`;

export const ProductCard = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  width: 250px;  // Increase width for better display
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);  // Adding subtle shadow for better visibility
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 8px 15px;  // Increase padding for better clickable area
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

export const CartList = styled.ul`
  list-style-type: none;
  padding: 0;
  text-align: left;
  max-width: 400px;
  margin: 0 auto;
`;

export const CartItem = styled.li`
  margin-bottom: 10px;
  font-size: 1.1rem;
`;

export const Total = styled.h3`
  font-size: 1.5em;
  margin-top: 20px;
  color: #333;
  font-weight: bold;
`;

export const AddCategoryForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;  // Center the form on the page
`;

export const Input = styled.input`
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

export const AddCategoryButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px;
  border: none;
  cursor: pointer;
  margin-top: 15px;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;  // Make the button full width

  &:hover {
    background-color: #0056b3;
  }
`;
