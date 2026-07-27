import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export const VendorReviews: React.FC = () => {
  const { showToast } = useToast();
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({});

  const reviewsList = [
    {
      id: 1,
      name: 'Ananya Rao',
      rating: 5,
      date: 'July 24, 2026',
      service: 'Diamond Hydra-Glow Facial',
      comment: 'The beautician arrived right on time with a sealed mono-dose sachet. Extremely polite and hygienic!',
      reply: 'Thank you Ananya! Delighted to hear you loved our single-use sachet facial.',
    },
    {
      id: 2,
      name: 'Sneha Verma',
      rating: 5,
      date: 'July 21, 2026',
      service: 'Herbal Keratin Hair Spa',
      comment: 'Heavenly scalp massage. Cleaner floor cleanup afterwards than expected. Will book again!',
      reply: '',
    },
  ];

  const handleSendReply = (reviewId: number) => {
    if (!replyText[reviewId]?.trim()) return;
    showToast('Reply Posted!', 'Your response is now visible on your public studio profile.', 'success');
    setReplyText((prev) => ({ ...prev, [reviewId]: '' }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-[#FFFDFE] text-[#111827] pb-16">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#111827]">Customer Reviews Desk</h1>
        <p className="text-xs text-[#64748B] font-medium mt-1">Read feedback, reply to clients, and manage your partner score</p>
      </div>

      {/* Analytics Rating Summary */}
      <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left space-y-1">
          <span className="text-xs text-[#64748B] font-semibold uppercase tracking-wider block">Average Partner Score</span>
          <span className="text-5xl font-extrabold text-[#111827]">4.9 / 5.0</span>
          <div className="flex items-center gap-1 text-amber-400 justify-center md:justify-start">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star key={idx} size={18} className="fill-amber-400" />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6 text-center text-xs font-bold text-slate-700">
          <div className="p-4 rounded-2xl bg-pink-50 text-[#FF2E7E]">
            <span className="text-xl font-extrabold block">128</span>
            <span>Total Reviews</span>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-700">
            <span className="text-xl font-extrabold block">98%</span>
            <span>5-Star Ratings</span>
          </div>
        </div>
      </div>

      {/* Customer Review List */}
      <div className="space-y-6">
        {reviewsList.map((r) => (
          <div key={r.id} className="p-6 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#111827]">{r.name}</h4>
                <p className="text-xs text-[#64748B] font-medium">{r.service} • {r.date}</p>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star key={idx} size={14} className="fill-amber-400" />
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-600 italic leading-relaxed">"{r.comment}"</p>

            {r.reply ? (
              <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-[#FF2E7E] block">Your Public Reply:</span>
                <p className="italic">{r.reply}</p>
              </div>
            ) : (
              <div className="flex items-center gap-2 pt-2 border-t border-[#ECECEC]">
                <input
                  type="text"
                  value={replyText[r.id] || ''}
                  onChange={(e) => setReplyText({ ...replyText, [r.id]: e.target.value })}
                  placeholder="Type a polite thank-you response..."
                  className="flex-1 h-10 px-4 rounded-2xl bg-white border border-[#ECECEC] text-xs text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
                />
                <Button size="sm" variant="primary" onClick={() => handleSendReply(r.id)} leftIcon={<Send size={14} />}>
                  Reply
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
