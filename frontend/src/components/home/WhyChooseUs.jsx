import React from 'react';
import { Award, Heart, Sparkles, Gift } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'We use optical-grade, UV-resistant crystal epoxy resin and authentic gold foil that never yellows or fades.'
  },
  {
    icon: Heart,
    title: 'Handcrafted With Love',
    description: 'Every flower petal is carefully preserved, arranged, and poured by hand in our Indore studio.'
  },
  {
    icon: Sparkles,
    title: 'Custom Orders',
    description: 'Personalize colors, wedding flowers, names, and milestones into one-of-a-kind heirloom artworks.'
  },
  {
    icon: Gift,
    title: 'Perfect For Gifting',
    description: 'Delivered in luxury velvet packaging with handwritten greeting cards, ready to enchant your loved ones.'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-20 bg-[#FFF9F5] border-y border-blush-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#D81B60] uppercase tracking-wider block mb-2">
            The Atelier Difference
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1B20]">
            Why Choose Resin Artwork Creations
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Artistry meets emotion. Discover the dedication behind every resin piece poured by Mahima Choukse.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F4B6C2]/40 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-blush-100/70 text-[#7A1738] group-hover:bg-[#7A1738] group-hover:text-white flex items-center justify-center transition-all duration-300 mb-5 shadow-sm">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2B1B20] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
