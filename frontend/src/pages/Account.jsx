import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Heart, MapPin, KeyRound, LogOut, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Account = () => {
  const { user, updateProfile, logout, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const toast = useToast();
  const navigate = useNavigate();

  // Profile Form
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    currentPassword: '',
    password: ''
  });

  // Address Form
  const [addressData, setAddressData] = useState({
    house: user?.addresses?.[0]?.house || '',
    area: user?.addresses?.[0]?.area || '',
    city: user?.addresses?.[0]?.city || 'Indore',
    state: user?.addresses?.[0]?.state || 'Madhya Pradesh',
    pincode: user?.addresses?.[0]?.pincode || '452001'
  });

  const [saving, setSaving] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateProfile(profileData);
    setSaving(false);
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateProfile({
      addresses: [{ ...addressData, isDefault: true }]
    });
    setSaving(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#7A1738] to-[#5C102A] text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-[#DFBA3C] flex items-center justify-center font-serif text-2xl font-bold text-white">
              {user?.name?.[0]?.toUpperCase() || 'M'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold">Hello, {user?.name || 'Valued Patron'}!</h1>
                {isAdmin && <span className="badge-gold text-[10px] uppercase font-bold">Admin</span>}
              </div>
              <p className="text-xs text-rose-200 mt-0.5">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link to="/admin" className="btn-gold text-xs px-4 py-2 font-bold">
                Go to Admin Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Account Tabs and Panels */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar */}
          <aside className="md:col-span-4 bg-white rounded-3xl p-4 border border-blush-200 shadow-soft space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition ${
                activeTab === 'profile'
                  ? 'bg-[#F8DDE5] text-[#7A1738]'
                  : 'text-gray-600 hover:bg-blush-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Personal Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition ${
                activeTab === 'addresses'
                  ? 'bg-[#F8DDE5] text-[#7A1738]'
                  : 'text-gray-600 hover:bg-blush-50'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Shipping Addresses</span>
            </button>

            <Link
              to="/orders"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold text-gray-600 hover:bg-blush-50 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>My Orders & Tracking</span>
            </Link>

            <Link
              to="/wishlist"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold text-gray-600 hover:bg-blush-50 transition"
            >
              <Heart className="w-4 h-4" />
              <span>My Wishlist</span>
            </Link>

            <Link
              to="/custom-orders"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold text-[#D81B60] hover:bg-rose-50 transition"
            >
              <Sparkles className="w-4 h-4 text-[#C9A227]" />
              <span>Custom Inquiries</span>
            </Link>
          </aside>

          {/* Active Panel Content */}
          <main className="md:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-blush-200 shadow-soft">
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#2B1B20]">Personal Information</h2>
                  <p className="text-xs text-gray-500 mt-1">Update your account name, contact details and password.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-blush-100 space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#7A1738]">Change Password</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Current Password</label>
                      <input
                        type="password"
                        placeholder="Current password"
                        value={profileData.currentPassword}
                        onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                        className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">New Password</label>
                      <input
                        type="password"
                        placeholder="New password (optional)"
                        value={profileData.password}
                        onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                        className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary text-xs px-6 py-3 font-semibold"
                >
                  {saving ? 'Saving Changes...' : 'Save Profile Changes'}
                </button>
              </form>
            )}

            {activeTab === 'addresses' && (
              <form onSubmit={handleAddressSubmit} className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#2B1B20]">Default Shipping Address</h2>
                  <p className="text-xs text-gray-500 mt-1">Speed up future checkouts by saving your verified delivery destination.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">House / Flat / Apartment No.</label>
                    <input
                      type="text"
                      required
                      value={addressData.house}
                      onChange={(e) => setAddressData({ ...addressData, house: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Street / Area / Landmark</label>
                    <input
                      type="text"
                      value={addressData.area}
                      onChange={(e) => setAddressData({ ...addressData, area: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={addressData.city}
                        onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                        className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={addressData.state}
                        onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                        className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Pincode</label>
                      <input
                        type="text"
                        required
                        value={addressData.pincode}
                        onChange={(e) => setAddressData({ ...addressData, pincode: e.target.value })}
                        className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary text-xs px-6 py-3 font-semibold"
                >
                  {saving ? 'Updating Address...' : 'Save Default Address'}
                </button>
              </form>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;
