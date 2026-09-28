import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import ProductCard from '../common/ProductCard';
import api from '../../services/api';
import { USE_DUMMY_DATA, getDummyBestSellers } from '../../data/dummyData';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const { data } = await api.get('/products/highlights');
        if (data.success && data.bestSellers?.length > 0) {
          setProducts(data.bestSellers);
        } else {
          // Fallback to top products
          const res = await api.get('/products?limit=8&sort=popular');
          if (res.data?.success && res.data.products?.length > 0) {
            setProducts(res.data.products);
          } else if (USE_DUMMY_DATA) {
            setProducts(getDummyBestSellers(8));
          } else {
            setProducts([]);
          }
        }
      } catch (err) {
        console.warn('Highlights fetch warning:', err.message);
        if (USE_DUMMY_DATA) {
          setProducts(getDummyBestSellers(8));
        } else {
          setProducts([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-[#FFF9F5] via-[#F8DDE5]/30 to-[#FFF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#D81B60] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1B20]">
              Best Selling Creations
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-lg">
              Our most cherished artisanal designs — each item individually poured and finished with golden warmth.
            </p>
          </div>

          <Link
            to="/shop?sort=popular"
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A1738] hover:text-[#D81B60] transition"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="rounded-3xl bg-blush-100/50 p-4 h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;
