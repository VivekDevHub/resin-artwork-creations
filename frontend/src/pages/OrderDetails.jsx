import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  CreditCard,
  ArrowLeft,
  Sparkles,
  Calendar
} from 'lucide-react';
import api from '../services/api';

const stages = ['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        if (data.success) {
          setOrder(data.order);
        }
      } catch (err) {
        console.error('Error fetching order:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-[#7A1738] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs text-gray-500">Retrieving order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#2B1B20] mb-2">Order Not Found</h2>
        <p className="text-xs text-gray-500 mb-6">We could not locate this order ID in the system.</p>
        <Link to="/orders" className="btn-primary text-xs px-6 py-3">View All Orders</Link>
      </div>
    );
  }

  const currentStageIndex = stages.indexOf(order.orderStatus);

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link to="/orders" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#7A1738] mb-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Orders</span>
            </Link>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B20]">
              Order <span className="font-mono text-[#7A1738]">{order.orderId}</span>
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'full' })}
            </p>
          </div>

          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 block">Current Status</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F8DDE5] text-[#7A1738] border border-[#F4B6C2]">
              {order.orderStatus}
            </span>
          </div>
        </div>

        {/* Visual Progress Timeline */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blush-200 shadow-soft">
          <h2 className="font-serif text-lg font-bold text-[#2B1B20] mb-6 flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#C9A227]" />
            <span>Delivery Tracking & Timeline</span>
          </h2>

          {/* Stepper bar */}
          <div className="relative flex items-center justify-between max-w-2xl mx-auto mb-8 px-4">
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-blush-100 -z-0" />
            <div
              className="absolute left-8 top-1/2 -translate-y-1/2 h-1 bg-[#D81B60] -z-0 transition-all duration-700"
              style={{
                width: `${Math.max(0, Math.min(100, (currentStageIndex / (stages.length - 1)) * 100))}%`
              }}
            />

            {stages.map((stage, idx) => {
              const isPastOrCurrent = currentStageIndex >= idx;
              const isCurrent = currentStageIndex === idx;

              return (
                <div key={stage} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                      isPastOrCurrent
                        ? 'bg-[#7A1738] text-white shadow-md'
                        : 'bg-white text-gray-400 border border-blush-200'
                    } ${isCurrent ? 'ring-4 ring-[#F4B6C2]' : ''}`}
                  >
                    {isPastOrCurrent ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs mt-2 text-center max-w-[70px] ${
                      isPastOrCurrent ? 'font-semibold text-gray-800' : 'text-gray-400'
                    }`}
                  >
                    {stage}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Timeline History Entries */}
          {order.timeline && order.timeline.length > 0 && (
            <div className="pt-6 border-t border-blush-100 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Atelier Updates
              </h3>
              <div className="space-y-2">
                {order.timeline.map((entry, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs bg-blush-50/60 p-3 rounded-xl border border-blush-100">
                    <div className="w-2 h-2 rounded-full bg-[#D81B60] mt-1.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#7A1738]">{entry.status}</span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} &bull; {new Date(entry.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-0.5">{entry.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Order Details & Summary Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Order Items */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-blush-200 shadow-soft space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#2B1B20]">Ordered Items</h2>
            <div className="divide-y divide-blush-100">
              {order.orderItems?.map((item, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80'}
                      alt=""
                      className="w-14 h-14 rounded-2xl object-cover border border-blush-100 shrink-0"
                    />
                    <div>
                      <p className="font-bold text-gray-800 line-clamp-1">{item.name}</p>
                      <p className="text-gray-400 text-[11px]">Quantity: {item.quantity}</p>
                      {item.customizationText && (
                        <p className="text-[11px] text-[#7A1738] italic flex items-center gap-1 mt-0.5">
                          <Sparkles className="w-3 h-3 text-[#C9A227]" />
                          Personalization: "{item.customizationText}"
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-bold text-gray-800">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-blush-100 space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span>-₹{order.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{order.shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${order.shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#2B1B20] pt-2 border-t border-blush-100">
                <span>Grand Total</span>
                <span className="text-lg text-[#7A1738]">₹{order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-blush-200 shadow-soft space-y-3 text-xs">
              <h3 className="font-serif text-base font-bold text-[#2B1B20] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#7A1738]" />
                <span>Shipping Address</span>
              </h3>
              <div className="text-gray-600 space-y-0.5 pt-1">
                <p className="font-semibold text-gray-800">{order.customer?.name}</p>
                <p>{order.shippingAddress?.house}, {order.shippingAddress?.area}</p>
                <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
                <p className="text-gray-500 pt-1">Phone: {order.customer?.phone}</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-blush-200 shadow-soft space-y-3 text-xs">
              <h3 className="font-serif text-base font-bold text-[#2B1B20] flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#7A1738]" />
                <span>Payment Summary</span>
              </h3>
              <div className="space-y-1 pt-1 text-gray-600">
                <div className="flex justify-between">
                  <span>Method:</span>
                  <span className="font-semibold text-gray-800">
                    {order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment (Razorpay)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Status:</span>
                  <span className={`font-bold ${order.paymentStatus === 'Paid' ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
