// src/services/cartServices.js

const CART_STORAGE_KEY = 'bookstore_cart';

// Helper function to get cart from localStorage
const getCartFromStorage = () => {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Get current cart (combines localStorage with context if needed)
export const getCart = () => {
  return getCartFromStorage();
};

// Add item to cart with quantity support
export const addToCart = (book) => {
  const cart = getCartFromStorage();
  
  // Check if book already exists in cart
  const existingItem = cart.find(item => item._id === book._id);
  
  if (existingItem) {
    // Update quantity if already in cart
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    // Add new item with default quantity
    cart.push({ ...book, quantity: 1 });
  }

  saveCartToStorage(cart);
  return cart;
};

// Remove item from cart
export const removeFromCart = (bookId) => {
  const cart = getCartFromStorage().filter(item => item._id !== bookId);
  saveCartToStorage(cart);
  return cart;
};

// Update item quantity in cart
export const updateCartItemQuantity = (bookId, newQuantity) => {
  const cart = getCartFromStorage();
  const item = cart.find(item => item._id === bookId);
  
  if (item) {
    item.quantity = Math.max(1, newQuantity); // Ensure quantity is at least 1
    saveCartToStorage(cart);
  }
  
  return cart;
};

// Clear the entire cart
export const clearCart = () => {
  saveCartToStorage([]);
  return [];
};

// Get cart total price
export const getCartTotal = () => {
  const cart = getCartFromStorage();
  return cart.reduce(
    (total, item) => total + (item.price * (item.quantity || 1)),
    0
  );
};

// Get cart item count (sum of quantities)
export const getCartItemCount = () => {
  const cart = getCartFromStorage();
  return cart.reduce(
    (count, item) => count + (item.quantity || 1),
    0
  );
};

// Check if a book is in the cart
export const isInCart = (bookId) => {
  return getCartFromStorage().some(item => item._id === bookId);
};