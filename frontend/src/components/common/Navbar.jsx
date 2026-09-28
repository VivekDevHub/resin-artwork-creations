import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Sparkles,
  ShieldAlert,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import SearchBarModal from './SearchBarModal';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { itemCount, setIsCartOpen } = useCart();
  const { count: wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'Custom Orders', path: '/custom-orders', highlight: true },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFF9F5]/90 backdrop-blur-md border-b border-[#F4B6C2]/40 transition-all duration-300">
        {/* Top Luxury Announcement Bar */}
        <div className="bg-[#7A1738] text-[#FFF9F5] text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 text-center font-medium tracking-wide flex items-center justify-center gap-1.5 sm:gap-2">
          <Sparkles className="w-3 h-3 text-[#DFBA3C] shrink-0 animate-pulse" />
          <span className="sm:hidden truncate">🏆 #1 Resin Heirloom Studio in Indore ❤️ WhatsApp: +91 93290 28062</span>
          <span className="hidden sm:inline">🏆 #1 in Indore &bull; Heirloom Specialist (Varmala &bull; Clocks &bull; Tables &bull; Workshops) &bull; Owner: श्री सांवरिया सेठ ❤️ &bull; WhatsApp: +91 93290 28062</span>
          <Sparkles className="w-3 h-3 text-[#DFBA3C] shrink-0 animate-pulse" />
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 md:h-24">
            {/* Mobile Menu Button (visible on mobile and tablet < lg) */}
            <div className="flex items-center lg:hidden mr-1 sm:mr-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 sm:p-2 rounded-xl text-gray-700 hover:text-[#7A1738] hover:bg-blush-100 transition"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>

            {/* Brand Logo & Title */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 lg:flex-none min-w-0">
              <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
                <div className="relative w-9 h-9 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full overflow-hidden p-0.5 border-2 border-[#C9A227]/40 shadow-sm group-hover:scale-105 transition duration-300 bg-white shrink-0">
                  <img
                    src="/assets/logo.png"
                    alt="Resin Artwork Creations Logo"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=100&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-serif text-xs sm:text-lg md:text-2xl font-bold tracking-tight text-[#2B1B20] group-hover:text-[#7A1738] transition leading-tight truncate">
                    RESIN ARTWORK CREATIONS
                  </span>
                  <span className="font-script text-[11px] sm:text-sm md:text-lg text-[#7A1738] tracking-wider truncate">
                    By Mahima Choukse
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-all duration-200 relative py-1 ${
                      link.highlight
                        ? 'text-[#D81B60] font-semibold hover:text-[#7A1738]'
                        : isActive
                        ? 'text-[#7A1738] font-bold'
                        : 'text-gray-700 hover:text-[#7A1738]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7A1738] rounded-full" />
                      )}
                      {link.highlight && !isActive && (
                        <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-[#C9A227] rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3.5">
              {/* Search Icon */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2.5 rounded-full text-gray-700 hover:text-[#7A1738] hover:bg-blush-100 transition"
                title="Search Products"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="p-2.5 rounded-full text-gray-700 hover:text-[#D81B60] hover:bg-blush-100 transition relative"
                title="My Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D81B60] text-white text-[10px] font-bold flex items-center justify-center shadow">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2.5 rounded-full text-gray-700 hover:text-[#7A1738] hover:bg-blush-100 transition relative"
                title="Shopping Bag"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#7A1738] text-white text-[10px] font-bold flex items-center justify-center shadow">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* User Account Menu */}
              <div className="relative">
                {isAuthenticated ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-1.5 p-1.5 pr-2.5 rounded-full border border-blush-300 hover:border-[#7A1738] bg-white transition"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#F8DDE5] text-[#7A1738] font-bold text-xs flex items-center justify-center">
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                    </button>

                    {/* Dropdown Menu */}
                    {userDropdownOpen && (
                      <div
                        className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-blush-200 py-2 z-50 animate-fadeIn text-sm"
                        onMouseLeave={() => setUserDropdownOpen(false)}
                      >
                        <div className="px-4 py-2 border-b border-blush-100">
                          <p className="font-semibold text-gray-800 line-clamp-1">{user.name}</p>
                          <p className="text-xs text-gray-500 line-clamp-1">{user.email}</p>
                        </div>

                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-[#7A1738] hover:bg-blush-50 font-semibold"
                          >
                            <ShieldAlert className="w-4 h-4 text-[#C9A227]" />
                            <span>Admin Dashboard</span>
                          </Link>
                        )}

                        <Link
                          to="/account"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blush-50"
                        >
                          <User className="w-4 h-4" />
                          <span>My Account</span>
                        </Link>

                        <Link
                          to="/orders"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blush-50"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>My Orders</span>
                        </Link>

                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 text-left border-t border-blush-100 mt-1"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="hidden sm:inline-flex items-center gap-1.5 btn-secondary text-xs px-4 py-2"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FFF9F5] border-t border-blush-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl font-medium text-gray-800 hover:text-[#7A1738] hover:bg-blush-100 transition"
              >
                {link.name}
              </Link>
            ))}

            {!isAuthenticated && (
              <div className="pt-2 border-t border-blush-200 flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 btn-secondary text-xs py-2.5 text-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 btn-primary text-xs py-2.5 text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchBarModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
