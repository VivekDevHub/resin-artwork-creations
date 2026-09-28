import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'How long does a customized resin art piece take to make?',
    a: 'Because high-grade epoxy resin requires 24 to 48 hours per curing layer, custom orders generally take 5 to 8 working days to handcraft, polish, and package before being dispatched from our Indore studio.'
  },
  {
    q: 'Can I preserve my actual wedding garland (varmala) or bridal bouquet?',
    a: 'Yes, absolutely! Flower preservation is one of Mahima’s specialties. You can send or hand over your fresh flowers, and we gently dehydrate each bloom using professional silica treatment before sealing them forever in crystal epoxy.'
  },
  {
    q: 'How do I care for and clean my resin home decor?',
    a: 'Clean gently using a soft, dry or slightly damp microfibre cloth. Avoid harsh chemical cleaners, scourers, and prolonged exposure to direct, harsh sunlight to keep the glass-like lustre brilliant.'
  },
  {
    q: 'Do you deliver across India outside Indore?',
    a: 'Yes! We ship all across India using trusted express couriers (BlueDart, Delhivery, DTDC) with custom shock-absorbent packaging. Orders above ₹999 enjoy FREE delivery.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept both Cash on Delivery (COD) and 100% secure Online Payments powered by Razorpay (UPI, Google Pay, PhonePe, Debit/Credit Cards, and Net Banking).'
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-20 bg-[#FFF9F5] border-t border-blush-200/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D81B60] uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1B20]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Everything you need to know about placing orders, flower preservation, and care instructions.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-blush-200 shadow-sm overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-lg font-bold text-[#2B1B20] hover:text-[#7A1738] transition"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                    openIndex === idx ? 'rotate-180 text-[#7A1738]' : ''
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-blush-50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
