import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, DollarSign, Calendar, ShieldCheck, ArrowRight, Star, Users, Award, TrendingUp, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BecomeProfessional: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const stats = [
    { label: 'Active Professionals', value: '500+', icon: Users, color: 'text-[#FF2E7A]', bg: 'bg-pink-50' },
    { label: 'Monthly Earnings', value: '₹75,000+', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Average Rating', value: '4.9★', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Monthly Bookings', value: '20,000+', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: 'Higher Earnings',
      desc: 'Keep up to 85% of every booking price. Receive weekly automatic payouts directly into your bank account without delay.',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
    },
    {
      icon: Calendar,
      title: 'Flexible Schedule',
      desc: 'Choose your own working days, set custom service radius, and toggle online/offline availability instantly from your partner app.',
      color: 'text-[#FF2E7A]',
      bg: 'bg-pink-50',
    },
    {
      icon: ShieldCheck,
      title: 'Verified Platform & Supply',
      desc: 'Get branded GlowHome uniforms, mono-dose product supply discounts, background verification, and safety gear upon approval.',
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
  ];

  const steps = [
    { num: '01', title: 'Apply Online', desc: 'Fill your basic details, salon name, and service categories.' },
    { num: '02', title: 'Upload Documents', desc: 'Submit Aadhaar, PAN card, bank details & beauty certification.' },
    { num: '03', title: 'Verification Audit', desc: 'Admin background check and hygiene standard verification.' },
    { num: '04', title: 'Profile Approval', desc: 'Receive your Verified Partner badge and starter kit.' },
    { num: '05', title: 'Start Earning', desc: 'Accept doorstep booking requests and grow your revenue.' },
  ];

  const testimonials = [
    {
      name: 'Pooja Sharma',
      city: 'Bengaluru',
      role: 'Hydra-Facial & Makeup Artist',
      earnings: '₹85,000/mo',
      quote: 'I doubled my monthly income within 3 months of joining GlowHome. The weekly direct bank deposits and respectful clients are amazing!',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Sunita Patel',
      city: 'Mumbai',
      role: 'Hair Styling Specialist',
      earnings: '₹72,000/mo',
      quote: 'Flexible working hours allow me to manage my family while earning a great income. GlowHome handles client acquisition completely.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Anita Roy',
      city: 'Delhi NCR',
      role: 'Bridal Makeover Expert',
      earnings: '₹90,000/mo',
      quote: 'The mono-dose product kits and client trust make GlowHome superior. Booking volume is continuous throughout the year.',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80',
    },
  ];

  const faqs = [
    {
      q: 'How much commission does GlowHome charge?',
      a: 'GlowHome operates on a fair 15% platform commission. You keep 85% of every completed service booking price.',
    },
    {
      q: 'When and how do I get paid?',
      a: 'Payouts are processed automatically every Monday directly into your verified bank account for all completed bookings of the week.',
    },
    {
      q: 'What documents are required for verification?',
      a: 'You need a valid Government ID (Aadhaar or PAN Card), Bank Passbook/Cancelled Cheque, and beauty or spa training certificate.',
    },
    {
      q: 'Can I work part-time or choose custom working hours?',
      a: 'Yes! You have 100% control over your calendar. Toggle your online status and set available time slots whenever suits your schedule.',
    },
    {
      q: 'Do I get to select my own service radius?',
      a: 'Yes, you can configure your operating city radius (e.g. 5km to 15km) from your partner app to receive nearby bookings only.',
    },
  ];

  return (
    <div className="space-y-28 md:space-y-32 pb-20 bg-[#FFF8FB] text-[#111827] relative overflow-hidden">
      {/* Ambient Floating Pink Glow Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#FF5FA2]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#FF2E7A]/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. HERO SECTION (Unified 32px Glass Banner) */}
      <section className="w-[94%] max-w-[1440px] mx-auto rounded-[32px] overflow-hidden relative border border-[#ECECEC] bg-white/90 shadow-2xl shadow-[#FF2E7A]/10 my-4 backdrop-blur-2xl">
        <div className="p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-7"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-100 text-[#FF2E7A] text-xs font-extrabold shadow-xs">
              <Sparkles size={14} className="text-[#FF2E7A]" />
              <span>Partner Onboarding Portal</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-[60px] font-extrabold tracking-tight text-[#111827] leading-[1.1]">
              Grow Your Salon Business With <br />
              <span className="gradient-text">GlowHome Partner Network</span>
            </h1>

            <p className="text-[#6B7280] text-base md:text-lg max-w-[580px] leading-relaxed font-normal">
              Earn up to <strong className="text-[#111827] font-bold">₹75,000/month</strong> as an independent beautician or spa vendor. Flexible working hours, instant bank payouts, and premium client leads.
            </p>

            {/* Centered 380px CTA Button */}
            <div className="space-y-3">
              <Link
                to="/vendor/register"
                className="gradient-btn h-[58px] w-full max-w-[380px] text-sm font-bold rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#FF2E7A]/25"
              >
                <span>Register Your Business Now</span>
                <ArrowRight size={18} />
              </Link>
              <p className="text-xs text-[#6B7280] font-medium pl-2">
                ✓ No upfront onboarding fees • Weekly payouts • Free starter kit
              </p>
            </div>
          </motion.div>

          {/* Right Column (Hero Visual with Soft Pink Circle & Glass Badge) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
            transition={{ opacity: { duration: 0.6 }, y: { repeat: Infinity, duration: 4, ease: 'easeInOut' } }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Soft Pink Circle Frame */}
            <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#FF2E7A]/20 to-[#FF5FA2]/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl pointer-events-none" />

            <div className="relative rounded-[32px] overflow-hidden border-4 border-white shadow-2xl shadow-[#FF2E7A]/15 max-w-md">
              <img
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80"
                alt="GlowHome Verified Beauty Professional"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>

            {/* Floating Glass Earnings Badge */}
            <div className="absolute -bottom-4 left-4 p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#ECECEC] shadow-xl flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
                <TrendingUp size={22} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Average Earnings</span>
                <span className="text-lg font-extrabold text-[#111827]">₹75,000 / Month</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. PARTNER STATISTICS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-2xl shadow-[#FF2E7A]/5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex items-center gap-4 border-r border-[#ECECEC] last:border-0 pr-4">
                <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.color} shadow-xs`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">{stat.value}</h3>
                  <p className="text-xs text-[#6B7280] font-semibold">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. BENEFIT CARDS (32px Glass Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
            Why Partner With GlowHome?
          </h2>
          <p className="text-sm text-[#6B7280]">
            We provide everything you need to scale your salon revenue and client reach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="glass-card p-8 bg-white border border-[#ECECEC] rounded-[32px] space-y-4 hover:-translate-y-1.5 transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl ${b.bg} ${b.color} flex items-center justify-center`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#111827]">{b.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed font-normal">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. 5-STEP JOINING PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
            5 Simple Steps to Join
          </h2>
          <p className="text-sm text-[#6B7280]">Get verified and start receiving doorstep bookings in under 24 hours.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="p-6 rounded-[32px] bg-white border border-[#ECECEC] shadow-md space-y-3 relative group hover:-translate-y-1 transition-transform"
            >
              <span className="text-3xl font-extrabold text-pink-200 group-hover:text-[#FF2E7A] transition-colors">
                {step.num}
              </span>
              <h4 className="text-base font-bold text-[#111827]">{step.title}</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PROFESSIONAL TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
            Partner Success Stories
          </h2>
          <p className="text-sm text-[#6B7280]">Hear from real independent beauticians thriving on GlowHome.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card p-6 bg-white border border-[#ECECEC] rounded-[32px] space-y-4">
              <div className="flex items-center gap-3">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-pink-200" />
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-[#111827]">{t.name}</h4>
                  <p className="text-xs text-[#6B7280] font-medium">{t.role} • {t.city}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  {t.earnings}
                </span>
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PARTNER FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight flex items-center justify-center gap-3">
            <HelpCircle className="text-[#FF2E7A]" size={36} />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-sm text-[#6B7280]">Everything you need to know about partner onboarding</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div
                key={i}
                className="rounded-[32px] bg-white border border-[#ECECEC] shadow-md overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-[#111827] text-sm hover:text-[#FF2E7A] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={20} className="text-[#FF2E7A]" /> : <ChevronDown size={20} className="text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs text-[#6B7280] leading-relaxed border-t border-slate-50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 md:p-16 rounded-[32px] bg-gradient-to-br from-[#FF2E7A] to-[#FF5FA2] text-white text-center space-y-6 shadow-2xl shadow-[#FF2E7A]/25">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md">
            <Sparkles size={14} />
            <span>Join 500+ Top Professionals Today</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Ready to Grow Your Beauty Business?
          </h2>

          <p className="text-sm text-pink-100 max-w-xl mx-auto leading-relaxed font-normal">
            Start receiving doorstep booking requests in your city. Weekly payouts, guaranteed client safety, and premium brand recognition.
          </p>

          <div className="pt-2 flex justify-center">
            <Link
              to="/vendor/register"
              className="px-8 h-[58px] bg-white hover:bg-slate-50 text-[#FF2E7A] text-base font-bold rounded-full flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all w-full max-w-[380px]"
            >
              <span>Become a Partner</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
