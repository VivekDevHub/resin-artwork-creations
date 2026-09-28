import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating = 5, numReviews, size = 'sm', showNum = true }) => {
  const starSize = size === 'xs' ? 'w-3 h-3' : size === 'md' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-[#C9A227]">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= Math.round(rating)
                ? 'fill-[#C9A227] text-[#C9A227]'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      {showNum && (
        <span className="text-xs font-medium text-gray-600 ml-0.5">
          {rating.toFixed(1)} {numReviews !== undefined && <span className="text-gray-400">({numReviews})</span>}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
