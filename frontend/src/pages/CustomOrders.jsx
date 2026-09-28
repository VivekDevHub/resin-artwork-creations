import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  MessageCircle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Image as ImageIcon
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

const productTypes = [
  'Resin Wall Art',
  'Resin Clock',
  'Preserved Flower Frame',
  'Couple / Name Plaque',
  'Resin Table / Tray',
  'Hand Casting Keepsake',
  'Custom Gift Hamper',
  'Personalized Coasters / Jewellery Box',
  'Other Custom Creation'
];

const occasions = [
  'Wedding & Varmala Preservation',
  'Anniversary Milestone',
  'Birthday Gift',
  'Housewarming Ceremony',
  'Baby Shower / Newborn Keepsake',
  'Corporate & Executive Gifting',
  'Personal Home Decor'
];

const colorThemes = [
  'Blush Pink & 24K Gold Leaf',
  'Emerald Green & Champagne Gold',
  'Deep Burgundy & Rose Quartz',
  'Ocean Waves & Golden Sands',
  'Pearl White & Minimalist Gold',
  'Midnight Black & Cosmic Shimmer',
  'Custom Color Palette'
];

const budgetRanges = [
  '₹1,000 - ₹2,000',
  '₹2,000 - ₹3,500',
  '₹3,500 - ₹5,000',
  '₹5,000+'
];

const CustomOrders = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productType: productTypes[0],
    budget: budgetRanges[1],
    preferredColor: colorThemes[0],
    customizationDetails: '',
    occasion: occasions[0],
    requiredDate: '',
    referenceImage: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.customizationDetails) {
      toast.error('Please complete all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await api.post('/custom-orders', formData);
      if (data.success) {
        toast.success(data.message || 'Custom order request received!');
        setSubmittedOrder(data.customOrder);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blush-100 text-[#7A1738] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>Bespoke Handcrafted Commissions</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1B20]">
            Create a Custom Order
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Have something special in mind? From wedding flower preservation to custom name plaques and clocks, Mahima Choukse designs every bespoke piece with meticulous love in Indore.
          </p>
        </div>

        {submittedOrder ? (
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-blush-200 shadow-xl text-center max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="font-serif text-3xl font-bold text-[#2B1B20]">
              Inquiry Received with Thanks!
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed">
              Dear <strong>{submittedOrder.name}</strong>, thank you for choosing Resin Artwork Creations. Mahima has received your custom inquiry for a <strong>{submittedOrder.productType}</strong>.
            </p>

            <div className="bg-blush-50 p-4 rounded-2xl border border-blush-200 text-xs text-left space-y-1.5 text-gray-700">
              <p><strong>Preferred Theme:</strong> {submittedOrder.preferredColor}</p>
              <p><strong>Occasion:</strong> {submittedOrder.occasion}</p>
              <p><strong>Estimated Budget:</strong> {submittedOrder.budget}</p>
              <p><strong>Target Date:</strong> {submittedOrder.requiredDate || 'Flexible'}</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/919329028062?text=Hello%20Mahima,%20I%20just%20submitted%20a%20custom%20order%20request%20for%20a%20${encodeURIComponent(submittedOrder.productType)}%20(Name:%20${encodeURIComponent(submittedOrder.name)})`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow hover:scale-105 transition"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Discuss Details on WhatsApp (+91 93290 28062)</span>
              </a>

              <button
                onClick={() => setSubmittedOrder(null)}
                className="w-full sm:w-auto btn-secondary text-sm px-6 py-3"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-[#F4B6C2]/50 shadow-soft">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#7A1738] mb-4 pb-2 border-b border-blush-100">
                    1. Your Contact Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Priya Sharma"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. +91 98260 12345"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="e.g. priya.sharma@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                      />
                    </div>
                  </div>
                </div>

                {/* Customization Details */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#7A1738] mb-4 pb-2 border-b border-blush-100">
                    2. Art & Product Preferences
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Product Type *</label>
                      <select
                        name="productType"
                        value={formData.productType}
                        onChange={handleChange}
                        className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                      >
                        {productTypes.map((pt) => (
                          <option key={pt} value={pt}>{pt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Special Occasion</label>
                      <select
                        name="occasion"
                        value={formData.occasion}
                        onChange={handleChange}
                        className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                      >
                        {occasions.map((occ) => (
                          <option key={occ} value={occ}>{occ}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Preferred Color Palette</label>
                      <select
                        name="preferredColor"
                        value={formData.preferredColor}
                        onChange={handleChange}
                        className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                      >
                        {colorThemes.map((ct) => (
                          <option key={ct} value={ct}>{ct}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Estimated Budget</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                      >
                        {budgetRanges.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
                        Required Delivery Date (Optional)
                      </label>
                      <input
                        type="date"
                        name="requiredDate"
                        value={formData.requiredDate}
                        onChange={handleChange}
                        className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5 text-[#C9A227]" />
                        Reference Image URL (Optional)
                      </label>
                      <input
                        type="url"
                        name="referenceImage"
                        placeholder="https://... or photo link"
                        value={formData.referenceImage}
                        onChange={handleChange}
                        className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Customization Details & Instructions *
                      </label>
                      <textarea
                        name="customizationDetails"
                        rows={4}
                        required
                        placeholder="Describe your design vision in detail (e.g. names to be written, flower types to preserve, dimensions, placement of gold flakes, clock numbers style)..."
                        value={formData.customizationDetails}
                        onChange={handleChange}
                        className="w-full text-xs px-3.5 py-3 rounded-xl border border-blush-300 bg-white focus:outline-none focus:border-[#7A1738]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary text-sm py-4 flex items-center justify-center gap-2 font-semibold shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting Inquiry...' : 'Request Custom Order'}</span>
                </button>
              </form>
            </div>

            {/* Sidebar Information Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-gradient-to-br from-[#7A1738] to-[#5C102A] text-white rounded-3xl p-6 shadow-xl space-y-4">
                <span className="badge-gold text-[10px] uppercase tracking-wider font-bold">
                  Bespoke Atelier Process
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">How Custom Works</h3>
                <div className="space-y-3 text-xs text-rose-100">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white/20 text-[#DFBA3C] font-bold flex items-center justify-center shrink-0">1</span>
                    <p><strong>Submit Idea:</strong> Share your vision, occasion, flower preferences or names.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white/20 text-[#DFBA3C] font-bold flex items-center justify-center shrink-0">2</span>
                    <p><strong>Artisan Quote:</strong> Mahima will connect on WhatsApp with exact pricing & design layout.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white/20 text-[#DFBA3C] font-bold flex items-center justify-center shrink-0">3</span>
                    <p><strong>Layering & Cure:</strong> Hand-poured in Indore studio (5-8 days curing time).</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white/20 text-[#DFBA3C] font-bold flex items-center justify-center shrink-0">4</span>
                    <p><strong>Safe Express Delivery:</strong> Packed in shockproof luxury boxes across India.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <a
                    href="https://wa.me/919329028062?text=Hello%20Mahima,%20I'd%20like%20to%20discuss%20a%20custom%20resin%20art%20order."
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs shadow hover:bg-emerald-600 transition"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp Mahima (+91 93290 28062)</span>
                  </a>
                </div>
              </div>

              {/* Guarantees */}
              <div className="bg-white rounded-3xl p-6 border border-blush-200 shadow-soft space-y-3 text-xs text-gray-700">
                <div className="flex items-center gap-2 text-[#7A1738] font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                  <span>Artisan Guarantee</span>
                </div>
                <p className="text-gray-500 leading-relaxed">
                  We send photos and videos of your custom artwork prior to dispatch to ensure you are 100% delighted with the colors and lettering.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomOrders;
