import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';

const popularKeywords = [
  'Resin Clock',
  'Coaster Set',
  'Preserved Flower Frame',
  'Candles',
  'Gift Hamper',
  'Personalized Keychain',
  'Couple Plaque',
  'Floral Tray'
];

const SearchBarModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    onClose();
  };

  const handleKeywordClick = (kw) => {
    navigate(`/shop?search=${encodeURIComponent(kw)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <div
        className="relative w-full max-w-2xl bg-[#FFF9F5] rounded-3xl shadow-2xl border border-blush-200 overflow-hidden p-6 md:p-8 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-blush-200">
          <div className="flex items-center gap-2 text-[#7A1738]">
            <Sparkles className="w-5 h-5 text-[#C9A227]" />
            <span className="font-serif font-bold text-lg">Search Resin Artwork Creations</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-[#7A1738] rounded-full hover:bg-blush-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSearch} className="mt-5 relative">
          <Search className="w-5 h-5 absolute left-4 top-4 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by product name, category, or gift idea..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-28 py-3.5 rounded-2xl border border-blush-300 bg-white text-base focus:outline-none focus:border-[#7A1738] shadow-inner text-[#2B1B20]"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 btn-primary text-xs px-4 py-2"
          >
            Search
          </button>
        </form>

        {/* Popular Trending Tags */}
        <div className="mt-6">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-3">
            Popular Searches
          </span>
          <div className="flex flex-wrap gap-2">
            {popularKeywords.map((kw, i) => (
              <button
                key={i}
                onClick={() => handleKeywordClick(kw)}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-white hover:bg-blush-100 text-[#7A1738] border border-blush-200 hover:border-[#D81B60] transition shadow-sm flex items-center gap-1"
              >
                <span>{kw}</span>
                <ArrowRight className="w-3 h-3 text-[#D81B60]" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBarModal;
