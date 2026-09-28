import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, Sparkles, Tag, Check, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    shippingFee,
    discount,
    totalAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const navigate = useNavigate();

  const handleApply = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    await applyCoupon(couponInput);
    setCouponLoading(false);
    setCouponInput('');
  };

  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#FFF9F5] min-h-screen py-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white rounded-3xl p-10 text-center border border-blush-200 shadow-soft">
          <div className="w-20 h-20 rounded-full bg-blush-100 flex items-center justify-center mx-auto text-[#7A1738] mb-4">
            <ShoppingBag className="w-10 h-10 stroke-1" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#2B1B20] mb-2">Your Bag is Empty</h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Discover unique handmade resin clocks, scented floral candles, and personalized gifts made with love in Indore.
          </p>
          <Link to="/shop" className="btn-primary text-sm px-7 py-3.5 inline-flex items-center gap-2">
            <span>Explore Boutique</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <Link to="/" className="hover:text-[#7A1738]">Home</Link>
            <span>&bull;</span>
            <span className="text-[#7A1738] font-semibold">Shopping Bag</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1B20]">
            Review Your Shopping Bag
          </h1>
        </div>

        {/* Free shipping progress bar */}
        <div className="bg-white rounded-2xl p-4 border border-blush-200 mb-8 max-w-3xl">
          {subtotal >= freeShippingThreshold ? (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-800 font-semibold">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Great news! You have earned <strong>FREE Express Shipping</strong> on this order.</span>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center text-xs text-gray-700 mb-1.5 font-medium">
                <span>Add <strong>₹{remainingForFreeShipping}</strong> more for Free Shipping</span>
                <span className="text-[#7A1738] font-bold">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full bg-blush-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#D81B60] to-[#C9A227] h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items Table */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-blush-200 shadow-soft">
            <div className="flex items-center justify-between pb-4 border-b border-blush-100 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Products ({cartItems.length})
              </span>
              <button
                onClick={clearCart}
                className="text-xs text-gray-400 hover:text-rose-600 transition"
              >
                Clear Bag
              </button>
            </div>

            <div className="divide-y divide-blush-100">
              {cartItems.map((item) => (
                <div key={item.product._id} className="py-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.product.images?.[0] || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80'}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-blush-200 bg-blush-50 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] text-[#D81B60] font-semibold uppercase tracking-wider">
                        {item.product.categoryName}
                      </span>
                      <Link
                        to={`/product/${item.product.slug || item.product._id}`}
                        className="font-serif text-lg font-bold text-[#2B1B20] hover:text-[#7A1738] block line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-[#7A1738] font-medium mt-0.5">
                        ₹{item.product.price.toLocaleString('en-IN')} each
                      </p>
                      {item.customizationText && (
                        <p className="text-xs text-gray-500 italic mt-1 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#C9A227]" />
                          Personalization: "{item.customizationText}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0">
                    <div className="flex items-center border border-blush-300 rounded-full bg-white px-2 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-[#7A1738] font-bold"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-[#7A1738] font-bold"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-bold text-[#7A1738] text-base min-w-[70px] text-right">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="text-gray-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-blush-100 flex items-center justify-between">
              <Link to="/shop" className="text-xs font-semibold text-[#7A1738] hover:underline">
                &larr; Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-blush-200 shadow-soft space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#2B1B20]">Order Summary</h2>

            {/* Coupon Code Section */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-₹{discount})</span>
                </div>
                <button onClick={removeCoupon} className="text-xs text-rose-600 font-bold hover:underline">
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. WELCOME10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-blush-300 focus:outline-none focus:border-[#7A1738]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={couponLoading || !couponInput.trim()}
                  className="px-4 py-2.5 bg-[#7A1738] text-white text-xs font-semibold rounded-xl hover:bg-[#D81B60] transition disabled:opacity-50"
                >
                  {couponLoading ? '...' : 'Apply'}
                </button>
              </form>
            )}

            {/* Calculations */}
            <div className="space-y-2 text-xs text-gray-600 divide-y divide-blush-50">
              <div className="flex justify-between pt-1">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-800">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between pt-2 text-emerald-700">
                  <span>Coupon Discount</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between pt-2">
                <span>Estimated Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between pt-3 text-base font-bold text-[#2B1B20]">
                <span>Total Amount</span>
                <span className="text-lg text-[#7A1738]">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full btn-primary text-sm py-4 flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="p-3 bg-blush-50 rounded-xl text-xs text-gray-500 space-y-1">
              <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                <span>100% Safe & Secure Checkout</span>
              </div>
              <p className="text-[11px]">Choose between Cash on Delivery (COD) or Online Razorpay Payment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
