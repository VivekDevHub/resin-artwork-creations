import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle, Heart, Sparkles, ShieldCheck, ExternalLink } from 'lucide-react';

const Footer = () => {
  const instagramUrl = "https://www.instagram.com/resin_artworkk_creations?igsh=eHk5N2pianpseXQy&utm_source=qr";
  const facebookUrl = "https://www.instagram.com/resin_artworkk_creations?igsh=eHk5N2pianpseXQy&utm_source=qr";
  const whatsappUrl = "https://wa.me/919329028062";
  const mapsUrl = "https://maps.app.goo.gl/7sPc6mvjTggsmeL66";

  return (
    <footer className="bg-[#2B1B20] text-[#FFF9F5] pt-16 pb-24 md:pb-12 border-t border-[#7A1738]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Highlight Banner */}
        <div className="mb-10 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏆</span>
            <span className="font-serif font-bold text-sm sm:text-base text-[#DFBA3C]">
              #1 in Indore | Heirloom Specialist | Varmala | Clocks | Tables | Workshops
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-rose-200">
            <span>Owner:</span>
            <strong className="text-white font-serif tracking-wide">श्री सांवरिया सेठ ❤️</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#DFBA3C]/60 bg-white p-0.5">
                <img src="/assets/logo.png" alt="Resin Artwork Creations" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold tracking-wide text-white">RESIN ARTWORK CREATIONS</h3>
                <span className="font-script text-base text-[#DFBA3C]">By Mahima Choukse</span>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Indore’s leading luxury atelier dedicated to the craft of handcrafted epoxy resin masterpieces, preserved wedding varmalas, bespoke wall clocks, resin tables, and creative workshops.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DFBA3C] shrink-0 mt-0.5" />
                <div>
                  <p>PVWH+JQ9, Road No. 26, New Gori Nagar, Nanda Nagar, Indore, Madhya Pradesh 452011</p>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#DFBA3C] hover:underline mt-1 font-medium"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#DFBA3C] shrink-0" />
                <a href="tel:+919329028062" className="hover:text-white transition">
                  +91 93290 28062
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#DFBA3C] shrink-0" />
                <span>hello@resinartworkcreations.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D81B60] flex items-center justify-center text-white transition"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D81B60] flex items-center justify-center text-white transition"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center text-white transition"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-lg font-bold text-[#DFBA3C] mb-4">Artisan Categories</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><Link to="/shop?category=resin-art" className="hover:text-white transition">Varmala Preservation</Link></li>
              <li><Link to="/shop?category=clocks" className="hover:text-white transition">Geode Wall Clocks</Link></li>
              <li><Link to="/shop?category=resin-art" className="hover:text-white transition">Resin Tables & Decor</Link></li>
              <li><Link to="/shop?category=candles" className="hover:text-white transition">Scented Soy Candles</Link></li>
              <li><Link to="/shop?category=gift-hampers" className="hover:text-white transition">Luxury Gift Hampers</Link></li>
              <li><Link to="/custom-orders" className="hover:text-white transition">Workshops & Custom Art</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-[#DFBA3C] mb-4">Boutique & Orders</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><Link to="/shop" className="hover:text-white transition">Explore Collection</Link></li>
              <li><Link to="/custom-orders" className="hover:text-white transition">Request Custom Order</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Mahima Choukse</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact & Studio Visit</Link></li>
              <li><Link to="/orders" className="hover:text-white transition">Track Your Order</Link></li>
              <li><Link to="/admin/login" className="hover:text-white transition text-xs text-gray-400">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Trust & Guarantee */}
          <div>
            <h4 className="font-serif text-lg font-bold text-[#DFBA3C] mb-4">Artisan Guarantee</h4>
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              Every creation is poured, cured, polished, and packaged with painstaking artisanal care in our Indore studio.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#DFBA3C]" />
                <span>100% Unique & Made to Order</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#DFBA3C]" />
                <span>Safe Delivery All Across India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Resin Artwork Creations by Mahima Choukse. Owner: श्री सांवरिया सेठ ❤️
          </p>
          <div className="flex items-center gap-2 text-gray-400">
            <span>Crafted with love & devotion in Indore, MP</span>
            <Heart className="w-3.5 h-3.5 fill-[#D81B60] text-[#D81B60]" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
