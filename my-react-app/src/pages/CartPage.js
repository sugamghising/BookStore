import React, { useContext } from 'react';
import CartContext from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <div className="bg-gray-800 text-white py-8 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((book) => (
              <div key={book._id} className="flex justify-between items-center border-b border-gray-700 py-4">
                <div>
                  <h2 className="text-xl font-bold">{book.title}</h2>
                  <p className="text-gray-400">${book.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(book._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-6 py-2 rounded-lg mt-8 hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;