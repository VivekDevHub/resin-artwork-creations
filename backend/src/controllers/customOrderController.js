import CustomOrder from '../models/CustomOrder.js';

// @desc    Create new custom order inquiry
// @route   POST /api/custom-orders
// @access  Public
export const createCustomOrder = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      productType,
      budget,
      preferredColor,
      customizationDetails,
      occasion,
      requiredDate,
      referenceImage
    } = req.body;

    if (!name || !email || !phone || !productType || !customizationDetails) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (Name, Email, Phone, Product Type, Details)'
      });
    }

    const customOrder = await CustomOrder.create({
      name,
      email,
      phone,
      productType,
      budget: budget || '₹1,000 - ₹3,000',
      preferredColor: preferredColor || 'Blush Pink & Gold',
      customizationDetails,
      occasion: occasion || 'Personalized Gift',
      requiredDate: requiredDate || '',
      referenceImage: referenceImage || ''
    });

    res.status(201).json({
      success: true,
      message: 'Your custom order inquiry has been received! Mahima will review and reach out to you shortly.',
      customOrder
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all custom orders (Admin)
// @route   GET /api/custom-orders
// @access  Private/Admin
export const getAllCustomOrders = async (req, res, next) => {
  try {
    const customOrders = await CustomOrder.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: customOrders.length,
      customOrders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update custom order status & quote (Admin)
// @route   PUT /api/custom-orders/:id
// @access  Private/Admin
export const updateCustomOrder = async (req, res, next) => {
  try {
    const customOrder = await CustomOrder.findById(req.params.id);
    if (!customOrder) {
      return res.status(404).json({ success: false, message: 'Custom order inquiry not found' });
    }

    if (req.body.status) customOrder.status = req.body.status;
    if (req.body.quoteAmount !== undefined) customOrder.quoteAmount = Number(req.body.quoteAmount);
    if (req.body.adminNotes !== undefined) customOrder.adminNotes = req.body.adminNotes;

    await customOrder.save();

    res.status(200).json({
      success: true,
      message: 'Custom order updated successfully',
      customOrder
    });
  } catch (error) {
    next(error);
  }
};
