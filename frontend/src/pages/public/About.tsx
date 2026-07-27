import React from 'react';
import { Sparkles, ShieldCheck, Heart, Award, Users, CheckCircle2 } from 'lucide-react';
import { StatCard } from '@/components/cards/StatCard';

export const About: React.FC = () => {
  return (
    <div className="space-y-16 pb-16 bg-[#FFF8FB] text-[#111827]">
      {/* Hero Header */}
      <div className="p-8 md:p-16 rounded-[32px] bg-gradient-to-br from-[#FFF5F8] via-pink-50/50 to-white border border-[#ECECEC] shadow-xl text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-pink-200 text-[#FF2E7A] text-xs font-bold shadow-xs">
          <Sparkles size={14} />
          <span>Our Vision & Hygiene Commitment</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827]">Redefining Doorstep Beauty in India</h1>
        <p className="text-sm text-[#6B7280] leading-relaxed font-normal">
          NexServe was founded with a single mission: to deliver luxury salon & wellness experiences straight to your personal sanctuary with 100% sealed mono-dose hygiene kits and certified top 1% professionals.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <StatCard title="Happy Customers" value="20,000+" icon={<Users className="w-6 h-6 text-[#FF2E7A]" />} />
        <StatCard title="Active Professionals" value="500+" icon={<Award className="w-6 h-6 text-purple-600" />} />
        <StatCard title="Average Rating" value="4.9★" icon={<Sparkles className="w-6 h-6 text-amber-500" />} />
        <StatCard title="Cities Covered" value="30+" icon={<ShieldCheck className="w-6 h-6 text-emerald-600" />} />
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
          <div className="p-3.5 rounded-2xl bg-pink-50 text-[#FF2E7A] w-fit">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-xl font-bold text-[#111827]">100% Sealed Mono-Dose Kits</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Every product sachet is single-use and opened in front of the customer to eliminate cross-contamination risk.
          </p>
        </div>

        <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
          <div className="p-3.5 rounded-2xl bg-purple-50 text-purple-600 w-fit">
            <Award size={28} />
          </div>
          <h3 className="text-xl font-bold text-[#111827]">Top 1% Certified Beauticians</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Rigorous 5-stage background checks, trade skill tests, and etiquette training before onboarding.
          </p>
        </div>

        <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
          <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600 w-fit">
            <Heart size={28} />
          </div>
          <h3 className="text-xl font-bold text-[#111827]">Complete Post-Service Cleanup</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Our beauticians carry disposable mats and cleanup gear so your home remains spotless after every treatment.
          </p>
        </div>
      </div>
    </div>
  );
};
