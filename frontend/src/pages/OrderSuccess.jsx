import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, ArrowRight, ShoppingBag, Calendar, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '../services/api';

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D81B60', '#C9A227', '#F4B6C2', '#7A1738']
      });
    } catch {}

    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        if (data.success) {
          setOrder(data.order);
        }
      } catch (err) {
        console.warn('Could not load order details:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F4B6C2]/60 shadow-xl text-center space-y-6">
          {/* Success Badge */}
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div>
            <span className="badge-gold text-xs font-bold uppercase tracking-wider mb-2">
              Order Confirmed &bull; Indore Studio
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1B20]">
              Thank You For Your Order!
            </h1>
            <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto">
              Mahima has received your order and our atelier will begin carefully preparing and hand-packaging your resin pieces.
            </p>
          </div>

          {/* Key Order Metrics Box */}
          <div className="bg-blush-50 rounded-2xl p-6 border border-blush-200 text-xs text-left grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <span className="text-gray-400 block mb-1">Order ID</span>
              <span className="font-mono font-bold text-gray-800 text-sm">{order?.orderId || id}</span>
            </div>

            <div>
              <span className="text-gray-400 block mb-1">Payment Method</span>
              <span className="font-semibold text-gray-800">
                {order?.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment (Razorpay)'}
              </span>
            </div>

            <div>
              <span className="text-gray-400 block mb-1">Total Paid / Due</span>
              <span className="font-bold text-[#7A1738] text-sm">
                ₹{order ? order.totalAmount.toLocaleString('en-IN') : '...'}
              </span>
            </div>

            <div>
              <span className="text-gray-400 block mb-1">Est. Delivery</span>
              <span className="font-semibold text-emerald-800">
                {order?.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString() : '5-7 Business Days'}
              </span>
            </div>
          </div>

          {/* Order Items Preview */}
          {order && order.orderItems && (
            <div className="pt-4 border-t border-blush-100 text-left">
              <h3 className="font-serif font-bold text-base text-[#2B1B20] mb-3">Items in this Package</h3>
              <div className="divide-y divide-blush-50 max-h-48 overflow-y-auto pr-1">
                {order.orderItems.map((item, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80'}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover border border-blush-100"
                      />
                      <div>
                        <p className="font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                        <p className="text-gray-400 text-[11px]">Qty: {item.quantity}</p>
                        {item.customizationText && (
                          <p className="text-[10px] text-[#7A1738] italic">"{item.customizationText}"</p>
                        )}
                      </div>
                    </div>
                    <span className="font-semibold text-gray-700">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shipping Address */}
          {order && order.shippingAddress && (
            <div className="bg-white rounded-xl p-4 border border-blush-100 text-left text-xs text-gray-600 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#7A1738] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-800">Delivering to {order.customer?.name}:</p>
                <p>{order.shippingAddress.house}, {order.shippingAddress.area}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={`/orders/${order?.orderId || id}`}
              className="w-full sm:w-auto btn-primary text-xs sm:text-sm px-6 py-3.5 flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>Track Order & View Timeline</span>
            </Link>

            <Link
              to="/shop"
              className="w-full sm:w-auto btn-secondary text-xs sm:text-sm px-6 py-3.5 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
