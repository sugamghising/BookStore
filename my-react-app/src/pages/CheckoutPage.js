import React, { useContext } from 'react';
import CartContext from '../context/CartContext';

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);

  const totalAmount = cart.reduce((total, book) => total + book.price, 0);

  const handleCheckout = () => {
    alert('Checkout successful!');
    clearCart();
  };

  return (
    <div className="bg-gray-800 text-white py-8 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="bg-gray-700 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {cart.map((book) => (
            <div key={book._id} className="flex justify-between items-center border-b border-gray-600 py-2">
              <p>{book.title}</p>
              <p>${book.price}</p>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <p className="text-xl font-bold">Total</p>
            <p className="text-xl font-bold">${totalAmount.toFixed(2)}</p>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg mt-6 hover:bg-blue-600"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;