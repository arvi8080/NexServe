import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Plus, Edit2, Trash2, CheckCircle2, ShieldCheck, Upload } from 'lucide-react';
import { customerApi } from '@/api/customer.api';
import { Review } from '@/types';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { Loader } from '@/components/common/Loader';

export const CustomerReviews: React.FC = () => {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Write Review Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    customerApi.getReviews()
      .then((data) => setReviews(data))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast('Validation Error', 'Please write a review comment.', 'error');
      return;
    }

    const newRev = await customerApi.createReview({
      bookingId: 'booking_1',
      vendorId: 'vendor_1',
      rating,
      comment,
    });

    setReviews((prev) => [newRev, ...prev]);
    setIsModalOpen(false);
    setComment('');
    showToast('Review Published!', 'Thank you for rating your GlowHome beautician!', 'success');
  };

  if (isLoading) return <Loader message="Hydrating customer reviews history..." />;

  return (
    <div className="space-y-8 pb-20 bg-[#FFFDFE] text-[#111827]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-extrabold border border-amber-200 mb-2">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span>Verified Customer Feedback</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">My Reviews & Ratings</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Rate your doorstep beauticians and share your authentic GlowHome experience.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus size={16} />}
          className="h-11 px-5 rounded-2xl text-xs font-bold shadow-lg"
        >
          + Write New Review
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-50 text-amber-500">
                  <Star size={20} className="fill-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1 font-bold text-amber-500 text-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'} />
                    ))}
                    <span className="ml-1 text-slate-900 font-extrabold">{rev.rating}.0 ★</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Posted on {new Date(rev.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200">
                ✓ Verified Booking
              </span>
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed italic">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Write a Customer Review">
          <form onSubmit={handleSubmitReview} className="space-y-4 pt-2">
            <div className="space-y-1.5 text-center">
              <label className="text-xs font-bold text-slate-700 block">Star Rating</label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-2 cursor-pointer transition-transform hover:scale-110"
                  >
                    <Star
                      size={28}
                      className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Your Review Comment</label>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience regarding hygiene, punctuality, and service quality..."
                className="w-full p-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-medium text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full h-12 rounded-2xl text-xs font-bold shadow-xl">
              Publish Review
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
};
