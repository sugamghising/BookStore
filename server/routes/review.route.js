import express from 'express';
import { authMiddleware } from '../middlewares/user.mid.js';
import { addReview, getBookReviews } from '../controller/review.controller.js';

const router = express.Router();

router.post('/addReview',authMiddleware,addReview);
router.get('/getReview/:bookId',getBookReviews);

export default router;