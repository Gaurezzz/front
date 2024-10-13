import React, { createContext, useState, useContext } from 'react';

// Crear el contexto del carrito
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

// Función para agregar productos al carrito
const addToCart = (product, quantity = 1) => {
  setCart((prevCart) => {
    // Buscar si el producto ya existe en el carrito
    const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, actualizamos la cantidad y el precio total
      const updatedCart = [...prevCart];
      updatedCart[existingProductIndex].quantity += quantity; // Sumar la cantidad seleccionada
      updatedCart[existingProductIndex].totalPrice += parseFloat(product.price.replace('$', '')) * quantity;
      return updatedCart;
    } else {
      // Si el producto no está en el carrito, lo agregamos con la cantidad y el precio total inicial
      return [
        ...prevCart,
        {
          ...product,
          quantity: quantity, // Cantidad inicial seleccionada
          totalPrice: parseFloat(product.price.replace('$', '')) * quantity, // Precio inicial calculado
        },
      ];
    }
  });
};


  // Función para eliminar un producto del carrito
  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cart.map(item =>
      item.id === itemId
        ? { ...item, quantity: newQuantity >= 0 ? newQuantity : 0 }
        : item
    );
    setCart(updatedCart);
  };

  // Función para calcular el total del carrito
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const itemTotal = parseFloat(item.price.replace('$', '')) * item.quantity;
      return total + itemTotal;
    }, 0).toFixed(2);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para acceder al contexto del carrito
export const useCart = () => {
  return useContext(CartContext);
};