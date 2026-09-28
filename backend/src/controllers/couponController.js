import Coupon from '../models/Coupon.js';

// @desc    Validate coupon code
// @route   POST /api/coupons/validate
// @access  Public
export const validateCoupon = async (req, res, next) => {
  try {
    const { code, orderAmount } = req.body;

    if (!code) {
      return res.status(400).json({ success: false, message: 'Please provide a coupon code' });
    }

    const coupon = await Coupon.findOne({
      code: code.trim().toUpperCase(),
      isActive: true,
      expiresAt: { $gt: new Date() }
    });

    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid or expired coupon code' });
    }

    const amount = Number(orderAmount) || 0;
    if (amount < coupon.minOrderValue) {
      return res.status(400).json({
        success: false,
        message: `Minimum order value of ₹${coupon.minOrderValue} required for coupon ${coupon.code}`
      });
    }

    let calculatedDiscount = Math.round((amount * coupon.discountPercent) / 100);
    if (coupon.maxDiscount && calculatedDiscount > coupon.maxDiscount) {
      calculatedDiscount = coupon.maxDiscount;
    }

    res.status(200).json({
      success: true,
      message: `Coupon ${coupon.code} applied successfully!`,
      coupon: {
        code: coupon.code,
        discountPercent: coupon.discountPercent,
        discountAmount: calculatedDiscount
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all coupons (Admin)
// @route   GET /api/coupons
// @access  Private/Admin
export const getAllCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: coupons.length, coupons });
  } catch (error) {
    next(error);
  }
};

// @desc    Create coupon (Admin)
// @route   POST /api/coupons
// @access  Private/Admin
export const createCoupon = async (req, res, next) => {
  try {
    const { code, discountPercent, maxDiscount, minOrderValue, description, expiresAt } = req.body;

    const coupon = await Coupon.create({
      code: code.toUpperCase().trim(),
      discountPercent: Number(discountPercent),
      maxDiscount: maxDiscount ? Number(maxDiscount) : 500,
      minOrderValue: minOrderValue ? Number(minOrderValue) : 500,
      description: description || '',
      expiresAt: expiresAt || new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
    });

    res.status(201).json({ success: true, coupon });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete coupon (Admin)
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
export const deleteCoupon = async (req, res, next) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Coupon deleted' });
  } catch (error) {
    next(error);
  }
};
