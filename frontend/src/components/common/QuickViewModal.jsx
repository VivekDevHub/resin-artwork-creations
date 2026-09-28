import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, Check, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import RatingStars from './RatingStars';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const QuickViewModal = ({ product, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState('');
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const isFavorited = isInWishlist(product._id);

  const handleAddToCart = () => {
    addToCart(product, quantity, customText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-[#FFF9F5] rounded-3xl shadow-2xl overflow-hidden border border-[#F4B6C2]/50 max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-[#7A1738] bg-white/80 rounded-full backdrop-blur-sm transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Imagery */}
        <div className="md:w-1/2 bg-blush-50 p-6 flex flex-col justify-between">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-inner border border-blush-200/50 bg-white">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discountPercentage > 0 && (
              <span className="absolute top-3 left-3 bg-[#D81B60] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition ${
                    selectedImage === idx ? 'border-[#7A1738]' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#D81B60] mb-1">
            {product.categoryName || 'Handcrafted Collection'}
          </div>

          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2B1B20] leading-tight mb-2">
            {product.name}
          </h2>

          <div className="mb-4">
            <RatingStars rating={product.rating || 5} numReviews={product.numReviews || 12} />
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl md:text-3xl font-bold text-[#7A1738]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-base text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
              In Stock & Ready to Ship
            </span>
          </div>

          <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
            {product.description}
          </p>

          {/* Custom Inscription Optional Field */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#7A1738] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
              Personalization / Inscription (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Name: 'Aarav & Diya' or Year: '2026'"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush-200 bg-white focus:outline-none focus:border-[#7A1738] transition"
            />
          </div>

          {/* Quantity and Actions */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center border border-blush-300 rounded-full bg-white px-2 py-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#7A1738] font-bold text-lg"
              >
                -
              </button>
              <span className="w-8 text-center font-medium text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#7A1738] font-bold text-lg"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 btn-primary text-sm py-3"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Bag
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3 rounded-full border transition ${
                isFavorited
                  ? 'bg-rose-50 border-[#D81B60] text-[#D81B60]'
                  : 'bg-white border-blush-200 text-gray-500 hover:text-[#D81B60]'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#D81B60]' : ''}`} />
            </button>
          </div>

          {/* Quick Perks */}
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-blush-100 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#C9A227]" />
              <span>Free Shipping over ₹999</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
              <span>100% Handcrafted Indore</span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link
              to={`/product/${product.slug || product._id}`}
              onClick={onClose}
              className="text-xs font-semibold text-[#7A1738] hover:text-[#D81B60] underline underline-offset-4"
            >
              View Full Product Specifications & Reviews &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
