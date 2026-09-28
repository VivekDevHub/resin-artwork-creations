import express from 'express';
import { register, login, getMe, updateProfile, getAllCustomers } from '../controllers/authController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.get('/customers', protect, admin, getAllCustomers);

export default router;
