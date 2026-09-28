import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

const FeaturedCollection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FFF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#F8DDE5]/60 via-[#FFF9F5] to-[#F4B6C2]/30 rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#F4B6C2]/60 shadow-xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Mosaic */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/5] border border-white">
                  <img
                    src="/assets/products/product-10.jpg"
                    alt="Bridal Varmala & Chooda Heirloom Frame"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md aspect-square border border-white">
                  <img
                    src="/assets/products/product-02.jpg"
                    alt="Handcrafted Pastel Modak Candles"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="rounded-2xl overflow-hidden shadow-md aspect-square border border-white">
                  <img
                    src="/assets/products/product-01.png"
                    alt="Ganesha Pooja Thali & Diya Set"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/5] border border-white">
                  <img
                    src="/assets/products/product-15.jpg"
                    alt="Royal Maroon & Gold Wedding Invitation Plaque"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Text & Story */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#7A1738] text-xs font-semibold shadow-sm border border-blush-200">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>Indore Studio Signature Edition</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B1B20] leading-tight">
                Preserving Memories in Liquid Crystal
              </h2>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Each creation in our signature collection represents 48 to 72 hours of multi-layered casting, precision botanical dehydration, and diamond-grade hand polishing.
              </p>

              <div className="space-y-3 pt-2 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D81B60] shrink-0" />
                  <span>High-clarity epoxy that locks natural flower colors forever</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D81B60] shrink-0" />
                  <span>Infused with 24K real gold foil and raw rose quartz crystals</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D81B60] shrink-0" />
                  <span>Shipped securely in drop-tested luxury gift boxes</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link to="/shop" className="btn-primary text-sm px-7 py-3.5">
                  <span>Explore All Artworks</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/about" className="btn-secondary text-sm px-6 py-3.5">
                  Meet Mahima Choukse
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
