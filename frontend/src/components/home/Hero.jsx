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

  // Auto advance slide every 5 seconds (gentle & relaxed)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

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
      className="relative bg-[#FFF9F5] overflow-hidden pt-2 sm:pt-6 pb-8 md:pb-14"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Main Showcase Carousel"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main Carousel Wrapper */}
        <div className="relative rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-xl border border-[#F4B6C2]/50 aspect-[4/5] sm:aspect-[16/10] md:aspect-[21/9] min-h-[460px] sm:min-h-[480px] md:min-h-[520px] bg-[#1C1215]">
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
                {/* 100% Sharp Background Image (NO blur filter, crystal clear artwork) */}
                <img
                  src={slide.desktopImage}
                  alt={slide.headline}
                  className={`w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/products/product-01.png';
                  }}
                />

                {/* Gentle directional gradient only at edges for text readability (NO dark center box!) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/30 md:to-transparent" />

                {/* Floating Top Badge (Clean & Subtle) */}
                <div className="absolute top-4 left-4 sm:top-7 sm:left-8 z-20 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[#7A1738] text-[10px] sm:text-xs font-bold tracking-wide shadow-md backdrop-blur-sm">
                    <Sparkles className="w-3 h-3 text-[#C9A227]" />
                    <span>{slide.tag}</span>
                  </span>
                  <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-[#DFBA3C] text-black text-[10px] font-bold uppercase tracking-wider shadow">
                    {slide.badge}
                  </span>
                </div>

                {/* Content Overlay: Anchored smoothly so the artwork remains 100% visible */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-12 lg:p-14 z-20">
                  <div className="max-w-xl text-left space-y-2 sm:space-y-3.5">
                    {/* Headline */}
                    <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
                      {slide.headline}
                    </h1>

                    {/* Subheading */}
                    <p className="text-xs sm:text-sm md:text-base text-rose-100 font-light leading-relaxed max-w-lg drop-shadow line-clamp-2 sm:line-clamp-3">
                      {slide.subheading}
                    </p>

                    {/* CTAs */}
                    <div className="pt-2 sm:pt-3 flex items-center gap-3">
                      <Link
                        to={slide.primaryBtn.link}
                        className="bg-[#D81B60] hover:bg-[#b0134b] text-white text-xs sm:text-sm font-bold px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                      >
                        <span>{slide.primaryBtn.text}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <Link
                        to={slide.secondaryBtn.link}
                        className="bg-white/20 hover:bg-white/35 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-full backdrop-blur-md border border-white/40 hover:border-white transition-all flex items-center gap-1.5"
                      >
                        <span>{slide.secondaryBtn.text}</span>
                      </Link>
                    </div>

                    {/* Location & Trust Subtext */}
                    <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#DFBA3C] pt-1 font-medium drop-shadow">
                      <Heart className="w-3.5 h-3.5 fill-[#D81B60] text-[#D81B60]" />
                      <span>{slide.accentText}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Sleek Floating Arrow Controls (Desktop & Mobile) */}
          <button
            onClick={handlePrev}
            className="absolute left-2.5 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all active:scale-90 shadow-md"
            title="Previous Slide"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2.5 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all active:scale-90 shadow-md"
            title="Next Slide"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          {/* Clean Pagination Pill Indicators */}
          <div className="absolute bottom-3 sm:bottom-6 right-4 sm:right-10 z-30 flex items-center gap-1.5 sm:gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? 'w-6 bg-[#DFBA3C]'
                    : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
                title={`Go to slide ${idx + 1}`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
            <span className="text-[10px] text-white/90 font-mono font-medium ml-1">
              0{currentSlide + 1}/0{heroSlides.length}
            </span>
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
