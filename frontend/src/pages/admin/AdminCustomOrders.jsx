import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  MessageCircle,
  Calendar,
  CheckCircle,
  Clock,
  Edit2,
  X,
  IndianRupee
} from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

const customStatuses = [
  'Pending',
  'Reviewing',
  'Quoted',
  'In Progress',
  'Completed',
  'Cancelled'
];

const AdminCustomOrders = () => {
  const [customOrders, setCustomOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [quoteAmount, setQuoteAmount] = useState(0);
  const [status, setStatus] = useState('Pending');
  const [adminNotes, setAdminNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const toast = useToast();

  const fetchCustomOrders = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/custom-orders');
      if (data.success) {
        setCustomOrders(data.customOrders);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomOrders();
  }, []);

  const handleOpenModal = (ord) => {
    setSelectedOrder(ord);
    setQuoteAmount(ord.quoteAmount || 0);
    setStatus(ord.status || 'Pending');
    setAdminNotes(ord.adminNotes || '');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;

    setSaving(true);
    try {
      const { data } = await api.put(`/custom-orders/${selectedOrder._id}`, {
        quoteAmount: Number(quoteAmount),
        status,
        adminNotes
      });

      if (data.success) {
        toast.success('Custom inquiry updated successfully');
        setCustomOrders(customOrders.map((o) => (o._id === selectedOrder._id ? data.customOrder : o)));
        setSelectedOrder(null);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#2B1B20]">Bespoke Custom Orders</h1>
        <p className="text-xs text-gray-500 mt-1">Review personalized creation requests, quote amounts and assign status.</p>
      </div>

      <div className="bg-white rounded-3xl border border-blush-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-blush-100">
            <thead className="bg-blush-50/60 text-gray-500 uppercase font-semibold">
              <tr>
                <th className="py-3.5 px-4">Patron</th>
                <th className="py-3.5 px-3">Product Type</th>
                <th className="py-3.5 px-3">Color Theme</th>
                <th className="py-3.5 px-3">Budget</th>
                <th className="py-3.5 px-3">Target Date</th>
                <th className="py-3.5 px-3">Quote</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-50">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">Loading custom inquiries...</td>
                </tr>
              ) : customOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">No bespoke inquiries received yet.</td>
                </tr>
              ) : (
                customOrders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-blush-50/30 transition">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-gray-800">{ord.name}</p>
                      <p className="text-[11px] text-gray-400">{ord.phone}</p>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-[#7A1738]">
                      {ord.productType}
                    </td>
                    <td className="py-3.5 px-3 text-gray-600">{ord.preferredColor}</td>
                    <td className="py-3.5 px-3 text-gray-600 font-medium">{ord.budget}</td>
                    <td className="py-3.5 px-3 text-gray-500">{ord.requiredDate || 'Flexible'}</td>
                    <td className="py-3.5 px-3 font-bold text-emerald-800">
                      {ord.quoteAmount > 0 ? `₹${ord.quoteAmount.toLocaleString('en-IN')}` : 'Not Quoted'}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="badge-rose text-[10px] font-bold">
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://wa.me/${ord.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(ord.name)},%20this%20is%20Mahima%20from%20Resin%20Artwork%20Creations%20regarding%20your%20custom%20order.`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                          title="Chat on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleOpenModal(ord)}
                          className="btn-secondary text-[11px] px-3 py-1 font-semibold"
                        >
                          Quote / Review
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Quote Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-blush-200 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-blush-100">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#2B1B20]">
                  Custom Inquiry: {selectedOrder.productType}
                </h2>
                <p className="text-xs text-gray-400">Client: {selectedOrder.name} ({selectedOrder.phone})</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-blush-50 rounded-2xl text-xs space-y-2 border border-blush-200 text-gray-700">
              <p><strong>Occasion:</strong> {selectedOrder.occasion}</p>
              <p><strong>Preferred Theme:</strong> {selectedOrder.preferredColor}</p>
              <p><strong>Client Budget:</strong> {selectedOrder.budget}</p>
              <p><strong>Client Details:</strong> "{selectedOrder.customizationDetails}"</p>
              {selectedOrder.referenceImage && (
                <p>
                  <strong>Reference Photo:</strong>{' '}
                  <a
                    href={selectedOrder.referenceImage}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#D81B60] underline"
                  >
                    View Image URL
                  </a>
                </p>
              )}
            </div>

            <form onSubmit={handleUpdate} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-blush-300 bg-white"
                  >
                    {customStatuses.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Quote Amount (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-blush-300 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Atelier Internal Notes</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Received wedding garland on 12th. Initial silica dehydration completed..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-blush-300 bg-white"
                />
              </div>

              <div className="pt-3 border-t border-blush-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="btn-secondary text-xs px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary text-xs px-5 py-2 font-bold"
                >
                  {saving ? 'Updating...' : 'Save Quote & Notes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomOrders;
