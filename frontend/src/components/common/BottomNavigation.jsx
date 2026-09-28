import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, Heart, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const BottomNavigation = () => {
  const { itemCount, setIsCartOpen } = useCart();
  const { count: wishlistCount } = useWishlist();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFF9F5]/95 backdrop-blur-lg border-t border-blush-200 px-3 py-2 shadow-2xl"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around">
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 p-1 transition ${
              isActive ? 'text-[#7A1738] font-bold' : 'text-gray-500'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </NavLink>

        {/* Shop / Categories */}
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 p-1 transition ${
              isActive ? 'text-[#7A1738] font-bold' : 'text-gray-500'
            }`
          }
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px]">Shop</span>
        </NavLink>

        {/* Wishlist */}
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `relative flex flex-col items-center gap-1 p-1 transition ${
              isActive ? 'text-[#D81B60] font-bold' : 'text-gray-500'
            }`
          }
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#D81B60] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Wishlist</span>
        </NavLink>

        {/* Cart Drawer Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 p-1 text-gray-500 hover:text-[#7A1738] transition"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#7A1738] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Bag</span>
        </button>

        {/* Account */}
        <NavLink
          to="/account"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 p-1 transition ${
              isActive ? 'text-[#7A1738] font-bold' : 'text-gray-500'
            }`
          }
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Account</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavigation;
