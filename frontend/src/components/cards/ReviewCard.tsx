import React from 'react';
import { Review } from '@/types';
import { Rating } from '@/components/ui/Rating';
import { formatDate } from '@/utils/formatters';
import { Quote } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="glass-card p-6 flex flex-col justify-between h-full relative bg-white border border-slate-200/80 shadow-md shadow-slate-200/40">
      <Quote className="absolute top-4 right-4 text-pink-100 w-10 h-10 pointer-events-none" />
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-pink-50 border border-pink-100 overflow-hidden flex items-center justify-center font-bold text-pink-600 text-sm">
            {review.customer?.profileImage ? (
              <img src={review.customer.profileImage} alt="" className="w-full h-full object-cover" />
            ) : (
              review.customer?.firstName[0] || 'C'
            )}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              {review.customer ? `${review.customer.firstName} ${review.customer.lastName || ''}` : 'Customer Review'}
            </h4>
            <span className="text-[11px] text-slate-400 font-medium">{formatDate(review.createdAt || '')}</span>
          </div>
        </div>

        <Rating value={review.rating} size={16} showValue={false} />

        <p className="text-sm text-slate-700 italic mt-3 leading-relaxed">
          "{review.comment || 'Punctual service, hygienic products, and amazing glow finish!'}"
        </p>
      </div>
    </div>
  );
};
