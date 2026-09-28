import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Sparkles,
  Users,
  BarChart3,
  Store,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Products', path: '/admin/products', icon: Package },
  { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
  { name: 'Custom Orders', path: '/admin/custom-orders', icon: Sparkles },
  { name: 'Customers', path: '/admin/customers', icon: Users },
  { name: 'Analytics & Coupons', path: '/admin/analytics', icon: BarChart3 },
];

const AdminLayout = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#2B1B20] text-white flex flex-col justify-between shrink-0 shadow-xl border-r border-[#7A1738]/50">
        <div>
          {/* Atelier Brand Header */}
          <div className="p-6 border-b border-white/10">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#DFBA3C] bg-white p-0.5 shrink-0">
                <img src="/assets/logo.png" alt="" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <h1 className="font-serif font-bold text-sm tracking-wide text-white leading-tight">
                  RESIN ARTWORK
                </h1>
                <span className="font-script text-xs text-[#DFBA3C]">Admin Studio</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition ${
                      isActive
                        ? 'bg-[#7A1738] text-white shadow-md'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-[#DFBA3C]" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition"
          >
            <Store className="w-4 h-4 text-[#DFBA3C]" />
            <span>View Public Store</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-medium text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-blush-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
            <span>Indore Studio Admin Panel &bull; Live Connected Database</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-700 hidden sm:inline">
              {user?.name || 'Mahima Choukse'}
            </span>
            <div className="w-8 h-8 rounded-full bg-[#F8DDE5] text-[#7A1738] font-bold text-xs flex items-center justify-center border border-blush-300">
              M
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
