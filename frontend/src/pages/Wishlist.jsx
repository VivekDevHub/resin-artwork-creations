import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToBag = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product._id);
  };

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 text-[#D81B60] text-xs font-semibold mb-2">
            <Heart className="w-3.5 h-3.5 fill-[#D81B60]" />
            <span>Saved Creations</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1B20]">
            My Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-10 text-center border border-blush-200 shadow-soft">
            <div className="w-16 h-16 rounded-full bg-blush-100 flex items-center justify-center mx-auto text-[#D81B60] mb-4">
              <Heart className="w-8 h-8 stroke-1" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#2B1B20] mb-2">Your Wishlist is Empty</h2>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Explore our handcrafted collections and click the heart icon on any piece you'd like to save.
            </p>
            <Link to="/shop" className="btn-primary text-xs px-6 py-3">
              <span>Explore Boutique</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-3xl p-3 border border-[#F4B6C2]/40 shadow-soft flex flex-col justify-between"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-blush-50 mb-3">
                  <Link to={`/product/${item.slug || item._id}`}>
                    <img
                      src={item.images?.[0] || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80'}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/90 text-gray-400 hover:text-rose-600 rounded-full flex items-center justify-center shadow"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#D81B60] font-semibold">
                      {item.categoryName || 'Resin Art'}
                    </span>
                    <Link
                      to={`/product/${item.slug || item._id}`}
                      className="font-serif text-base font-bold text-[#2B1B20] hover:text-[#7A1738] block line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-bold text-[#7A1738] text-base">
                        ₹{item.price?.toLocaleString('en-IN')}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{item.originalPrice?.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleMoveToBag(item)}
                    className="w-full btn-primary text-xs py-2.5 flex items-center justify-center gap-1.5 mt-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
