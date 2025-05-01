import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../services/bookService';
import CartContext from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { cart, addToCart } = useContext(CartContext);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getBookById(id);
      setBook(data);
      setIsInCart(cart.some(item => item._id === data._id));
    };
    fetchBook();
  }, [id, cart]);

  const handleAddToCart = () => {
    if (book && book.stock > 0) {
      addToCart(book);
      setIsInCart(true);
      
      alert(`${book.title} has been added to your cart!`);
    }
  };

  if (!book) return <div className="bg-gray-800 text-white py-8 min-h-screen">Loading...</div>;

  return (
    <>
      <Header />
      <div className="bg-gray-800 text-white py-8 min-h-screen">
        <div className="container bg-gray-700 mx-auto px-4 py-8 border border-gray-700 rounded-lg"> {/* Added border and padding */}
          <h1 className="text-3xl font-bold mb-8">{book.title}</h1>
          <div className="flex flex-col md:flex-row gap-8">
            <img src={book.coverImage} alt={book.title} className="w-full md:w-1/3 rounded-lg shadow-md" /> {/* Added shadow */}
            <div className="flex-1">
              <div className="mb-4">
                <p className="text-lg">{book.description}</p>
              </div>

              <div className="mb-4"> {/* Added sections for better organization */}
                <p className="text-xl font-bold">${book.price}</p>
                <p className="text-gray-400">Stock: {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}</p> {/* Stock information */}
              </div>

              <div className="mb-4">
                <p><strong>Author:</strong> {book.author}</p> {/* Author information */}
                <p><strong>Genre:</strong> {book.genre}</p> {/* Genre information */}
              </div>

              <button 
            className={`${
              book.stock <= 0 ? 'bg-gray-500 cursor-not-allowed' : 
              isInCart ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
            } text-white px-6 py-2 rounded-lg`}
            disabled={book.stock <= 0 || isInCart}
            onClick={handleAddToCart}
          >
            {book.stock <= 0 ? 'Out of Stock' : 
             isInCart ? 'Added to Cart' : 'Add to Cart'}
          </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookDetailPage;
