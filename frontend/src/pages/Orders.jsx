import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, Clock, ShoppingBag, Truck, CheckCircle } from 'lucide-react';
import api from '../services/api';

const statusColorMap = {
  Pending: 'bg-amber-50 text-amber-800 border-amber-200',
  Confirmed: 'bg-blue-50 text-blue-800 border-blue-200',
  Processing: 'bg-purple-50 text-purple-800 border-purple-200',
  Shipped: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  'Out for Delivery': 'bg-teal-50 text-teal-800 border-teal-200',
  Delivered: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Cancelled: 'bg-rose-50 text-rose-800 border-rose-200'
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/my');
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.warn('Could not load user orders:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <Link to="/account" className="hover:text-[#7A1738]">Account</Link>
            <span>&bull;</span>
            <span className="text-[#7A1738] font-semibold">Orders</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1B20]">
            My Orders & Tracking
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Track the status of your handcrafted bespoke creations and past deliveries.
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-3xl p-6 h-36 animate-pulse border border-blush-200" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-blush-200 shadow-soft max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-blush-100 flex items-center justify-center mx-auto text-[#7A1738] mb-4">
              <Package className="w-8 h-8 stroke-1" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#2B1B20] mb-2">No Orders Placed Yet</h2>
            <p className="text-xs text-gray-500 mb-6">Explore our handmade resin gifts, clocks and hampers to place your first order.</p>
            <Link to="/shop" className="btn-primary text-xs px-6 py-3">
              <span>Start Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusClass = statusColorMap[order.orderStatus] || 'bg-gray-50 text-gray-700 border-gray-200';
              return (
                <div
                  key={order._id}
                  className="bg-white rounded-3xl p-6 border border-blush-200 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-sm font-bold text-gray-800">
                        {order.orderId}
                      </span>
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${statusClass}`}>
                        {order.orderStatus}
                      </span>
                      <span className="text-xs text-gray-400">
                        Ordered on {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Order Items thumbnail preview */}
                    <div className="flex items-center gap-2 overflow-x-auto py-1">
                      {order.orderItems?.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 bg-blush-50/60 p-1.5 rounded-xl border border-blush-100 shrink-0">
                          <img
                            src={item.image || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=100&auto=format&fit=crop&q=80'}
                            alt=""
                            className="w-9 h-9 rounded-lg object-cover"
                          />
                          <span className="text-xs font-medium text-gray-700 max-w-[130px] truncate">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-gray-400">x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-blush-100">
                    <div>
                      <span className="text-[11px] text-gray-400 block md:text-right">Total Amount</span>
                      <span className="font-bold text-[#7A1738] text-base md:text-lg">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <Link
                      to={`/orders/${order.orderId}`}
                      className="btn-secondary text-xs px-4 py-2 font-semibold flex items-center gap-1.5"
                    >
                      <span>Track Order</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
