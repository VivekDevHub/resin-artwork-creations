import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const categories = [
  {
    name: 'Pooja Decor & Thali Sets',
    slug: 'resin-art',
    image: '/assets/products/product-01.png',
    tagline: 'Resin Ganesha, Diyas & Floral Thalis'
  },
  {
    name: 'Heirloom & Varmala Frames',
    slug: 'personalized-gifts',
    image: '/assets/products/product-10.jpg',
    tagline: 'Preserved Wedding Garlands & Kaleere'
  },
  {
    name: 'Modak & Festive Candles',
    slug: 'candles',
    image: '/assets/products/product-02.jpg',
    tagline: 'Pastel Handcrafted Soy Wax & Gold Leaf'
  },
  {
    name: 'Pet Memorial Keepsakes',
    slug: 'resin-gifts',
    image: '/assets/products/product-18.jpg',
    tagline: 'Fur, Whisker & Paw Print Resin Lockets'
  },
  {
    name: 'Invitation Plaques & Geode Art',
    slug: 'clocks',
    image: '/assets/products/product-15.jpg',
    tagline: 'Royal Maroon & Gold Bespoke Wall Keepsakes'
  },
  {
    name: 'Curated Festive Hampers',
    slug: 'gift-hampers',
    image: '/assets/products/product-03.jpg',
    tagline: 'Handcrafted Box Sets & Artisan Candles'
  },
  {
    name: 'Handmade Floral Rakhis',
    slug: 'hand-casting',
    image: '/assets/products/product-25.jpg',
    tagline: 'Resin Flower Charms & Bhaiya-Bhabhi Loomba'
  },
  {
    name: 'Winter Holiday Collection',
    slug: 'handmade-soaps',
    image: '/assets/products/product-06.jpg',
    tagline: 'Pine Trees, Gingerbread & Snowflakes'
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 md:py-20 bg-[#FFF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#D81B60] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Discover the Collection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1B20]">
              Featured Categories
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-lg">
              Explore bespoke handcrafted collections created with pure epoxy resin, natural botanicals and gold leaf accents.
            </p>
          </div>

          <Link
            to="/categories"
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A1738] hover:text-[#D81B60] transition"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={`/shop?category=${cat.slug}`}
              className="group relative rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-500 bg-white border border-[#F4B6C2]/40"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B20]/80 via-[#2B1B20]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-[#DFBA3C] font-semibold block mb-0.5">
                    {cat.tagline}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#F8DDE5] transition">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
