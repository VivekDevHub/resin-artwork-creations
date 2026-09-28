import React from 'react';
import { Instagram, Heart } from 'lucide-react';

const galleryImages = [
  {
    url: '/assets/products/product-09.jpg',
    title: 'Bridal Varmala & Chooda Keepsake Frame'
  },
  {
    url: '/assets/products/product-01.png',
    title: 'Ganesha Pooja Thali & Diya Set'
  },
  {
    url: '/assets/products/product-03.jpg',
    title: 'Pastel Handcrafted Modak Candle Hamper'
  },
  {
    url: '/assets/products/product-15.jpg',
    title: 'Royal Maroon & Gold Geode Wedding Plaque'
  },
  {
    url: '/assets/products/product-18.jpg',
    title: 'Custom Pet Fur & Paw Memorial Locket'
  },
  {
    url: '/assets/products/product-25.jpg',
    title: 'Handcrafted Resin Floral Rakhi'
  }
];

const SocialGallery = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-[#FFF9F5] to-[#F8DDE5]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <a
            href="https://www.instagram.com/resin_artworkk_creations?igsh=eHk5N2pianpseXQy&utm_source=qr"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D81B60] uppercase tracking-wider mb-2 hover:underline"
          >
            <Instagram className="w-4 h-4" />
            <span>@resin_artworkk_creations</span>
          </a>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1B20]">
            Follow Our Creative Journey
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            🏆 #1 in Indore &bull; Behind the scenes from our Indore studio. Tag us in your stories to be featured.
          </p>
        </div>

        {/* 6-image grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {galleryImages.map((img, idx) => (
            <a
              key={idx}
              href="https://www.instagram.com/resin_artworkk_creations?igsh=eHk5N2pianpseXQy&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-blush-200 block"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#7A1738]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-3 text-center">
                <Instagram className="w-6 h-6 mb-1 text-[#DFBA3C]" />
                <span className="text-[11px] font-medium line-clamp-2">{img.title}</span>
                <span className="text-[10px] text-rose-200 mt-1 flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-rose-200" /> Resin Art
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialGallery;
