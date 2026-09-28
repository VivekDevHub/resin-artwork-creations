import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  name: {
    type: String,
    required: [true, 'Please provide reviewer name'],
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating from 1 to 5'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: [true, 'Please write your review comment']
  },
  title: {
    type: String,
    default: ''
  },
  isVerifiedPurchase: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Review', reviewSchema);
