import crypto from 'crypto';
import Razorpay from 'razorpay';
import Order from '../models/Order.js';

let razorpayInstance = null;
const isDemoMode = process.env.DEMO_PAYMENT_MODE === 'true' || !process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_KEY_ID?.includes('resinart2026');

if (!isDemoMode && process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  try {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
  } catch (err) {
    console.warn('[Razorpay Init Warning]: Running in Demo Payment Mode', err.message);
  }
}

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Public / Authenticated
export const createPaymentOrder = async (req, res, next) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Valid amount is required' });
    }

    // Check if running in DEMO mode or without production credentials
    if (isDemoMode || !razorpayInstance) {
      const demoOrderId = `order_demo_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      return res.status(200).json({
        success: true,
        demoMode: true,
        order: {
          id: demoOrderId,
          currency,
          amount: Math.round(amount * 100),
          receipt: receipt || `rcpt_${Date.now()}`
        },
        keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_demo_key',
        message: 'Demo payment mode active. Payment simulation available.'
      });
    }

    // Live Razorpay order creation
    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency,
      receipt: receipt || `rcpt_${Date.now()}`
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    res.status(200).json({
      success: true,
      demoMode: false,
      order: razorpayOrder,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('[Razorpay Order Creation Error]:', error);
    next(error);
  }
};

// @desc    Verify Razorpay Payment Signature
// @route   POST /api/payment/verify
// @access  Public / Authenticated
export const verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      dbOrderId
    } = req.body;

    // Check Demo Mode
    const isSimulatedDemo = isDemoMode || razorpay_order_id?.startsWith('order_demo_');

    if (isSimulatedDemo) {
      // In demo mode, simulate success
      if (dbOrderId) {
        await Order.findByIdAndUpdate(dbOrderId, {
          paymentStatus: 'Paid',
          orderStatus: 'Confirmed',
          paymentDetails: {
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id || `pay_demo_${Date.now()}`,
            razorpaySignature: 'demo_verified_signature',
            paidAt: new Date()
          },
          $push: {
            timeline: {
              status: 'Paid',
              note: 'Payment verified successfully (Demo Mode)',
              timestamp: new Date()
            }
          }
        });
      }

      return res.status(200).json({
        success: true,
        demoMode: true,
        message: 'Demo payment verified successfully'
      });
    }

    // Real signature verification
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      if (dbOrderId) {
        await Order.findByIdAndUpdate(dbOrderId, {
          paymentStatus: 'Failed',
          $push: {
            timeline: {
              status: 'Failed',
              note: 'Payment verification failed',
              timestamp: new Date()
            }
          }
        });
      }
      return res.status(400).json({ success: false, message: 'Payment verification failed. Invalid signature.' });
    }

    // Update order status in DB
    if (dbOrderId) {
      await Order.findByIdAndUpdate(dbOrderId, {
        paymentStatus: 'Paid',
        orderStatus: 'Confirmed',
        paymentDetails: {
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          paidAt: new Date()
        },
        $push: {
          timeline: {
            status: 'Paid',
            note: 'Payment successfully captured via Razorpay',
            timestamp: new Date()
          }
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified and captured successfully'
    });
  } catch (error) {
    next(error);
  }
};
