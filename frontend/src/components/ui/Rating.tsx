import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  max?: number;
  showValue?: boolean;
  reviewsCount?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  showValue = true,
  reviewsCount,
  size = 20,
  interactive = false,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: max }).map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= Math.floor(value);
          const isHalf = starValue === Math.ceil(value) && value % 1 !== 0;

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(starValue)}
              className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
            >
              <Star
                size={size}
                className={`${
                  isFilled || isHalf
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-slate-800 text-slate-700'
                }`}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-bold text-amber-400">
          {value.toFixed(1)}
        </span>
      )}
      {reviewsCount !== undefined && (
        <span className="text-xs text-slate-400 font-medium">({reviewsCount} reviews)</span>
      )}
    </div>
  );
};
