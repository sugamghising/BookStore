import {Review} from '../models/review.model.js';

// Add a review for a book
export const addReview = async (req, res) => {
    const { book, rating, comment } = req.body;
  
    try {
      // Create a new review
      const review = new Review({
        user: req.user.id, // Attach the authenticated user's ID
        book,
        rating,
        comment,
      });
  
      // Save the review to the database
      await review.save();
  
      // Populate the user field with the user's name
      await review.populate('user', 'name');
  
      res.status(201).json(review);
    } catch (err) {
      console.error(err.message);
  
      // Handle validation errors
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
      }
  
      // Handle duplicate reviews (if applicable)
      if (err.code === 11000) {
        return res.status(400).json({ message: 'You have already reviewed this book.' });
      }
  
      res.status(500).send('Server error');
    }
  };

// Get reviews for a book
export const getBookReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId }).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

