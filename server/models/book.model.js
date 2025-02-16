import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  coverImage: { type: String, required: true }, // URL to the book cover image
  genre: { type: String, required: true }, // e.g., Fiction, Non-Fiction, Sci-Fi
  stock: { type: Number, default: 0 }, // Number of copies available
  publishedDate: { type: Date, default: Date.now },
  publisher: { type: String, required: true },
});

export const Book = mongoose.model('Book', bookSchema);
