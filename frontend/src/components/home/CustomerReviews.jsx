import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import RatingStars from '../common/RatingStars';

const reviews = [
  {
    name: 'Priya Sharma',
    city: 'Indore, MP',
    rating: 5,
    title: 'Detailing and finishing were amazing',
    comment: 'Absolutely beautiful work. The detailing and finishing were amazing. The lavender scent of the candle is so soothing and the holder looks like a work of art on my vanity!',
    productName: 'Pastel Resin Candle Set'
  },
  {
    name: 'Ananya Verma',
    city: 'Bhopal, MP',
    rating: 5,
    title: 'Loved the personalized gift',
    comment: 'Ordered a personalized gift and loved the final result. Mahima customized the colors to match my sister’s wedding palette. Truly luxurious handcrafted quality!',
    productName: 'Preserved Flower Resin Frame'
  },
  {
    name: 'Rohan Deshmukh',
    city: 'Indore, MP',
    rating: 5,
    title: 'Masterpiece living room clock',
    comment: 'The resin clock exceeded all our expectations. The real quartz stones and gold accents catch the light so beautifully. Everyone visiting our home asks where we got it!',
    productName: 'Custom Resin Clock'
  }
];

const CustomerReviews = () => {
  return (
    <section className="py-16 md:py-20 bg-[#FFF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#D81B60] uppercase tracking-wider block mb-2">
            Real Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1B20]">
            Loved by Our Patrons
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Hear what our patrons and gift seekers across India say about their customized resin creations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-[#F4B6C2]/40 shadow-soft flex flex-col justify-between relative group hover:shadow-soft-lg hover:-translate-y-1 transition duration-300"
            >
              <Quote className="w-10 h-10 text-blush-200 absolute top-6 right-6 -z-0 group-hover:text-blush-300 transition" />

              <div className="relative z-10 space-y-4">
                <RatingStars rating={rev.rating} showNum={false} size="sm" />

                <h3 className="font-serif text-lg font-bold text-[#2B1B20]">
                  "{rev.title}"
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-6 border-t border-blush-100 flex items-center justify-between mt-6">
                <div>
                  <h4 className="font-semibold text-sm text-[#7A1738]">{rev.name}</h4>
                  <p className="text-xs text-gray-400">{rev.city}</p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span>Verified Buyer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
