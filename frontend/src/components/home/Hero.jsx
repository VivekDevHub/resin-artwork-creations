import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Truck,
  ShieldCheck,
  Star,
  Award
} from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    tag: 'Signature Indore Atelier',
    headline: 'Handcrafted Resin Art, Made With Love',
    subheading: 'Bespoke geode creations, liquid crystal tables, and preserved memories — crafted individually for you by Mahima Choukse.',
    primaryBtn: { text: 'Shop Boutique', link: '/shop' },
    secondaryBtn: { text: 'Custom Order', link: '/custom-orders' },
    desktopImage: '/assets/hero-resin-art.jpg',
    mobileImage: '/assets/hero-resin-art.jpg',
    accentText: 'Indore, MP • #1 Heirloom Atelier',
    badge: 'Artisan Collection'
  },
  {
    id: 2,
    tag: 'Wedding & Milestone Keepsakes',
    headline: 'Preserved Wedding Flower Frames',
    subheading: 'Lock your sacred varmala petals and wedding roses forever in museum-grade, non-yellowing crystal clear epoxy.',
    primaryBtn: { text: 'Preserve Your Flowers', link: '/custom-orders' },
    secondaryBtn: { text: 'View Keepsakes', link: '/shop?category=personalized-gifts' },
    desktopImage: '/assets/hero-varmala-preservation.jpg',
    mobileImage: '/assets/hero-varmala-preservation.jpg',
    accentText: '2,000+ Memories Preserved',
    badge: 'Varmala Specialist'
  },
  {
    id: 3,
    tag: 'Statement Wall Decor',
    headline: 'Bespoke Geode Wall Clocks',
    subheading: 'Infused with authentic raw crystals, shimmering liquid gold veins, and silent precision clockwork movements.',
    primaryBtn: { text: 'Explore Clocks', link: '/shop?category=clocks' },
    secondaryBtn: { text: 'Custom Clock Order', link: '/custom-orders' },
    desktopImage: '/assets/hero-geode-clock.jpg',
    mobileImage: '/assets/hero-geode-clock.jpg',
    accentText: 'Real Quartz & Liquid Gold',
    badge: 'Best Seller'
  },
  {
    id: 4,
    tag: 'Curated Celebrations',
    headline: 'Artisanal Hampers & Modak Candles',
    subheading: 'Luxury gifting boxes featuring pure soy wax floral candles with 24K gold foil, resin coasters, and velvet packaging.',
    primaryBtn: { text: 'Shop Festive Gifts', link: '/shop?category=gift-hampers' },
    secondaryBtn: { text: 'Custom Hamper Inquiry', link: '/custom-orders' },
    desktopImage: '/assets/hero-festive-hamper.jpg',
    mobileImage: '/assets/hero-festive-hamper.jpg',
    accentText: 'Hand-Poured Soy Wax & 24K Gold',
    badge: 'Festive Delight'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  // Auto advance slide every 3 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 2800);

    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative bg-[#FFF9F5] overflow-hidden pt-3 sm:pt-6 pb-12 md:pb-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Main Showcase Carousel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Carousel Wrapper Card */}
        <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#F4B6C2]/60 min-h-[520px] sm:min-h-[560px] md:min-h-[600px] flex items-center bg-[#2B1B20]">
          {/* Carousel Slides */}
          {heroSlides.map((slide, idx) => {
            const isActive = idx === currentSlide;

            return (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                  isActive
                    ? 'opacity-100 z-10 pointer-events-auto visible'
                    : 'opacity-0 pointer-events-none invisible -z-10'
                }`}
              >
                {/* Background Image / Banner */}
                <picture className="w-full h-full">
                  <source media="(max-width: 767px)" srcSet={slide.mobileImage} />
                  <source media="(min-width: 768px)" srcSet={slide.desktopImage} />
                  <img
                    src={slide.desktopImage}
                    alt={slide.headline}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/products/product-01.png';
                    }}
                  />
                </picture>

                {/* Subtle Cinematic Vignette for maximum image beauty */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 md:bg-gradient-to-r md:from-black/60 md:via-black/25 md:to-transparent" />

                {/* Slide Text Content inside Frosted Luxury Glass Card */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-14 py-8 md:py-0">
                    <div className="max-w-xl lg:max-w-xl bg-black/60 md:bg-black/55 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl text-left space-y-4 sm:space-y-5 text-white">
                      {/* Tag & Badge */}
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#DFBA3C] text-[11px] sm:text-xs font-semibold border border-[#DFBA3C]/40">
                          <Sparkles className="w-3.5 h-3.5 text-[#DFBA3C]" />
                          <span>{slide.tag}</span>
                        </span>
                        <span className="badge-gold text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                          {slide.badge}
                        </span>
                      </div>

                      {/* Headline */}
                      <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.2]">
                        {slide.headline.split(',')[0]}
                        {slide.headline.includes(',') && (
                          <span className="block italic font-normal font-serif text-[#F4B6C2] mt-1">
                            {slide.headline.split(',').slice(1).join(',')}
                          </span>
                        )}
                      </h1>

                      {/* Subheading */}
                      <p className="text-xs sm:text-sm md:text-base text-rose-100/90 leading-relaxed">
                        {slide.subheading}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                        <Link
                          to={slide.primaryBtn.link}
                          className="btn-primary text-xs sm:text-sm px-6 py-3 font-bold shadow-xl flex items-center justify-center gap-2 group"
                        >
                          <span>{slide.primaryBtn.text}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                        </Link>

                        <Link
                          to={slide.secondaryBtn.link}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-white border border-white/40 hover:bg-white/20 backdrop-blur-md transition text-xs sm:text-sm"
                        >
                          <Sparkles className="w-4 h-4 text-[#DFBA3C]" />
                          <span>{slide.secondaryBtn.text}</span>
                        </Link>
                      </div>

                      {/* Floating Accent Stamp */}
                      <div className="pt-1 text-[11px] sm:text-xs text-[#DFBA3C] flex items-center gap-2 font-medium">
                        <Heart className="w-3.5 h-3.5 fill-[#D81B60] text-[#D81B60]" />
                        <span>{slide.accentText}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Navigation Controls: Arrow Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105 shadow-lg"
            title="Previous Slide"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105 shadow-lg"
            title="Next Slide"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Pagination Indicators & Counter */}
          <div className="absolute bottom-5 sm:bottom-8 inset-x-0 z-20 flex items-center justify-center gap-3">
            <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-3">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx === currentSlide
                      ? 'w-7 bg-gradient-to-r from-[#DFBA3C] to-[#D81B60]'
                      : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                  title={`Go to slide ${idx + 1}`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}

              <span className="text-[10px] text-white/80 font-mono font-medium ml-1">
                0{currentSlide + 1} / 0{heroSlides.length}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Boutique Trust Strip */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-2xl p-3.5 border border-[#F4B6C2]/40 shadow-soft flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blush-100 text-[#7A1738] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#C9A227]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#2B1B20]">100% Handcrafted</p>
              <p className="text-[11px] text-gray-500">Poured in Indore studio</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-[#F4B6C2]/40 shadow-soft flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blush-100 text-[#7A1738] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-[#C9A227]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#2B1B20]">Free Shipping</p>
              <p className="text-[11px] text-gray-500">On all orders above ₹999</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-[#F4B6C2]/40 shadow-soft flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blush-100 text-[#7A1738] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#C9A227]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#2B1B20]">500+ Bespoke Gifts</p>
              <p className="text-[11px] text-gray-500">Custom names & flowers</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-[#F4B6C2]/40 shadow-soft flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blush-100 text-[#7A1738] flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 fill-[#C9A227] text-[#C9A227]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#2B1B20]">4.9★ Client Rating</p>
              <p className="text-[11px] text-gray-500">Verified patron reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
