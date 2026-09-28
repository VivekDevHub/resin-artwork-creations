import express from 'express';
import {
  createCustomOrder,
  getAllCustomOrders,
  updateCustomOrder
} from '../controllers/customOrderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createCustomOrder);
router.get('/', protect, admin, getAllCustomOrders);
router.put('/:id', protect, admin, updateCustomOrder);

export default router;
