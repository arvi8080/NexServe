import React, { useState } from 'react';
import { Crown, CheckCircle2, Sparkles, Zap, Gift, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export const Membership: React.FC = () => {
  const { showToast } = useToast();
  const [selectedTier, setSelectedTier] = useState<'silver' | 'gold' | 'platinum'>('gold');

  const tiers = [
    {
      id: 'silver',
      name: 'Silver Premium',
      price: 499,
      period: 'per month',
      badge: 'Popular for Starters',
      features: [
        '5% Discount on all treatments',
        'Free Doorstep Visit Fee',
        'Standard Appointment Booking',
        'Email Support',
      ],
    },
    {
      id: 'gold',
      name: 'Gold Elite',
      price: 999,
      period: 'per month',
      badge: 'MOST POPULAR',
      popular: true,
      features: [
        '15% Discount on all treatments',
        'Priority Slot Booking',
        'Free Doorstep Visit Fee',
        '10% Cashback into Wallet',
        'Birthday Gift Voucher (₹500)',
        'Unlimited AI Beauty Consultations',
      ],
    },
    {
      id: 'platinum',
      name: 'Platinum VIP',
      price: 1999,
      period: 'per month',
      badge: 'Ultimate Luxury',
      features: [
        '25% Discount on all treatments',
        'Instant Priority Slot Guarantee',
        'Free Doorstep Visit Fee',
        '20% Cashback into Wallet',
        'Dedicated VIP Relationship Manager',
        'Complimentary Head Spa Session Quarterly',
        'Unlimited AI Beauty Consultations',
      ],
    },
  ];

  const handleSubscribe = (tierName: string) => {
    showToast('Subscription Activated!', `Welcome to NexServe ${tierName}! Benefits unlocked.`, 'success');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20 bg-[#FFFDFE] text-[#111827] relative">
      {/* Header Banner */}
      <div className="p-8 md:p-12 rounded-[32px] bg-gradient-to-br from-pink-50 via-purple-50 to-white border border-pink-200 shadow-2xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-pink-200 text-[#FF2E7E] text-xs font-bold shadow-xs">
          <Crown size={16} />
          <span>NexServe Premium Membership</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
          Unlock VIP Beauty Privileges
        </h1>
        <p className="text-sm text-[#64748B] max-w-xl mx-auto leading-relaxed">
          Enjoy priority booking, zero doorstep delivery fees, exclusive cashback, birthday rewards, and complimentary AI consultation.
        </p>
      </div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((t) => (
          <div
            key={t.id}
            className={`p-8 rounded-[32px] bg-white border transition-all flex flex-col justify-between space-y-6 relative ${
              t.popular
                ? 'border-[#FF2E7E] shadow-2xl shadow-[#FF2E7E]/15 scale-105 z-10'
                : 'border-[#ECECEC] shadow-xl hover:border-pink-200'
            }`}
          >
            {t.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white text-[10px] font-extrabold shadow-md">
                {t.badge}
              </span>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-[#111827]">{t.name}</h3>
                <span className="text-xs text-[#64748B] font-semibold">{t.badge}</span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-[#111827]">₹{t.price}</span>
                <span className="text-xs text-slate-400 font-medium">/{t.period}</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#ECECEC] text-xs font-semibold text-slate-700">
                {t.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#FF2E7E] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant={t.popular ? 'primary' : 'secondary'}
              onClick={() => handleSubscribe(t.name)}
              className="w-full h-12 rounded-2xl text-xs font-bold"
              rightIcon={<ArrowRight size={16} />}
            >
              Join {t.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
