import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Instagram, Facebook, Send, Sparkles, Clock } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Contact = () => {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.message) {
      toast.error('Please fill in your name, email, and message.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Thank you! Your message has been sent to Mahima. We will respond within 24 hours.');
      setContactData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blush-100 text-[#7A1738] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>We Love Hearing From You</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1B20]">
            Get In Touch
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Have questions about an existing order, wedding flower preservation, or corporate gifting? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#7A1738] via-[#5C102A] to-[#2B1B20] text-white rounded-3xl p-8 shadow-xl space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227] text-[#2B1B20] text-[11px] font-bold shadow-sm mb-3">
                <span>🏆 #1 in Indore &bull; Heirloom Specialist</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-white">RESIN ARTWORK CREATIONS</h2>
              <span className="font-script text-xl text-[#DFBA3C]">By Mahima Choukse</span>
              <p className="text-xs text-rose-200 mt-1 font-medium">Owner: श्री सांवरिया सेठ ❤️</p>
            </div>

            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
              Based in Indore, Madhya Pradesh. Specializing in Varmala preservation, geode wall clocks, resin tables, and bespoke workshops with nationwide delivery.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/20 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#DFBA3C] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-white">Studio Address</p>
                  <p className="text-rose-100 text-xs leading-relaxed">
                    PVWH+JQ9, Road No. 26, New Gori Nagar, Nanda Nagar, Indore, Madhya Pradesh 452011
                  </p>
                  <a
                    href="https://maps.app.goo.gl/7sPc6mvjTggsmeL66"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#DFBA3C] font-semibold hover:underline mt-1 bg-white/10 px-2.5 py-1 rounded-lg"
                  >
                    <span>Open in Google Maps</span>
                    <Sparkles className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#DFBA3C] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Phone & WhatsApp</p>
                  <a href="tel:+919329028062" className="text-rose-100 text-xs hover:text-white transition">
                    +91 93290 28062
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#DFBA3C] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Email Support</p>
                  <p className="text-rose-100 text-xs">hello@resinartworkcreations.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#DFBA3C] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Atelier Hours</p>
                  <p className="text-rose-100 text-xs">Monday - Saturday (10:00 AM - 7:00 PM IST)</p>
                </div>
              </div>
            </div>

            {/* Socials & WhatsApp */}
            <div className="pt-4 border-t border-white/20 space-y-3">
              <span className="text-xs uppercase tracking-wider text-rose-200 block font-semibold">
                Instant Chat & Socials
              </span>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/919329028062?text=Hello%20Mahima,%20I%20have%20an%20inquiry%20regarding%20resin%20artwork."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold shadow hover:bg-emerald-600 transition"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp (+91 93290 28062)</span>
                </a>

                <a
                  href="https://www.instagram.com/resin_artworkk_creations?igsh=eHk5N2pianpseXQy&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-white/10 hover:bg-[#D81B60] text-white transition flex items-center gap-1.5 text-xs px-3"
                  title="Instagram: @resin_artworkk_creations"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://www.instagram.com/resin_artworkk_creations?igsh=eHk5N2pianpseXQy&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-white/10 hover:bg-[#D81B60] text-white transition flex items-center gap-1.5 text-xs px-3"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#F4B6C2]/50 shadow-soft">
            <h2 className="font-serif text-2xl font-bold text-[#2B1B20] mb-2">Send a Message</h2>
            <p className="text-xs text-gray-500 mb-6">Fill in the form below and Mahima will get back to you promptly.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98260 12345"
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. priya@example.com"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Inquiring about wedding flower preservation in Indore"
                  value={contactData.subject}
                  onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                  className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you today? Feel free to ask about sizes, colors, dispatch dates..."
                  value={contactData.message}
                  onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                  className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-primary text-xs sm:text-sm py-3.5 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
