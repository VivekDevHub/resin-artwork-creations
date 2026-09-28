import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ArrowRight, Star, MessageCircle } from 'lucide-react';

const AboutMeSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#FFF9F5] via-white to-[#FFF9F5] border-t border-blush-200/40 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#F4B6C2]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-[#DFBA3C]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Artist Portrait Column */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#7A1738]/20 via-[#DFBA3C]/30 to-[#F4B6C2]/40 rounded-3xl blur-lg opacity-70" />
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-blush-50 group">
                
                
                
                <img
                  src="/assets/mahima-artist.jpeg"
                  alt="Mahima Choukse - Founder and Resin Artist"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/carousel-1.png';
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B20]/90 via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227] text-[#2B1B20] text-[11px] font-bold shadow-sm mb-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>#Top1 Resin Artist in Indore</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#FFF9F5]">Mahima Choukse</h3>
                  <p className="text-xs text-rose-200">
                    Founder & Artist &bull; 4+ Years &bull; 2000+ Keepsakes Preserved
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Story Content Column */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blush-100 text-[#7A1738] text-xs font-bold border border-blush-200/60 shadow-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>🏆 #1 in Indore | Heirloom Specialist | Varmala | Clocks | Tables | Workshops</span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1B20] leading-tight">
                From a Small Dream to a Creative Journey ✨
              </h2>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#7A1738] mt-2">
                <span>Owner: <strong>श्री सांवरिया सेठ ❤️</strong></span>
                <span>&bull;</span>
                <span>Founder & Resin Artist: <strong>Mahima Choukse</strong></span>
              </div>
              
              <p className="font-serif italic text-base sm:text-lg text-[#7A1738] mt-3">
                "Hi, I’m Mahima Choukse, founder and resin artist behind Resin Artwork Creations by Mahima Choukse, proudly based in Indore, Madhya Pradesh."
              </p>
            </div>

            <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
              <p>
                Four years ago, I started this journey with a simple love for creativity and a dream of building something of my own. I didn’t have everything figured out—I learned along the way.
              </p>
              
              <p>
                I made mistakes. I tried, failed, experimented, started again, and discovered something new with every creation. What began as a small passion has now grown into a beautiful journey with <strong>2000+ varmala preservations</strong> and countless memories preserved over the years.
              </p>

              {/* Emotional Quote Snippet */}
              <div className="p-4 sm:p-5 rounded-2xl bg-blush-50 border border-blush-200/70 flex items-start gap-3">
                <Heart className="w-5 h-5 text-[#D81B60] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-gray-800 italic">
                  “For me, resin art has never been just about creating something beautiful. It is about preserving emotions. A wedding flower, a varmala, a piece of jewellery, or a tiny keepsake can hold an entire memory—and my work is about giving those memories a forever place.”
                </p>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-[#7A1738]">
                #Top1ResinArtistInIndore | Preserving Memories, Creating Forever
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link to="/about" className="btn-primary text-sm px-7 py-3.5 shadow-md">
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link to="/custom-orders" className="btn-secondary text-sm px-6 py-3.5">
                Preserve Your Varmala
              </Link>

              <a
                href="https://wa.me/919329028062?text=Hello%20Mahima,%20I%20read%20your%20story%20and%20would%20love%20to%20commission%20a%20piece!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition py-2 px-3 rounded-lg hover:bg-emerald-50"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp (+91 93290 28062)</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
