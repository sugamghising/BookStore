import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, clearCart, total } = useContext(CartContext);

  return (
    <div className="bg-gray-800 text-white py-8 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">Your cart is empty.</p>
            <Link 
              to="/books" 
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="bg-gray-700 rounded-lg p-6">
                {cart.map((book) => (
                  <div key={book._id} className="flex gap-4 border-b border-gray-600 py-4">
                    <div className="w-24 flex-shrink-0">
                      <img 
                        src={book.coverImage} 
                        alt={book.title} 
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h2 className="text-xl font-bold">{book.title}</h2>
                        <button
                          onClick={() => removeFromCart(book._id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-gray-400 mb-2">by {book.author}</p>
                      <p className="text-lg">${book.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearCart}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:w-80">
              <div className="bg-gray-700 p-6 rounded-lg sticky top-4">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  {cart.map((book) => (
                    <div key={book._id} className="flex justify-between">
                      <span className="text-gray-300">{book.title}</span>
                      <span>${book.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-600 mt-4 pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="block w-full bg-blue-500 text-white px-6 py-2 rounded-lg mt-6 text-center hover:bg-blue-600"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;