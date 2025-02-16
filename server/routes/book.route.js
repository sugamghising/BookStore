import express from 'express';
import { addBooks, deleteBook, getBooks, updateBook ,getBookById} from '../controller/book.controller.js';
import { adminMiddleware } from '../middlewares/book.mid.js';
import { authMiddleware } from '../middlewares/user.mid.js';

const router = express.Router();

router.get('/getBooks',getBooks);
router.get('/getBooks/:id',getBookById);
router.post('/addBooks',authMiddleware,adminMiddleware,addBooks);
router.put('/updateBooks/:id',authMiddleware,adminMiddleware,updateBook);
router.delete('/deleteBooks/:id',authMiddleware,adminMiddleware,deleteBook);

export default router;