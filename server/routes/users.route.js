import express from 'express';
import { loginUser, registerUser ,logoutUser, getUserProfile} from '../controller/users.controller.js';
import {authMiddleware , adminMiddleware} from '../middlewares/user.mid.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logoutUser);
router.get('/profile/:id',authMiddleware,getUserProfile)
router.get('/admin/dashboard', authMiddleware, adminMiddleware, (req, res) => {
    // Only accessible by admins
    res.json({ message: 'Welcome to admin dashboard' });
  });

export default router;
