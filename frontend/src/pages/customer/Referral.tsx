import React, { useState } from 'react';
import { Gift, Copy, Share2, Users, Trophy, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export const Referral: React.FC = () => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const referralCode = 'NEX-ARVIND2026';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    showToast('Code Copied!', 'Share NEX-ARVIND2026 with your friends to earn ₹200.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const leaderboard = [
    { rank: 1, name: 'Priya Sharma', referrals: 24, earned: '₹4,800' },
    { rank: 2, name: 'Arvind Kumar', referrals: 18, earned: '₹3,600' },
    { rank: 3, name: 'Kavya Nair', referrals: 14, earned: '₹2,800' },
    { rank: 4, name: 'Ananya Rao', referrals: 11, earned: '₹2,200' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 bg-[#FFFDFE] text-[#111827] relative">
      {/* Header Banner */}
      <div className="p-8 md:p-12 rounded-[32px] bg-gradient-to-br from-pink-50 via-purple-50 to-white border border-pink-200 shadow-2xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-pink-200 text-[#FF2E7E] text-xs font-bold shadow-xs">
          <Gift size={16} />
          <span>NexServe Community Rewards</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
          Invite Friends — Earn ₹200 Every Time
        </h1>
        <p className="text-sm text-[#64748B] max-w-xl mx-auto leading-relaxed">
          Your friend gets ₹150 OFF their first doorstep treatment, and you receive ₹200 instant cashback in your wallet!
        </p>
      </div>

      {/* Referral Code Box */}
      <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4 text-center">
        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">Your Exclusive Referral Code</span>
        <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
          <div className="px-6 py-3.5 rounded-2xl bg-pink-50 border border-pink-200 text-2xl font-extrabold text-[#FF2E7E] tracking-widest flex-1">
            {referralCode}
          </div>
          <button
            onClick={handleCopyCode}
            className="gradient-btn h-14 px-6 text-xs font-bold rounded-2xl shrink-0 cursor-pointer flex items-center gap-2"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* Referral Leaderboard */}
      <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-5">
        <h3 className="text-lg font-bold text-[#111827] flex items-center gap-2 border-b border-[#ECECEC] pb-3">
          <Trophy className="text-amber-500" size={20} />
          <span>Top Community Referrers Leaderboard</span>
        </h3>

        <div className="space-y-3">
          {leaderboard.map((item) => (
            <div key={item.rank} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 rounded-full font-extrabold text-xs flex items-center justify-center ${
                    item.rank === 1
                      ? 'bg-amber-100 text-amber-800'
                      : item.rank === 2
                      ? 'bg-slate-200 text-slate-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}
                >
                  #{item.rank}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-[#111827]">{item.name}</h4>
                  <span className="text-[11px] text-[#64748B]">{item.referrals} Friends Invited</span>
                </div>
              </div>
              <span className="text-sm font-extrabold text-emerald-600">{item.earned} Earned</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
