import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Award, MapPin, ArrowRight, Clock, Star, MessageCircle, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-[#FFF9F5] min-h-screen py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 md:space-y-20">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blush-100 to-amber-50 text-[#7A1738] text-xs font-bold border border-[#F4B6C2]/60 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>🏆 #1 in Indore | Heirloom Specialist | Varmala | Clocks | Tables | Workshops</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#2B1B20] leading-tight">
            About Me
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-[#7A1738] font-medium">
            From a Small Dream to a Creative Journey ✨
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-gray-600">
            <span>#Top1ResinArtistInIndore</span>
            <span>&bull;</span>
            <span>Preserving Memories, Creating Forever</span>
            <span>&bull;</span>
            <span className="text-[#7A1738] font-serif">Owner: श्री सांवरिया सेठ ❤️</span>
          </div>
        </div>

        {/* Milestone Numbers Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl p-5 border border-blush-200/80 shadow-soft text-center transform hover:-translate-y-1 transition duration-300">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#7A1738] block">4+</span>
            <span className="text-xs sm:text-sm font-semibold text-[#2B1B20] mt-1 block">Years of Artistry</span>
            <span className="text-[11px] text-gray-500 mt-0.5 block">Hard work & learning</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-blush-200/80 shadow-soft text-center transform hover:-translate-y-1 transition duration-300">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#C9A227] block">2000+</span>
            <span className="text-xs sm:text-sm font-semibold text-[#2B1B20] mt-1 block">Varmala Preservations</span>
            <span className="text-[11px] text-gray-500 mt-0.5 block">Wedding blooms preserved</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-blush-200/80 shadow-soft text-center transform hover:-translate-y-1 transition duration-300">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#7A1738] block">#1 Top</span>
            <span className="text-xs sm:text-sm font-semibold text-[#2B1B20] mt-1 block">Resin Artist in Indore</span>
            <span className="text-[11px] text-gray-500 mt-0.5 block">Trusted across MP & India</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-blush-200/80 shadow-soft text-center transform hover:-translate-y-1 transition duration-300">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#D81B60] block">Countless</span>
            <span className="text-xs sm:text-sm font-semibold text-[#2B1B20] mt-1 block">Memories Preserved</span>
            <span className="text-[11px] text-gray-500 mt-0.5 block">Sent with love & care</span>
          </div>
        </div>

        {/* Main Founder Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Portrait Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Background Frame */}
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
                
                {/* Gradient Overlay and Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B20]/90 via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227] text-[#2B1B20] text-[11px] font-bold shadow-sm mb-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>#Top1 Resin Artist in Indore</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#FFF9F5]">Mahima Choukse</h3>
                  <p className="text-xs text-rose-200">
                    Founder & Resin Artist &bull; Resin Artwork Creations, Indore
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Story Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B20] leading-snug">
                Hi, I’m Mahima Choukse,
              </h2>
              <p className="text-base sm:text-lg font-medium text-[#7A1738] leading-relaxed">
                founder and resin artist behind <strong>Resin Artwork Creations by Mahima Choukse</strong>, proudly based in Indore, Madhya Pradesh.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Four years ago, I started this journey with a simple love for creativity and a dream of building something of my own. I didn’t have everything figured out—I learned along the way.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              I made mistakes. I tried, failed, experimented, started again, and discovered something new with every creation. Every challenge became a lesson, and every lesson helped me become the artist and entrepreneur I am today.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              What began as a small passion has now grown into a beautiful journey of creating meaningful pieces for people across India and beyond. With <strong>2000+ varmala preservations</strong> and countless memories preserved over the years, every order has added a new story to my journey.
            </p>

            {/* Preserving Emotions Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blush-50 to-amber-50/60 border border-blush-200 shadow-sm relative">
              <div className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-[#D81B60] shrink-0 mt-1" />
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-[#2B1B20] text-base">
                    Preserving Emotions, Not Just Flowers
                  </h4>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed italic">
                    "For me, resin art has never been just about creating something beautiful. It is about preserving emotions. A wedding flower, a varmala, a piece of jewellery, or a tiny keepsake can hold an entire memory—and my work is about giving those memories a forever place."
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Today, I’m proud to be known as one of the leading resin artists in Indore, and I carry the <strong>#Top1 Resin Artist in Indore</strong> identity with immense gratitude for the love and trust my customers have given me.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              But behind every finished artwork is a journey of four years—of hard work, sleepless nights, mistakes, learning, creativity, and never giving up.
            </p>
          </div>
        </div>

        {/* Heartfelt Quote Banner */}
        <div className="bg-gradient-to-br from-[#7A1738] via-[#5C102A] to-[#2B1B20] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto space-y-6">
            <Heart className="w-10 h-10 text-[#DFBA3C] mx-auto animate-pulse" />
            
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-rose-50 font-normal">
              “This isn’t just a business I built. It’s a dream I nurtured, a skill I developed, and a piece of my heart that I put into every creation. 🤍”
            </blockquote>

            <div className="pt-2">
              <span className="font-script text-3xl sm:text-4xl text-[#DFBA3C] block">Mahima Choukse</span>
              <span className="text-xs text-rose-200 uppercase tracking-widest mt-1 block">
                Founder &bull; Resin Artwork Creations
              </span>
            </div>
          </div>
        </div>

        {/* Welcome & Invitation Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-blush-200 shadow-soft text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blush-100 text-[#7A1738] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>Welcome to Our Atelier</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#2B1B20]">
            Welcome to Resin Artwork Creations by Mahima Choukse —
          </h3>

          <p className="font-serif italic text-lg sm:text-2xl text-[#7A1738]">
            where your most precious memories are transformed into timeless art. ✨
          </p>

          <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Whether you wish to preserve your sacred wedding varmala, commemorate an anniversary with a bespoke geode clock, or gift a one-of-a-kind keepsake, Mahima is honored to craft your story.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/custom-orders" className="btn-primary text-sm px-8 py-3.5 w-full sm:w-auto shadow-md">
              <span>Commission a Custom Piece</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <a
              href="https://wa.me/919329028062?text=Hello%20Mahima,%20I%20would%20love%20to%20know%20more%20about%20your%20custom%20resin%20creations!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-sm px-7 py-3.5 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp (+91 93290 28062)</span>
            </a>

            <Link to="/shop" className="btn-secondary text-sm px-7 py-3.5 w-full sm:w-auto">
              <span>Explore Catalog</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-blush-100 text-xs sm:text-sm font-semibold text-gray-500 tracking-wider">
            🏆#𝟏 𝐢𝐧 𝐈𝐧𝐝𝐨𝐫𝐞 | 𝐇𝐞𝐢𝐫𝐥𝐨𝐨𝐦 𝐒𝐩𝐞𝐜𝐢𝐚𝐥𝐢𝐬𝐭 | 𝐕𝐚𝐫𝐦𝐚𝐥𝐚 | 𝐂𝐥𝐨𝐜𝐤𝐬 | 𝐓𝐚𝐛𝐥𝐞𝐬 | 𝐖𝐨𝐫𝐤𝐬𝐡𝐨𝐩𝐬
          </div>
        </div>

        {/* Indore Studio Banner */}
        <div className="bg-gradient-to-r from-[#7A1738] to-[#5C102A] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-[#DFBA3C]">
              <MapPin className="w-4 h-4" />
              <span>Indore, Madhya Pradesh, India &bull; Owner: श्री सांवरिया सेठ ❤️</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Visit or Connect with Our Indore Studio
            </h3>
            <p className="text-xs sm:text-sm text-rose-100 max-w-xl leading-relaxed">
              <strong>Studio Address:</strong> PVWH+JQ9, Road No. 26, New Gori Nagar, Nanda Nagar, Indore, Madhya Pradesh 452011
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
              <a
                href="https://maps.app.goo.gl/7sPc6mvjTggsmeL66"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#7A1738] text-xs font-bold shadow hover:bg-rose-50 transition"
              >
                <span>Google Maps Location</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://wa.me/919329028062"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow hover:bg-emerald-600 transition"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>+91 93290 28062</span>
              </a>
            </div>
          </div>

          <Link to="/contact" className="btn-gold text-xs sm:text-sm px-7 py-3.5 font-bold whitespace-nowrap shadow-lg">
            Contact Studio
          </Link>
        </div>

      </div>
    </div>
  );
};

export default About;
