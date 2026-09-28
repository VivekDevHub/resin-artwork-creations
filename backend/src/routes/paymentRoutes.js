import express from 'express';
import { createPaymentOrder, verifyPayment } from '../controllers/paymentController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create-order', optionalAuth, createPaymentOrder);
router.post('/verify', optionalAuth, verifyPayment);

export default router;
