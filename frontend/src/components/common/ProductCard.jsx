import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import RatingStars from './RatingStars';
import QuickViewModal from './QuickViewModal';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductCard = ({ product }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const isFavorited = isInWishlist(product._id);
  const primaryImg = product.images?.[0] || '/assets/products/product-01.png';

  return (
    <>
      <div
        className="group relative bg-[#FFF9F5] rounded-3xl p-3 border border-[#F4B6C2]/40 shadow-soft hover:shadow-soft-lg hover:border-[#D81B60]/40 transition-all duration-300 flex flex-col justify-between"
      >
        {/* Image Box */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-blush-50">
          <Link to={`/product/${product.slug || product._id}`} className="block w-full h-full overflow-hidden">
            <img
              src={primaryImg}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              loading="lazy"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
            {product.discountPercentage > 0 && (
              <span className="bg-[#D81B60] text-white text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                {product.discountPercentage}% OFF
              </span>
            )}
            {product.bestSeller && (
              <span className="bg-[#C9A227] text-white text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Best Seller
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product)}
            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 ${
              isFavorited
                ? 'bg-white text-[#D81B60] shadow-md scale-110'
                : 'bg-white/80 text-gray-600 hover:text-[#D81B60] hover:bg-white'
            }`}
            title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#D81B60]' : ''}`} />
          </button>

          {/* Desktop Hover Action overlay (Quick View) */}
          <div className="hidden md:flex absolute inset-x-3 bottom-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setShowQuickView(true)}
              className="flex-1 bg-white/95 hover:bg-white text-[#7A1738] font-medium py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md backdrop-blur-sm transition"
            >
              <Eye className="w-3.5 h-3.5" />
              Quick View
            </button>
            <button
              onClick={() => addToCart(product, 1)}
              className="bg-[#7A1738] hover:bg-[#D81B60] text-white p-2 rounded-xl shadow-md transition"
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="pt-3.5 pb-1 flex flex-col flex-1 justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#D81B60] font-medium mb-1">
              {product.categoryName || 'Resin Artwork'}
            </div>

            <Link
              to={`/product/${product.slug || product._id}`}
              className="block font-serif text-base md:text-lg font-bold text-[#2B1B20] hover:text-[#7A1738] transition leading-snug line-clamp-1"
            >
              {product.name}
            </Link>

            <div className="mt-1">
              <RatingStars rating={product.rating || 5} numReviews={product.numReviews || 12} size="xs" />
            </div>
          </div>

          {/* Price & Mobile Add to Bag */}
          <div className="mt-3 flex items-center justify-between pt-2 border-t border-blush-100/80">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base md:text-lg font-bold text-[#7A1738]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Mobile / Direct Button */}
            <button
              onClick={() => addToCart(product, 1)}
              className="md:hidden flex items-center gap-1 bg-[#F8DDE5] hover:bg-[#D81B60] text-[#7A1738] hover:text-white px-2.5 py-1.5 rounded-full text-xs font-medium transition active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {showQuickView && (
        <QuickViewModal
          product={product}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
