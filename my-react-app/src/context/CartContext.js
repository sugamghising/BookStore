// src/context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import { 
  getCart as getCartService,
  addToCart as addToCartService,
  removeFromCart as removeFromCartService,
  clearCart as clearCartService,
  getCartTotal,
  getCartItemCount
} from '../services/cartServices';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // Initialize cart from localStorage
  useEffect(() => {
    refreshCart();
  }, []);

  const refreshCart = () => {
    const currentCart = getCartService();
    setCart(currentCart);
    setTotal(getCartTotal());
    setItemCount(getCartItemCount());
  };

  const addToCart = (book) => {
    addToCartService(book);
    refreshCart();
  };

  const removeFromCart = (bookId) => {
    removeFromCartService(bookId);
    refreshCart();
  };

  const clearCart = () => {
    clearCartService();
    refreshCart();
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      total,
      itemCount,
      addToCart, 
      removeFromCart, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;