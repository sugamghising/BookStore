import express from 'express';
import { loginUser, registerUser ,logoutUser, getUserProfile} from '../controller/users.controller.js';
import {authMiddleware} from '../middlewares/user.mid.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logoutUser);
router.get('/profile/:id',authMiddleware,getUserProfile)

export default router;
