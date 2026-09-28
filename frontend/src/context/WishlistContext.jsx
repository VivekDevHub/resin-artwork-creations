import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('resin_art_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Fetch wishlist from backend if authenticated
  useEffect(() => {
    const fetchRemoteWishlist = async () => {
      if (!isAuthenticated) return;
      try {
        const { data } = await api.get('/wishlist');
        if (data.success && Array.isArray(data.wishlist)) {
          setWishlist(data.wishlist);
          localStorage.setItem('resin_art_wishlist', JSON.stringify(data.wishlist));
        }
      } catch (err) {
        console.warn('Could not sync remote wishlist:', err.message);
      }
    };

    fetchRemoteWishlist();
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('resin_art_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  const toggleWishlist = async (product) => {
    const exists = isInWishlist(product._id);
    if (exists) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const addToWishlist = async (product) => {
    const productItem = {
      _id: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      originalPrice: product.originalPrice,
      discountPercentage: product.discountPercentage,
      images: product.images,
      rating: product.rating,
      categoryName: product.categoryName || product.category?.name || 'Resin Art'
    };

    setWishlist((prev) => [...prev.filter((p) => p._id !== product._id), productItem]);
    toast.success(`"${product.name}" saved to your wishlist!`);

    if (isAuthenticated) {
      try {
        await api.post('/wishlist', { productId: product._id });
      } catch (err) {
        console.warn('Failed to sync wishlist with backend:', err.message);
      }
    }
  };

  const removeFromWishlist = async (productId) => {
    setWishlist((prev) => prev.filter((p) => p._id !== productId));
    toast.info('Item removed from wishlist');

    if (isAuthenticated) {
      try {
        await api.delete(`/wishlist/${productId}`);
      } catch (err) {
        console.warn('Failed to remove from remote wishlist:', err.message);
      }
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        count: wishlist.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
