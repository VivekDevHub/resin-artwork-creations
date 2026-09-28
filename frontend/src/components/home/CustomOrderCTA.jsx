import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, Heart } from 'lucide-react';

const CustomOrderCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-[#7A1738] via-[#5C102A] to-[#2B1B20] text-white relative overflow-hidden">
      {/* Decorative Shimmers */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DFBA3C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D81B60]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#DFBA3C]/40 text-xs font-semibold text-[#DFBA3C] backdrop-blur-md">
          <Sparkles className="w-4 h-4" />
          <span>Bespoke Commission Studio</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          Have Something Special In Mind?
        </h2>

        <p className="text-base sm:text-lg text-rose-100 max-w-2xl mx-auto leading-relaxed">
          Tell us your idea and we'll turn it into a beautiful handcrafted creation. From preserving your wedding garlands (varmala) to customized clocks and nameplates, Mahima Choukse brings your imagination to life.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/custom-orders"
            className="w-full sm:w-auto btn-gold text-base px-8 py-4 font-semibold"
          >
            <Sparkles className="w-4 h-4 text-[#836511]" />
            <span>Request Custom Order</span>
          </Link>

          <a
            href="https://wa.me/919329028062?text=Hello%20Mahima!%20I%20have%20an%20idea%20for%20a%20custom%20resin%20art%20piece."
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-medium text-white border border-white/30 hover:bg-white/10 transition text-base"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <span>Chat on WhatsApp (+91 93290 28062)</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CustomOrderCTA;
