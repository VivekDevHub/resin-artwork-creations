import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import api from '../services/api';
import { getDummyCategories, USE_DUMMY_DATA } from '../data/dummyData';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        if (data.success && data.categories?.length > 0) {
          setCategories(data.categories);
        } else if (USE_DUMMY_DATA) {
          setCategories(getDummyCategories());
        }
      } catch (err) {
        console.warn('Error fetching categories:', err.message);
        if (USE_DUMMY_DATA) {
          setCategories(getDummyCategories());
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blush-100 text-[#7A1738] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>Curated Collections</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1B20]">
            Artisan Categories
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Explore our handcrafted collections designed to bring luxury, floral preservation, and warm memories into your home.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="rounded-3xl bg-blush-100/50 h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/shop?category=${cat.slug}`}
                className="group bg-white rounded-3xl overflow-hidden border border-[#F4B6C2]/50 shadow-soft hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-blush-50">
                  <img
                    src={cat.image || '/assets/products/product-01.png'}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-md text-[#7A1738] text-xs font-bold px-3 py-1 rounded-full shadow">
                    {cat.itemCount || 0} Pieces Available
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#2B1B20] group-hover:text-[#7A1738] transition mb-2">
                      {cat.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-blush-100 flex items-center justify-between text-xs font-semibold text-[#7A1738]">
                    <span>Explore Products</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
