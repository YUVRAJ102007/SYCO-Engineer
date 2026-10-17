import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviewCount,
  size = 'sm',
  showCount = true,
}) => {
  const iconSize = size === 'sm' ? 14 : size === 'md' ? 18 : 22;

  return (
    <div className="flex items-center gap-1.5" aria-label={`Rating ${rating} out of 5 stars`}>
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFull = rating >= starIndex;
          const isHalf = !isFull && rating >= starIndex - 0.5;

          return (
            <span key={starIndex} className="relative inline-block">
              {isFull ? (
                <Star size={iconSize} className="fill-amber-400 text-amber-400" />
              ) : isHalf ? (
                <span className="relative">
                  <Star size={iconSize} className="text-slate-300 dark:text-slate-700" />
                  <span className="absolute top-0 left-0 w-1/2 overflow-hidden">
                    <Star size={iconSize} className="fill-amber-400 text-amber-400" />
                  </span>
                </span>
              ) : (
                <Star size={iconSize} className="text-slate-300 dark:text-slate-700" />
              )}
            </span>
          );
        })}
      </div>
      {showCount && (
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-0.5">
          {rating.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="text-slate-400 font-normal ml-1">({reviewCount.toLocaleString('en-IN')})</span>
          )}
        </span>
      )}
    </div>
  );
};
