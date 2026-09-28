import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, SlidersHorizontal, Search, RefreshCw, Sparkles } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import api from '../services/api';

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest Arrivals', value: 'newest' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Top Customer Rating', value: 'rating' }
];

const priceRanges = [
  { label: 'All Prices', min: '', max: '' },
  { label: 'Under ₹500', min: '0', max: '500' },
  { label: '₹500 - ₹1,000', min: '500', max: '1000' },
  { label: '₹1,000 - ₹2,000', min: '1000', max: '2000' },
  { label: 'Above ₹2,000', min: '2000', max: '10000' }
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter States from URL or Defaults
  const currentCategory = searchParams.get('category') || 'all';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'featured';
  const currentMinPrice = searchParams.get('minPrice') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '';
  const currentRating = searchParams.get('rating') || '';

  // Fetch Categories once
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const { data } = await api.get('/categories');
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (err) {
        console.warn('Could not fetch categories:', err.message);
      }
    };
    fetchCats();
  }, []);

  // Fetch Products whenever query params change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (currentCategory && currentCategory !== 'all') params.append('category', currentCategory);
        if (currentSearch) params.append('search', currentSearch);
        if (currentSort) params.append('sort', currentSort);
        if (currentMinPrice) params.append('minPrice', currentMinPrice);
        if (currentMaxPrice) params.append('maxPrice', currentMaxPrice);
        if (currentRating) params.append('rating', currentRating);
        params.append('limit', '30');

        const { data } = await api.get(`/products?${params.toString()}`);
        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.warn('Error fetching shop products:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentCategory, currentSearch, currentSort, currentMinPrice, currentMaxPrice, currentRating]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === 'all') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const handlePriceRangeSelect = (min, max) => {
    const newParams = new URLSearchParams(searchParams);
    if (min) newParams.set('minPrice', min);
    else newParams.delete('minPrice');

    if (max) newParams.set('maxPrice', max);
    else newParams.delete('maxPrice');

    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const activeFiltersCount = [
    currentCategory !== 'all' ? currentCategory : null,
    currentSearch || null,
    currentMinPrice || currentMaxPrice ? 'price' : null,
    currentRating || null
  ].filter(Boolean).length;

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span>Home</span>
            <span>&bull;</span>
            <span className="text-[#7A1738] font-semibold">Artisan Shop</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#2B1B20]">
                {currentCategory !== 'all'
                  ? categories.find((c) => c.slug === currentCategory)?.name || 'Resin Creations'
                  : currentSearch
                  ? `Search results for "${currentSearch}"`
                  : 'Complete Boutique Catalog'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Showing {products.length} handcrafted resin art pieces from our Indore atelier.
              </p>
            </div>

            {/* Mobile Filter Button & Desktop Sort Select */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-blush-300 text-xs font-semibold text-[#7A1738] shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
              </button>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500 hidden sm:inline">Sort By:</span>
                <select
                  value={currentSort}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-blush-300 text-xs font-medium text-gray-800 focus:outline-none focus:border-[#7A1738]"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Pills */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-blush-200">
              <span className="text-xs text-gray-400">Active Filters:</span>
              {currentCategory !== 'all' && (
                <span className="badge-rose text-xs flex items-center gap-1">
                  Category: {currentCategory}
                  <button onClick={() => updateFilter('category', 'all')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {currentSearch && (
                <span className="badge-rose text-xs flex items-center gap-1">
                  Search: "{currentSearch}"
                  <button onClick={() => updateFilter('search', '')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {(currentMinPrice || currentMaxPrice) && (
                <span className="badge-rose text-xs flex items-center gap-1">
                  Price Filter
                  <button onClick={() => handlePriceRangeSelect('', '')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {currentRating && (
                <span className="badge-rose text-xs flex items-center gap-1">
                  {currentRating}★ & above
                  <button onClick={() => updateFilter('rating', '')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#D81B60] hover:underline font-semibold ml-2"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block bg-white rounded-3xl p-6 border border-blush-200 shadow-soft space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-blush-100">
              <h3 className="font-serif font-bold text-lg text-[#2B1B20] flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#7A1738]" />
                Filter Catalog
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#D81B60] hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Categories Filter */}
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Categories
              </h4>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                <button
                  onClick={() => updateFilter('category', 'all')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition ${
                    currentCategory === 'all'
                      ? 'bg-[#F8DDE5] text-[#7A1738] font-bold'
                      : 'text-gray-600 hover:bg-blush-50'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => updateFilter('category', cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                      currentCategory === cat.slug
                        ? 'bg-[#F8DDE5] text-[#7A1738] font-bold'
                        : 'text-gray-600 hover:bg-blush-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {cat.itemCount > 0 && (
                      <span className="text-[10px] text-gray-400">({cat.itemCount})</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-blush-100">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Price Range
              </h4>
              <div className="space-y-1.5">
                {priceRanges.map((p, idx) => {
                  const isSelected =
                    currentMinPrice === p.min && currentMaxPrice === p.max;
                  return (
                    <button
                      key={idx}
                      onClick={() => handlePriceRangeSelect(p.min, p.max)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition ${
                        isSelected
                          ? 'bg-[#F8DDE5] text-[#7A1738] font-bold'
                          : 'text-gray-600 hover:bg-blush-50'
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="pt-4 border-t border-blush-100">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Customer Rating
              </h4>
              <div className="space-y-1.5">
                {['', '4.5', '4.0'].map((rate, idx) => (
                  <button
                    key={idx}
                    onClick={() => updateFilter('rating', rate)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition ${
                      currentRating === rate
                        ? 'bg-[#F8DDE5] text-[#7A1738] font-bold'
                        : 'text-gray-600 hover:bg-blush-50'
                    }`}
                  >
                    {rate ? `${rate}★ & Above` : 'All Ratings'}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Listing Area */}
          <main className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="rounded-3xl bg-blush-100/50 p-4 h-80 animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-blush-200">
                <Sparkles className="w-12 h-12 text-[#C9A227] mx-auto mb-4 stroke-1" />
                <h3 className="font-serif text-2xl font-bold text-[#2B1B20] mb-2">
                  No creations match your filter criteria
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                  Try adjusting or clearing your filters, or request a custom order for a bespoke creation tailored to your exact desires.
                </p>
                <div className="flex justify-center gap-3">
                  <button onClick={clearAllFilters} className="btn-secondary text-xs px-5 py-2.5">
                    Clear All Filters
                  </button>
                  <a href="/custom-orders" className="btn-primary text-xs px-5 py-2.5">
                    Request Custom Order
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal / Bottom Sheet */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#FFF9F5] rounded-t-3xl sm:rounded-3xl max-h-[85vh] overflow-y-auto p-6 border border-blush-200 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-blush-200">
              <h3 className="font-serif font-bold text-xl text-[#2B1B20]">Filter Products</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div className="py-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">
                Categories
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateFilter('category', 'all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                    currentCategory === 'all'
                      ? 'bg-[#7A1738] text-white border-[#7A1738]'
                      : 'bg-white text-gray-700 border-blush-200'
                  }`}
                >
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c._id}
                    onClick={() => updateFilter('category', c.slug)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                      currentCategory === c.slug
                        ? 'bg-[#7A1738] text-white border-[#7A1738]'
                        : 'bg-white text-gray-700 border-blush-200'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Ranges */}
            <div className="py-4 border-t border-blush-100">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">
                Price Range
              </h4>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePriceRangeSelect(p.min, p.max)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                      currentMinPrice === p.min && currentMaxPrice === p.max
                        ? 'bg-[#7A1738] text-white border-[#7A1738]'
                        : 'bg-white text-gray-700 border-blush-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply & Close */}
            <div className="pt-4 border-t border-blush-200 flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 btn-secondary text-xs py-3"
              >
                Clear All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 btn-primary text-xs py-3"
              >
                View {products.length} Products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
