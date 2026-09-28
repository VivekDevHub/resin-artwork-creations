import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import BottomNavigation from '../components/common/BottomNavigation';
import Footer from '../components/common/Footer';
import CartDrawer from '../components/common/CartDrawer';
import WhatsAppFloat from '../components/common/WhatsAppFloat';

const RootLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#F4B6C2] selection:text-[#7A1738]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <BottomNavigation />
      <WhatsAppFloat />
    </div>
  );
};

export default RootLayout;
