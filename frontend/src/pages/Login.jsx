import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectUrl = location.state?.from || '/account';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result?.success) {
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(redirectUrl);
      }
    }
  };

  const handleDemoFill = (role) => {
    if (role === 'admin') {
      setEmail('admin@resinartwork.com');
      setPassword('Admin@123');
    } else {
      setEmail('priya.sharma@example.com');
      setPassword('Customer@123');
    }
  };

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-12 md:py-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#F4B6C2]/60 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-blush-100 flex items-center justify-center mx-auto text-[#7A1738]">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#2B1B20]">Welcome Back</h1>
          <p className="text-xs text-gray-500">Sign in to track orders, save wishlist items and manage addresses.</p>
        </div>

        {/* Demo Credentials Quick Box */}
        <div className="bg-blush-50/80 p-3.5 rounded-2xl border border-blush-200 text-xs text-gray-700 space-y-2">
          <div className="flex items-center justify-between font-semibold text-[#7A1738]">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
              Quick Demo Fill
            </span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill('customer')}
              className="flex-1 py-1.5 px-2 bg-white rounded-lg border border-blush-200 hover:border-[#7A1738] text-[11px] font-medium text-gray-700 transition"
            >
              Fill Customer Demo
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('admin')}
              className="flex-1 py-1.5 px-2 bg-white rounded-lg border border-blush-200 hover:border-[#7A1738] text-[11px] font-medium text-[#7A1738] transition"
            >
              Fill Admin Demo
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="e.g. priya@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-gray-700">Password</label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary text-xs sm:text-sm py-3.5 font-bold flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-blush-100 text-xs text-gray-600">
          <span>Don't have an account yet? </span>
          <Link to="/register" className="text-[#D81B60] font-bold hover:underline">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
