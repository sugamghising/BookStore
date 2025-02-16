import {Book} from '../models/book.model.js';

// Get all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a single book by ID
export const getBookById = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


// Add a book
export const addBooks = async (req, res) => {
    const { title, author, description, price, coverImage, genre, stock, publisher } = req.body;

  try {
    const book = new Book({ title, author, description, price, coverImage, genre, stock, publisher });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}


// Update a book (Admin only)
export const updateBook = async (req, res) => {
  const { title, author, description, price, coverImage, genre, stock, publisher } = req.body;

  try {
    let book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.price = price || book.price;
    book.coverImage = coverImage || book.coverImage;
    book.genre = genre || book.genre;
    book.stock = stock || book.stock;
    book.publisher = publisher || book.publisher;
    

    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a book (Admin only)
export const deleteBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      await Book.deleteOne({ _id: req.params.id });
  
      res.json({ message: 'Book removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  