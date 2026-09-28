import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  CheckCircle,
  Truck,
  Clock,
  X,
  CreditCard,
  MapPin,
  Sparkles
} from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

const statusOptions = [
  'Pending',
  'Confirmed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
  'Cancelled'
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected Order Modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [updating, setUpdating] = useState(false);

  const toast = useToast();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);
      params.append('limit', '50');

      const { data } = await api.get(`/orders?${params.toString()}`);
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchOrders();
  };

  const handleOpenDetailModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.orderStatus);
    setStatusNote('');
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;

    setUpdating(true);
    try {
      const { data } = await api.put(`/orders/${selectedOrder._id}/status`, {
        status: newStatus,
        note: statusNote || `Status updated to ${newStatus}`
      });

      if (data.success) {
        toast.success(`Order ${data.order.orderId} updated to ${newStatus}`);
        setOrders(orders.map((o) => (o._id === selectedOrder._id ? data.order : o)));
        setSelectedOrder(data.order);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#2B1B20]">Order Management</h1>
        <p className="text-xs text-gray-500 mt-1">Review orders, update dispatch timelines and monitor payments.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-blush-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <form onSubmit={handleSearchSubmit} className="flex-1 w-full flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by Order ID, customer name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-10 pr-3 py-2.5 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
            />
          </div>
          <button type="submit" className="btn-primary text-xs px-4 py-2.5">
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-gray-500 whitespace-nowrap">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs px-3 py-2.5 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
          >
            <option value="all">All Orders</option>
            {statusOptions.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-blush-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-blush-100">
            <thead className="bg-blush-50/60 text-gray-500 uppercase font-semibold">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-3">Date</th>
                <th className="py-3.5 px-3">Customer</th>
                <th className="py-3.5 px-3">Items</th>
                <th className="py-3.5 px-3">Total Amount</th>
                <th className="py-3.5 px-3">Payment</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-50">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">Loading orders...</td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">No orders found matching filters.</td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-blush-50/30 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#7A1738]">
                      {ord.orderId}
                    </td>
                    <td className="py-3.5 px-3 text-gray-500 whitespace-nowrap">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-3">
                      <p className="font-semibold text-gray-800">{ord.customer?.name}</p>
                      <p className="text-[11px] text-gray-400">{ord.customer?.phone}</p>
                    </td>
                    <td className="py-3.5 px-3 text-gray-600">
                      {ord.orderItems?.length || 1} items
                    </td>
                    <td className="py-3.5 px-3 font-bold text-gray-800">
                      ₹{ord.totalAmount?.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ord.paymentStatus === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {ord.paymentMethod} &bull; {ord.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="badge-rose text-[10px] font-bold">
                        {ord.orderStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenDetailModal(ord)}
                        className="btn-secondary text-[11px] px-3 py-1.5 font-semibold"
                      >
                        Inspect & Update
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Status & Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-blush-200 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-blush-100">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#2B1B20]">
                  Manage Order <span className="font-mono text-[#7A1738]">{selectedOrder.orderId}</span>
                </h2>
                <p className="text-xs text-gray-500">Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Update Form */}
            <form onSubmit={handleUpdateStatus} className="bg-blush-50/70 p-5 rounded-2xl border border-blush-200 space-y-4 text-xs">
              <h3 className="font-serif text-base font-bold text-[#7A1738]">Update Fulfillment Status</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-blush-300 bg-white font-medium text-xs focus:outline-none focus:border-[#7A1738]"
                  >
                    {statusOptions.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Timeline Note (e.g. Courier tracking ID)</label>
                  <input
                    type="text"
                    placeholder="e.g. BlueDart tracking BLU8928172 dispatched"
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-blush-300 bg-white text-xs focus:outline-none focus:border-[#7A1738]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={updating}
                className="btn-primary text-xs px-5 py-2.5 font-bold"
              >
                {updating ? 'Updating...' : 'Save Status Update'}
              </button>
            </form>

            {/* Order Items Details */}
            <div className="space-y-2">
              <h3 className="font-serif text-base font-bold text-[#2B1B20]">Ordered Items</h3>
              <div className="divide-y divide-blush-100 text-xs">
                {selectedOrder.orderItems?.map((it, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={it.image || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80'}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover border border-blush-100"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{it.name}</p>
                        <p className="text-[11px] text-gray-400">Qty: {it.quantity}</p>
                        {it.customizationText && (
                          <p className="text-[10px] text-[#7A1738] italic">"{it.customizationText}"</p>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-gray-800">₹{(it.price * it.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer & Shipping Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-white rounded-2xl border border-blush-200">
                <span className="font-bold text-gray-700 block mb-1">Customer Contact:</span>
                <p>{selectedOrder.customer?.name}</p>
                <p className="text-gray-500">{selectedOrder.customer?.email}</p>
                <p className="text-gray-500">{selectedOrder.customer?.phone}</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-blush-200">
                <span className="font-bold text-gray-700 block mb-1">Shipping Address:</span>
                <p>{selectedOrder.shippingAddress?.house}, {selectedOrder.shippingAddress?.area}</p>
                <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
