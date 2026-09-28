import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  Sparkles,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

const Checkout = () => {
  const { cartItems, subtotal, shippingFee, discount, totalAmount, appliedCoupon, clearCart } = useCart();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    house: user?.addresses?.[0]?.house || '',
    area: user?.addresses?.[0]?.area || '',
    city: user?.addresses?.[0]?.city || 'Indore',
    state: user?.addresses?.[0]?.state || 'Madhya Pradesh',
    pincode: user?.addresses?.[0]?.pincode || '452001',
    paymentMethod: 'COD' // 'COD' or 'Razorpay'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [demoSimulationOpen, setDemoSimulationOpen] = useState(false);
  const [createdOrderDetails, setCreatedOrderDetails] = useState(null);

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#FFF9F5] min-h-screen py-20 text-center px-4">
        <h2 className="font-serif text-3xl font-bold text-[#2B1B20] mb-2">No Items to Checkout</h2>
        <p className="text-gray-500 mb-6">Your shopping bag is empty. Add beautiful resin art pieces first.</p>
        <Link to="/shop" className="btn-primary text-xs px-6 py-3">Explore Shop</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email || !formData.house || !formData.city || !formData.pincode) {
      toast.error('Please complete all required shipping & contact fields');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Prepare base order payload
      const orderPayload = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        shippingAddress: {
          house: formData.house,
          area: formData.area,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        orderItems: cartItems.map((item) => ({
          product: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.images?.[0] || '',
          customizationText: item.customizationText || ''
        })),
        subtotal,
        discount,
        shippingFee,
        totalAmount,
        couponApplied: appliedCoupon ? { code: appliedCoupon.code, discount } : { code: '', discount: 0 },
        paymentMethod: formData.paymentMethod,
        paymentStatus: formData.paymentMethod === 'COD' ? 'COD' : 'Pending'
      };

      // 2. Create Order in MongoDB
      const { data: orderRes } = await api.post('/orders', orderPayload);
      if (!orderRes.success) {
        throw new Error(orderRes.message || 'Could not initialize order');
      }

      const createdOrder = orderRes.order;

      // 3. Handle Cash on Delivery flow
      if (formData.paymentMethod === 'COD') {
        clearCart();
        toast.success(`Order placed successfully! Order ID: ${createdOrder.orderId}`);
        navigate(`/order-success/${createdOrder.orderId}`);
        return;
      }

      // 4. Handle Razorpay Online Payment Flow
      const { data: paymentRes } = await api.post('/payment/create-order', {
        amount: totalAmount,
        receipt: createdOrder.orderId
      });

      if (paymentRes.demoMode || !window.Razorpay) {
        // Trigger Demo Payment Simulation modal for safe test flow
        setCreatedOrderDetails({
          dbOrderId: createdOrder._id,
          orderId: createdOrder.orderId,
          demoRazorpayOrderId: paymentRes.order.id,
          amount: totalAmount
        });
        setDemoSimulationOpen(true);
        setIsProcessing(false);
        return;
      }

      // If Live Razorpay Script is available and keys are active
      const options = {
        key: paymentRes.keyId,
        amount: paymentRes.order.amount,
        currency: paymentRes.order.currency,
        name: 'Resin Artwork Creations',
        description: `Order ${createdOrder.orderId}`,
        image: '/assets/logo.png',
        order_id: paymentRes.order.id,
        handler: async function (response) {
          try {
            await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              dbOrderId: createdOrder._id
            });
            clearCart();
            toast.success('Payment verified successfully!');
            navigate(`/order-success/${createdOrder.orderId}`);
          } catch (err) {
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#7A1738'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        toast.error(`Payment failed: ${response.error.description}`);
        setIsProcessing(false);
      });
      rzp.open();
    } catch (err) {
      toast.error(err.message);
      setIsProcessing(false);
    }
  };

  const handleSimulatePaymentSuccess = async () => {
    if (!createdOrderDetails) return;
    setIsProcessing(true);
    try {
      await api.post('/payment/verify', {
        razorpay_order_id: createdOrderDetails.demoRazorpayOrderId,
        razorpay_payment_id: `pay_demo_${Date.now()}`,
        razorpay_signature: 'demo_simulated_signature',
        dbOrderId: createdOrderDetails.dbOrderId
      });

      clearCart();
      toast.success('Demo payment successful! Order marked as Paid.');
      setDemoSimulationOpen(false);
      navigate(`/order-success/${createdOrderDetails.orderId}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1B20]">
            Secure Checkout
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Handcrafted with love in Indore &bull; Safe nationwide delivery
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Customer Details & Address */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blush-200 shadow-soft space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#7A1738] pb-2 border-b border-blush-100 flex items-center gap-2">
                <span>1. Customer Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number (For Courier) *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +91 98260 12345"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address (For Order Updates) *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. priya.sharma@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blush-200 shadow-soft space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#7A1738] pb-2 border-b border-blush-100 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#C9A227]" />
                <span>2. Shipping Address</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">House / Flat / Building No. *</label>
                  <input
                    type="text"
                    name="house"
                    required
                    placeholder="e.g. Flat 402, Shalimar Palms"
                    value={formData.house}
                    onChange={handleChange}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Street / Area / Landmark</label>
                  <input
                    type="text"
                    name="area"
                    placeholder="e.g. Bicholi Mardana Road, Near Club"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Indore"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    placeholder="e.g. 452016"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    placeholder="e.g. Madhya Pradesh"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blush-200 shadow-soft space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#7A1738] pb-2 border-b border-blush-100 flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#C9A227]" />
                <span>3. Payment Method</span>
              </h2>

              <div className="space-y-3">
                {/* Cash on Delivery */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                    formData.paymentMethod === 'COD'
                      ? 'border-[#7A1738] bg-blush-50/70 shadow-sm'
                      : 'border-blush-200 hover:bg-blush-50/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === 'COD'}
                    onChange={handleChange}
                    className="mt-1 text-[#7A1738] focus:ring-[#7A1738]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#2B1B20]">Cash on Delivery (COD)</span>
                      <span className="text-[10px] bg-white border border-blush-200 px-2 py-0.5 rounded-full font-medium text-gray-600">
                        Pay upon delivery
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Pay cash or UPI to the delivery courier executive upon doorstep package arrival.
                    </p>
                  </div>
                </label>

                {/* Razorpay Online Payment */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                    formData.paymentMethod === 'Razorpay'
                      ? 'border-[#7A1738] bg-blush-50/70 shadow-sm'
                      : 'border-blush-200 hover:bg-blush-50/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Razorpay"
                    checked={formData.paymentMethod === 'Razorpay'}
                    onChange={handleChange}
                    className="mt-1 text-[#7A1738] focus:ring-[#7A1738]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#2B1B20]">Online Payment (Razorpay)</span>
                      <span className="text-[10px] bg-[#DFBA3C]/20 border border-[#C9A227]/40 px-2 py-0.5 rounded-full font-bold text-[#836511]">
                        100% Encrypted
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      UPI (GPay, PhonePe, Paytm), Credit / Debit Cards & Net Banking.
                    </p>
                    <div className="mt-2 text-[11px] text-[#7A1738] font-medium flex items-center gap-1 bg-white/80 p-2 rounded-xl border border-blush-100">
                      <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
                      <span>Demo Payment Mode is supported — test without real money!</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-blush-200 shadow-soft space-y-6 sticky top-28">
            <h2 className="font-serif text-xl font-bold text-[#2B1B20]">Order Summary</h2>

            {/* Items list preview */}
            <div className="max-h-60 overflow-y-auto divide-y divide-blush-100 pr-1">
              {cartItems.map((item) => (
                <div key={item.product._id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images?.[0] || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80'}
                      alt=""
                      className="w-12 h-12 rounded-xl object-cover border border-blush-100 shrink-0"
                    />
                    <div>
                      <p className="font-bold text-gray-800 line-clamp-1">{item.product.name}</p>
                      <p className="text-gray-500 text-[11px]">Qty: {item.quantity}</p>
                      {item.customizationText && (
                        <p className="text-[10px] text-[#7A1738] italic line-clamp-1">
                          "{item.customizationText}"
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-semibold text-gray-800 shrink-0">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-blush-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-800">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Courier Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#2B1B20] pt-2 border-t border-blush-100">
                <span>Grand Total</span>
                <span className="text-lg text-[#7A1738]">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full btn-primary text-sm py-4 font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <Lock className="w-4 h-4" />
              <span>
                {isProcessing
                  ? 'Processing Order...'
                  : formData.paymentMethod === 'COD'
                  ? 'Place Order (Cash on Delivery)'
                  : 'Proceed to Pay with Razorpay'}
              </span>
            </button>

            <div className="pt-2 text-center space-y-1">
              <p className="text-[11px] text-gray-400">
                By placing your order, you agree to our handcrafted terms & delivery policies.
              </p>
              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Demo Razorpay Simulation Modal */}
      {demoSimulationOpen && createdOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-blush-300 shadow-2xl text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-blush-100 text-[#7A1738] flex items-center justify-center mx-auto">
              <CreditCard className="w-7 h-7" />
            </div>

            <div>
              <span className="badge-gold text-[10px] font-bold uppercase tracking-wider mb-1">
                Demo Payment Mode
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2B1B20]">
                Razorpay Payment Simulator
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Simulating secure payment gateway for Order <strong>{createdOrderDetails.orderId}</strong>
              </p>
            </div>

            <div className="bg-blush-50 p-4 rounded-2xl text-xs space-y-1.5 text-left border border-blush-200">
              <div className="flex justify-between">
                <span className="text-gray-500">Demo Order ID:</span>
                <span className="font-mono text-gray-800 font-semibold">{createdOrderDetails.demoRazorpayOrderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payable Amount:</span>
                <span className="font-bold text-[#7A1738] text-sm">₹{createdOrderDetails.amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Method:</span>
                <span className="text-gray-800 font-medium">UPI / Net Banking / Card</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleSimulatePaymentSuccess}
                disabled={isProcessing}
                className="w-full btn-primary text-xs py-3.5 font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulate Successful Payment</span>
              </button>

              <button
                onClick={() => setDemoSimulationOpen(false)}
                className="w-full text-xs text-gray-400 hover:text-gray-600 py-2"
              >
                Cancel / Return to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
