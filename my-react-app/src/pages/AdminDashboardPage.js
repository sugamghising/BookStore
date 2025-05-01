import React, { useEffect, useState } from 'react';
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook
} from '../services/bookService';

const AdminDashboardPage = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ 
    title: '', 
    author: '', 
    description: '',
    price: '', 
    coverImage: '',
    genre: '', 
    stock: '',
    publisher: ''
  });
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const booksData = await getBooks();
      setBooks(booksData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async () => {
    try {
      await addBook(newBook);
      await fetchBooks();
      setNewBook({ 
        title: '', 
        author: '', 
        description: '',
        price: '', 
        coverImage: '',
        genre: '', 
        stock: '',
        publisher: ''
      });
    } catch (err) {
      setError('Failed to add book. Please try again.');
      console.error('Error adding book:', err);
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setNewBook({
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      coverImage: book.coverImage,
      genre: book.genre,
      stock: book.stock,
      publisher: book.publisher
    });
  };

  const handleUpdateBook = async () => {
    try {
      await updateBook(editingBook._id, newBook);
      await fetchBooks();
      setNewBook({ 
        title: '', 
        author: '', 
        description: '',
        price: '', 
        coverImage: '',
        genre: '', 
        stock: '',
        publisher: ''
      });
      setEditingBook(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update book. Please try again.');
      console.error('Error updating book:', err);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      await fetchBooks();   
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete book. Please try again.');
      console.error('Error deleting book:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
    setNewBook({ 
      title: '', 
      author: '', 
      description: '',
      price: '', 
      coverImage: '',
      genre: '', 
      stock: '',
      publisher: ''
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-800 text-white py-8 min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading books...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white py-8 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Add/Edit Book Form */}
        <div className="bg-gray-700 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingBook ? 'Edit Book' : 'Add New Book'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Book Title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Author</label>
                <input
                  type="text"
                  placeholder="Author Name"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Description</label>
                <textarea
                  placeholder="Book Description"
                  value={newBook.description}
                  onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-600 text-white"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Cover Image URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/book-cover.jpg"
                  value={newBook.coverImage}
                  onChange={(e) => setNewBook({ ...newBook, coverImage: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-600 text-white"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Price ($)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={newBook.price}
                  onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-600 text-white"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Genre</label>
                <select
                  value={newBook.genre}
                  onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-600 text-white"
                >
                  <option value="">Select Genre</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Romance">Romance</option>
                  <option value="Biography">Biography</option>
                  <option value="History">History</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Stock Quantity</label>
                <input
                  type="number"
                  placeholder="0"
                  value={newBook.stock}
                  onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-600 text-white"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Publisher</label>
                <input
                  type="text"
                  placeholder="Publisher Name"
                  value={newBook.publisher}
                  onChange={(e) => setNewBook({ ...newBook, publisher: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-600 text-white"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={editingBook ? handleUpdateBook : handleAddBook}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              {editingBook ? 'Update Book' : 'Add Book'}
            </button>
            {editingBook && (
              <button
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Books Table */}
        <div className="bg-gray-700 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Books List</h2>
          {books.length === 0 ? (
            <p className="text-gray-400">No books found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b border-gray-600 px-4 py-2">Cover</th>
                    <th className="border-b border-gray-600 px-4 py-2">Title</th>
                    <th className="border-b border-gray-600 px-4 py-2">Author</th>
                    <th className="border-b border-gray-600 px-4 py-2">Price</th>
                    <th className="border-b border-gray-600 px-4 py-2">Genre</th>
                    <th className="border-b border-gray-600 px-4 py-2">Stock</th>
                    <th className="border-b border-gray-600 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book._id} className="hover:bg-gray-600">
                      <td className="border-b border-gray-600 px-4 py-2">
                        {book.coverImage && (
                          <img 
                            src={book.coverImage} 
                            alt={book.title} 
                            className="w-12 h-16 object-cover rounded"
                          />
                        )}
                      </td>
                      <td className="border-b border-gray-600 px-4 py-2">{book.title}</td>
                      <td className="border-b border-gray-600 px-4 py-2">{book.author}</td>
                      <td className="border-b border-gray-600 px-4 py-2">${book.price.toFixed(2)}</td>
                      <td className="border-b border-gray-600 px-4 py-2">{book.genre}</td>
                      <td className="border-b border-gray-600 px-4 py-2">{book.stock}</td>
                      <td className="border-b border-gray-600 px-4 py-2">
                        <button
                          onClick={() => handleEditBook(book)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;