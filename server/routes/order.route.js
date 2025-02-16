import express from 'express';
import { createOrder, getUserOrders } from '../controller/order.controller.js';
import { authMiddleware } from '../middlewares/user.mid.js';

const router = express.Router();

router.post('/orders',authMiddleware,createOrder)
router.get('/getOrder',authMiddleware,getUserOrders)

export default router;