import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who wrote the review
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, // Reference to the book being reviewed
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating out of 5
  comment: { type: String, required: true }, // Review text
  createdAt: { type: Date, default: Date.now },
});

export const Review = mongoose.model('Review', reviewSchema);
