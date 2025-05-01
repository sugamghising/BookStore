import React, { useContext } from 'react';
import CartContext from '../context/CartContext';

const CheckoutPage = () => {
  const { cart, clearCart, total } = useContext(CartContext);

  const handleCheckout = () => {
    // Here you would typically integrate with a payment processor
    alert('Order placed successfully!');
    clearCart();
  };

  return (
    <div className="bg-gray-800 text-white py-8 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Order Details */}
          <div className="flex-1 bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            
            {cart.map((book) => (
              <div key={book._id} className="flex gap-4 border-b border-gray-600 py-4">
                <div className="w-16 flex-shrink-0">
                  <img 
                    src={book.coverImage} 
                    alt={book.title} 
                    className="w-full h-20 object-cover rounded"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{book.title}</h3>
                  <p className="text-gray-400 text-sm">by {book.author}</p>
                  <p className="text-lg">${book.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Summary */}
          <div className="md:w-96">
            <div className="bg-gray-700 p-6 rounded-lg sticky top-4">
              <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-gray-600 pt-4">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-bold">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="payment" defaultChecked className="form-radio" />
                    <span>Credit Card</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="payment" className="form-radio" />
                    <span>PayPal</span>
                  </label>
                </div>
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
      </div>
    </div>
  );
};

export default CheckoutPage;