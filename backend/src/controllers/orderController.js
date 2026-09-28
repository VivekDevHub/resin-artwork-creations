import Order from '../models/Order.js';
import Product from '../models/Product.js';

// Helper to generate unique Order ID e.g. RAC-2026-000101
const generateOrderId = async () => {
  const count = await Order.countDocuments();
  const year = new Date().getFullYear();
  const sequence = String(count + 1).padStart(6, '0');
  return `RAC-${year}-${sequence}`;
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Public / Authenticated
export const createOrder = async (req, res, next) => {
  try {
    const {
      customer,
      shippingAddress,
      orderItems,
      subtotal,
      discount = 0,
      shippingFee = 0,
      totalAmount,
      couponApplied,
      paymentMethod = 'COD',
      paymentStatus = 'Pending',
      paymentDetails
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }

    if (!customer || !customer.name || !customer.phone || !customer.email) {
      return res.status(400).json({ success: false, message: 'Customer details are required' });
    }

    if (!shippingAddress || !shippingAddress.house || !shippingAddress.city || !shippingAddress.pincode) {
      return res.status(400).json({ success: false, message: 'Complete shipping address is required' });
    }

    const orderId = await generateOrderId();

    // Determine initial status based on payment method
    let initialStatus = 'Confirmed';
    let initialPaymentStatus = paymentMethod === 'COD' ? 'COD' : paymentStatus;

    if (paymentMethod === 'Razorpay' && paymentStatus !== 'Paid') {
      initialStatus = 'Pending';
    }

    const order = await Order.create({
      orderId,
      user: req.user ? req.user._id : null,
      customer,
      shippingAddress,
      orderItems,
      subtotal: Number(subtotal),
      discount: Number(discount),
      shippingFee: Number(shippingFee),
      totalAmount: Number(totalAmount),
      couponApplied: couponApplied || { code: '', discount: 0 },
      paymentMethod,
      paymentStatus: initialPaymentStatus,
      paymentDetails: paymentDetails || {},
      orderStatus: initialStatus,
      timeline: [
        {
          status: initialStatus,
          note: paymentMethod === 'COD' ? 'Order placed with Cash on Delivery' : 'Order initialized with Online Payment',
          timestamp: new Date()
        }
      ]
    });

    // Update stock counts
    for (const item of orderItems) {
      if (item.product) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity }
        });
      }
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my
// @access  Private
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      $or: [
        { user: req.user._id },
        { 'customer.email': req.user.email.toLowerCase() }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order by orderId or MongoDB _id
// @route   GET /api/orders/:id
// @access  Public / Authenticated
export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let order;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id).populate('orderItems.product', 'name slug images price');
    } else {
      order = await Order.findOne({ orderId: id }).populate('orderItems.product', 'name slug images price');
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.orderStatus = status;
    }

    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { 'customer.name': { $regex: search, $options: 'i' } },
        { 'customer.email': { $regex: search, $options: 'i' } },
        { 'customer.phone': { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, note, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (status) {
      order.orderStatus = status;
      order.timeline.push({
        status,
        note: note || `Order status updated to ${status}`,
        timestamp: new Date()
      });
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      order
    });
  } catch (error) {
    next(error);
  }
};
