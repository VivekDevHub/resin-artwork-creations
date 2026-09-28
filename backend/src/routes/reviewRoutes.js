import express from 'express';
import { getProductReviews, createReview, getAllReviews } from '../controllers/reviewController.js';
import { protect, admin, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/product/:productId', getProductReviews);
router.post('/', optionalAuth, createReview);
router.get('/', protect, admin, getAllReviews);

export default router;
