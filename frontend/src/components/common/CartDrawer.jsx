import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Trash2, ArrowRight, Sparkles, Tag, Check, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    discount,
    totalAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    await applyCoupon(couponCode);
    setCouponLoading(false);
    setCouponCode('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF9F5] shadow-2xl flex flex-col border-l border-blush-200">
          {/* Header */}
          <div className="p-5 border-b border-blush-200 flex items-center justify-between bg-white/70 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#7A1738]" />
              <h2 className="font-serif text-xl font-bold text-[#2B1B20]">Your Shopping Bag</h2>
              <span className="badge-rose text-xs font-semibold">{cartItems.length} items</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-500 hover:text-[#7A1738] rounded-full hover:bg-blush-100 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-blush-50 px-5 py-3 border-b border-blush-100 text-xs">
            {subtotal >= freeShippingThreshold ? (
              <div className="flex items-center gap-2 text-emerald-800 font-medium">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Congratulations! You qualify for <strong>FREE Delivery</strong></span>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center text-gray-700 mb-1.5 font-medium">
                  <span>Add <strong>₹{remainingForFreeShipping}</strong> more for Free Delivery</span>
                  <span className="text-[#7A1738] font-bold">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full bg-blush-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#D81B60] to-[#C9A227] h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-blush-100">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 rounded-full bg-blush-100 flex items-center justify-center mb-4 text-[#D81B60]">
                  <ShoppingBag className="w-10 h-10 stroke-1" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2B1B20] mb-2">Your Bag is Empty</h3>
                <p className="text-sm text-gray-500 max-w-xs mb-6 leading-relaxed">
                  Explore our handcrafted resin art, floral keepsakes, and personalized gifts made with love in Indore.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="btn-primary text-sm px-6 py-3"
                >
                  Explore Boutique
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.product._id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                  <img
                    src={item.product.images?.[0] || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80'}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-2xl object-cover border border-blush-200 bg-white shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.product.slug || item.product._id}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-serif text-base font-bold text-[#2B1B20] hover:text-[#7A1738] transition line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product._id)}
                          className="text-gray-400 hover:text-rose-600 p-1 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.customizationText && (
                        <p className="text-xs text-[#7A1738] italic mt-0.5 line-clamp-1 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#C9A227]" />
                          {item.customizationText}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-blush-300 rounded-full bg-white px-2 py-0.5 shadow-sm">
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-[#7A1738] font-bold"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-[#7A1738] font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Price Total */}
                      <span className="font-bold text-[#7A1738] text-sm">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with totals & checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-blush-200 bg-white/90 backdrop-blur-md flex flex-col gap-3">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-₹{discount})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-rose-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. WELCOME10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={couponLoading || !couponCode.trim()}
                    className="px-4 py-2.5 rounded-xl bg-[#7A1738] text-white text-xs font-semibold hover:bg-[#D81B60] transition disabled:opacity-50"
                  >
                    {couponLoading ? '...' : 'Apply'}
                  </button>
                </form>
              )}

              {/* Subtotals & Fees */}
              <div className="text-xs space-y-1.5 pt-1 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#2B1B20] pt-2 border-t border-blush-100">
                  <span>Grand Total</span>
                  <span className="text-base text-[#7A1738]">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Actions */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full btn-primary text-sm py-3.5 flex items-center justify-center gap-2 mt-1"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-gray-400">
                Taxes included. Cash on Delivery & Razorpay available at checkout.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
