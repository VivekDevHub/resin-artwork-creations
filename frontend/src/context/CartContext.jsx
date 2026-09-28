import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('resin_art_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('resin_art_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    localStorage.setItem('resin_art_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('resin_art_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('resin_art_coupon');
    }
  }, [appliedCoupon]);

  const addToCart = (product, quantity = 1, customizationText = '') => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product._id === product._id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (customizationText) {
          updated[existingIndex].customizationText = customizationText;
        }
        return updated;
      } else {
        return [
          ...prev,
          {
            product: {
              _id: product._id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              originalPrice: product.originalPrice,
              images: product.images,
              stock: product.stock,
              categoryName: product.categoryName || product.category?.name || 'Resin Art'
            },
            quantity,
            customizationText
          }
        ];
      }
    });

    toast.success(`"${product.name}" added to your bag!`);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product._id !== productId));
    toast.info('Item removed from your shopping bag');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    localStorage.removeItem('resin_art_cart');
    localStorage.removeItem('resin_art_coupon');
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const shippingFee = subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 79;

  let discount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.discountPercent) {
      const calc = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
      discount = appliedCoupon.maxDiscount ? Math.min(calc, appliedCoupon.maxDiscount) : calc;
    } else if (appliedCoupon.discountAmount) {
      discount = appliedCoupon.discountAmount;
    }
  }

  const totalAmount = Math.max(0, subtotal - discount + shippingFee);

  const applyCoupon = async (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    try {
      const { data } = await api.post('/coupons/validate', {
        code: cleanCode,
        orderAmount: subtotal
      });
      if (data.success) {
        setAppliedCoupon(data.coupon);
        toast.success(data.message || `Coupon ${data.coupon.code} applied!`);
        return { success: true };
      }
    } catch (err) {
      // Graceful fallback for known boutique coupons when backend is offline
      const validCoupons = {
        'WELCOME10': { code: 'WELCOME10', discountPercent: 10, maxDiscount: 500, minOrderValue: 799 },
        'MAHIMA15': { code: 'MAHIMA15', discountPercent: 15, maxDiscount: 1000, minOrderValue: 1499 },
        'FESTIVE20': { code: 'FESTIVE20', discountPercent: 20, maxDiscount: 1200, minOrderValue: 2499 }
      };

      const found = validCoupons[cleanCode];
      if (found) {
        if (subtotal < found.minOrderValue) {
          const msg = `Minimum cart value of ₹${found.minOrderValue} required for ${found.code}`;
          toast.error(msg);
          return { success: false, message: msg };
        }
        setAppliedCoupon(found);
        toast.success(`Coupon ${found.code} applied! (${found.discountPercent}% OFF)`);
        return { success: true };
      }

      toast.error('Invalid coupon code. Try WELCOME10, MAHIMA15 or FESTIVE20');
      return { success: false, message: 'Invalid coupon' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.info('Coupon removed');
  };

  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        shippingFee,
        discount,
        totalAmount,
        itemCount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
