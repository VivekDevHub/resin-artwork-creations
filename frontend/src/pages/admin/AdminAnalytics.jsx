import React, { useState, useEffect } from 'react';
import { Tag, Plus, Trash2, CheckCircle, Sparkles, Star, IndianRupee } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

const AdminAnalytics = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountPercent: 10,
    maxDiscount: 500,
    minOrderValue: 799,
    description: ''
  });
  const [creating, setCreating] = useState(false);
  const toast = useToast();

  const fetchCoupons = async () => {
    try {
      const { data } = await api.get('/coupons');
      if (data.success) {
        setCoupons(data.coupons);
      }
    } catch (err) {
      console.warn('Error fetching coupons:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (!newCoupon.code.trim()) return;

    setCreating(true);
    try {
      const { data } = await api.post('/coupons', newCoupon);
      if (data.success) {
        toast.success(`Coupon ${data.coupon.code} created successfully!`);
        setCoupons([data.coupon, ...coupons]);
        setNewCoupon({
          code: '',
          discountPercent: 10,
          maxDiscount: 500,
          minOrderValue: 799,
          description: ''
        });
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteCoupon = async (id, code) => {
    if (!window.confirm(`Delete coupon ${code}?`)) return;

    try {
      const { data } = await api.delete(`/coupons/${id}`);
      if (data.success) {
        toast.success(`Coupon ${code} removed`);
        setCoupons(coupons.filter((c) => c._id !== id));
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#2B1B20]">Coupons & Promotions</h1>
        <p className="text-xs text-gray-500 mt-1">Configure active promotion codes, maximum discount caps and minimum cart thresholds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Create Coupon Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-blush-200 shadow-soft space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#7A1738] flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#C9A227]" />
            <span>Create New Promo Code</span>
          </h2>

          <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Coupon Code (Uppercase)</label>
              <input
                type="text"
                required
                placeholder="e.g. FESTIVE25"
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-blush-300 font-mono font-bold uppercase focus:outline-none focus:border-[#7A1738]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Discount (%)</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={90}
                  value={newCoupon.discountPercent}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discountPercent: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-blush-300 focus:outline-none focus:border-[#7A1738]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Max Cap (₹)</label>
                <input
                  type="number"
                  min={50}
                  value={newCoupon.maxDiscount}
                  onChange={(e) => setNewCoupon({ ...newCoupon, maxDiscount: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-blush-300 focus:outline-none focus:border-[#7A1738]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Min Order Threshold (₹)</label>
              <input
                type="number"
                min={0}
                value={newCoupon.minOrderValue}
                onChange={(e) => setNewCoupon({ ...newCoupon, minOrderValue: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-blush-300 focus:outline-none focus:border-[#7A1738]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Description</label>
              <input
                type="text"
                placeholder="e.g. Festival 15% discount for Indore shoppers"
                value={newCoupon.description}
                onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-blush-300 focus:outline-none focus:border-[#7A1738]"
              />
            </div>

            <button
              type="submit"
              disabled={creating}
              className="w-full btn-primary text-xs py-3 font-bold"
            >
              {creating ? 'Creating...' : 'Activate Coupon'}
            </button>
          </form>
        </div>

        {/* Existing Coupons List */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-blush-200 shadow-soft space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#2B1B20]">Active Coupons ({coupons.length})</h2>

          <div className="divide-y divide-blush-100 text-xs">
            {loading ? (
              <p className="text-gray-400 py-4">Loading coupons...</p>
            ) : coupons.length === 0 ? (
              <p className="text-gray-400 py-4">No active coupons available.</p>
            ) : (
              coupons.map((cp) => (
                <div key={cp._id} className="py-3.5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#7A1738] bg-blush-50 px-2.5 py-0.5 rounded-lg border border-blush-200">
                        {cp.code}
                      </span>
                      <span className="font-bold text-emerald-700">{cp.discountPercent}% OFF</span>
                    </div>
                    <p className="text-gray-500 text-[11px]">{cp.description || 'General promotion'}</p>
                    <p className="text-gray-400 text-[10px]">
                      Min Order: ₹{cp.minOrderValue} &bull; Max Discount: ₹{cp.maxDiscount}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteCoupon(cp._id, cp.code)}
                    className="p-2 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                    title="Delete Coupon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
