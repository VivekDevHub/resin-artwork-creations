import express from 'express';
import { getDashboardStats } from '../controllers/analyticsController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', protect, admin, getDashboardStats);

export default router;
