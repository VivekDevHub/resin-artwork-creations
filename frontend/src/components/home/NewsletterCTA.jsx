import React, { useState } from 'react';
import { MessageCircle, Mail, Sparkles, Send } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const NewsletterCTA = () => {
  const [email, setEmail] = useState('');
  const toast = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success('Thank you for subscribing! Use coupon code WELCOME10 for 10% off.');
    setEmail('');
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-[#F8DDE5] via-[#FFF9F5] to-[#F8DDE5] border-t border-blush-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-[#F4B6C2]/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D81B60] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Stay Inspired</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B20]">
              Join the Art Club & Get 10% Off
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Be the first to see new product drops, festive hampers, and artisan resin techniques from Mahima’s studio.
            </p>
          </div>

          <div className="md:w-1/2 w-full space-y-4">
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-blush-300 text-sm focus:outline-none focus:border-[#7A1738] bg-white shadow-inner"
                />
              </div>
              <button type="submit" className="btn-primary text-xs px-5 py-3 whitespace-nowrap">
                <span>Join</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex items-center justify-center md:justify-start gap-2 pt-1">
              <span className="text-xs text-gray-500">Need instant bespoke help?</span>
              <a
                href="https://wa.me/919329028062"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-[#25D366] hover:underline flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp (+91 93290 28062)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;
