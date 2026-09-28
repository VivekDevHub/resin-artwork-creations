import Review from '../models/Review.js';
import Product from '../models/Product.js';

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
export const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new product review
// @route   POST /api/reviews
// @access  Public / Authenticated
export const createReview = async (req, res, next) => {
  try {
    const { productId, name, rating, comment, title } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Product, rating and comment are required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const review = await Review.create({
      product: productId,
      user: req.user ? req.user._id : null,
      name: name || (req.user ? req.user.name : 'Valued Customer'),
      rating: Number(rating),
      comment,
      title: title || '',
      isVerifiedPurchase: true
    });

    // Update product rating and reviews count
    const allReviews = await Review.find({ product: productId });
    const avgRating = allReviews.reduce((acc, item) => item.rating + acc, 0) / allReviews.length;

    product.rating = Number(avgRating.toFixed(1));
    product.numReviews = allReviews.length;
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review submitted with thanks!',
      review
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reviews (Admin)
// @route   GET /api/reviews
// @access  Private/Admin
export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().populate('product', 'name slug images').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews
    });
  } catch (error) {
    next(error);
  }
};
