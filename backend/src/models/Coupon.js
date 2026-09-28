import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  discountPercent: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  maxDiscount: {
    type: Number,
    default: 500
  },
  minOrderValue: {
    type: Number,
    default: 500
  },
  description: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
  }
}, {
  timestamps: true
});

export default mongoose.model('Coupon', couponSchema);
