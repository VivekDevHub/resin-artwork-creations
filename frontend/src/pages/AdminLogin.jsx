import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@resinartwork.com');
  const [password, setPassword] = useState('Admin@123');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result?.success) {
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        toast.error('You do not have administrative access permissions.');
      }
    }
  };

  return (
    <div className="bg-[#2B1B20] min-h-screen py-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#FFF9F5] rounded-3xl p-8 sm:p-10 border border-[#C9A227]/40 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-[#F8DDE5] text-[#7A1738] flex items-center justify-center mx-auto border border-[#C9A227]/50 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-[#C9A227]" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#2B1B20]">Admin Portal</h1>
          <p className="text-xs text-gray-500">Authorized personnel only &bull; Resin Artwork Creations Atelier Management</p>
        </div>

        {/* Demo Credentials Box */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1.5">
          <p className="font-bold flex items-center gap-1.5 text-[#836511]">
            <Sparkles className="w-4 h-4 text-[#C9A227]" />
            DEMO ADMIN CREDENTIALS (Pre-filled):
          </p>
          <div className="font-mono text-gray-700 space-y-0.5 pt-1">
            <p><strong>Email:</strong> admin@resinartwork.com</p>
            <p><strong>Password:</strong> Admin@123</p>
          </div>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Admin Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary text-xs sm:text-sm py-3.5 font-bold flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Verifying Admin Access...' : 'Access Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
