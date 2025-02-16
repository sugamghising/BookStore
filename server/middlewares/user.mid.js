import jwt from 'jsonwebtoken';
import {User} from '../models/users.model.js';

export const authMiddleware = async (req, res, next) => {
  // Step 1: Get the token from the request header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, deny access
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Step 2: Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Step 3: Find the user associated with the token
    const user = await User.findById(decoded.id).select('-password'); // Exclude the password field
    if (!user) {
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }

    // Step 4: Attach the user to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(err.message);

    // Handle specific JWT errors
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired. Please log in again.' });
    }

    // Generic server error
    res.status(500).send('Server error');
  }
};


