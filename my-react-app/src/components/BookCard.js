import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <img src={book.coverImage} alt={book.title} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h2 className="text-xl font-bold mb-2">{book.title}</h2>
      <p className="text-gray-400 mb-4">{book.author}</p>
      <p className="text-lg font-bold mb-4">${book.price}</p>
      <Link
        to={`/books/${book._id}`}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        View Details
      </Link>
    </div>
  );
};

export default BookCard;