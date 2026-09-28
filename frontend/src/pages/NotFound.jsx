import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="bg-[#FFF9F5] min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-blush-200 shadow-soft">
        <div className="w-20 h-20 rounded-full bg-blush-100 flex items-center justify-center mx-auto text-[#7A1738]">
          <Sparkles className="w-10 h-10 text-[#C9A227]" />
        </div>

        <div>
          <span className="font-serif text-6xl font-bold text-[#7A1738] block">404</span>
          <h1 className="font-serif text-2xl font-bold text-[#2B1B20] mt-2">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
            The artisanal page or product you are looking for has been moved or does not exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary text-xs px-5 py-3 flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link to="/shop" className="btn-secondary text-xs px-5 py-3 flex items-center justify-center gap-2">
            <span>Explore Shop</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
