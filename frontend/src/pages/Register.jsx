import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    setLoading(true);
    const result = await register(formData.name, formData.email, formData.password, formData.phone);
    setLoading(false);
    if (result?.success) {
      navigate('/account');
    }
  };

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-12 md:py-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#F4B6C2]/60 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-blush-100 flex items-center justify-center mx-auto text-[#7A1738]">
            <Sparkles className="w-7 h-7 text-[#C9A227]" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#2B1B20]">Join Our Atelier</h1>
          <p className="text-xs text-gray-500">Create an account to save favorite items, track custom orders & get exclusive perks.</p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Diya Patel"
                value={formData.name}
                onChange={handleChange}
                className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                name="email"
                required
                placeholder="e.g. diya@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number (Optional)</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="tel"
                name="phone"
                placeholder="e.g. +91 98260 12345"
                value={formData.phone}
                onChange={handleChange}
                className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password * (min 6 characters)</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                name="password"
                required
                minLength={6}
                placeholder="Create secure password"
                value={formData.password}
                onChange={handleChange}
                className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="Repeat password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary text-xs sm:text-sm py-3.5 font-bold flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-blush-100 text-xs text-gray-600">
          <span>Already have an account? </span>
          <Link to="/login" className="text-[#D81B60] font-bold hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
