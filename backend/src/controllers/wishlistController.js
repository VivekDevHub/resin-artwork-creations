import Wishlist from '../models/Wishlist.js';

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
      path: 'products',
      select: 'name slug price originalPrice discountPercentage images rating stock categoryName'
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }

    res.status(200).json({
      success: true,
      wishlist: wishlist.products || []
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add product to wishlist
// @route   POST /api/wishlist
// @access  Private
export const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [productId] });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
      }
    }

    const updated = await Wishlist.findById(wishlist._id).populate({
      path: 'products',
      select: 'name slug price originalPrice discountPercentage images rating stock categoryName'
    });

    res.status(200).json({
      success: true,
      message: 'Item added to your wishlist',
      wishlist: updated.products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
export const removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
      await wishlist.save();
    }

    const updated = await Wishlist.findOne({ user: req.user._id }).populate({
      path: 'products',
      select: 'name slug price originalPrice discountPercentage images rating stock categoryName'
    });

    res.status(200).json({
      success: true,
      message: 'Item removed from wishlist',
      wishlist: updated ? updated.products : []
    });
  } catch (error) {
    next(error);
  }
};
