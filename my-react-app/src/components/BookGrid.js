import React from 'react';
import BookCard from '../components/BookCard'; // Import your BookCard component

const BookGrid = ({ displayedBooks }) => {
  return (
    <div className="w-3/4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {displayedBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookGrid;