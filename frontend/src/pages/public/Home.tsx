import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ShieldCheck,
  Star,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  Calendar,
  HelpCircle,
  RefreshCw,
  Gift,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { homeApi, HomeDataResponse } from '@/api/home.api';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { SkeletonLoader } from '@/components/common/SkeletonLoader';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/Button';

export const Home: React.FC = () => {
  const [homeData, setHomeData] = useState<HomeDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchHomeContent = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await homeApi.getHomeData();
      setHomeData(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeContent();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-12 pb-20 pt-6 px-4">
        <SkeletonLoader type="banner" />
        <SkeletonLoader type="card" count={4} />
      </div>
    );
  }

  if (isError || !homeData) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <EmptyState
          iconType="calendar"
          title="Could Not Connect to Database API"
          description="We encountered an issue fetching live platform data. Please retry."
        />
        <Button variant="primary" onClick={fetchHomeContent} leftIcon={<RefreshCw size={16} />}>
          Retry Connection
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-24 bg-[#FFFDFE] text-[#111827] relative overflow-hidden">
      {/* Soft Ambient Radial Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-pink-100/40 via-rose-50/20 to-transparent blur-3xl pointer-events-none" />

      {/* 1. DYNAMIC HERO BANNER */}
      <section className="relative pt-8 max-w-7xl mx-auto px-4">
        <div className="p-8 md:p-16 rounded-[40px] bg-gradient-to-br from-pink-500/90 via-[#FF2E7E] to-purple-900 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-6 max-w-2xl text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold shadow-xs">
              <Sparkles size={16} />
              <span>100% Sealed Mono-Dose Hygiene Promise</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {homeData.heroBanner.title}
            </h1>

            <p className="text-sm sm:text-base text-pink-100 font-normal leading-relaxed">
              {homeData.heroBanner.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/services"
                className="w-full sm:w-auto h-[58px] px-8 rounded-full bg-white text-[#FF2E7E] hover:bg-pink-50 text-sm font-extrabold shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-105"
              >
                <span>{homeData.heroBanner.ctaText}</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/ai-concierge"
                className="w-full sm:w-auto h-[58px] px-8 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md text-sm font-extrabold flex items-center justify-center gap-2"
              >
                <Sparkles size={18} />
                <span>Ask AI Beauty Concierge</span>
              </Link>
            </div>
          </div>

          <div className="relative z-10 w-full max-w-md shrink-0">
            <img
              src={homeData.heroBanner.backgroundImage}
              alt="Hero Sanctuary"
              className="w-full h-80 sm:h-96 rounded-[32px] object-cover border-4 border-white/30 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC PLATFORM STATISTICS BAR */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl text-center space-y-2">
            <h3 className="text-3xl font-extrabold text-[#FF2E7E]">{homeData.statistics.happyCustomers}</h3>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Happy Customers</span>
          </div>

          <div className="p-6 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl text-center space-y-2">
            <h3 className="text-3xl font-extrabold text-purple-600">{homeData.statistics.verifiedBeauticians}</h3>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">5-Stage Verified Beauticians</span>
          </div>

          <div className="p-6 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl text-center space-y-2">
            <h3 className="text-3xl font-extrabold text-emerald-600">{homeData.statistics.completedBookings}</h3>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Doorstep Sessions Delivered</span>
          </div>

          <div className="p-6 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl text-center space-y-2">
            <h3 className="text-3xl font-extrabold text-amber-500">{homeData.statistics.averageRating}</h3>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Average Satisfaction Score</span>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">Browse Treatment Categories</h2>
            <p className="text-xs text-[#64748B] font-semibold mt-1">Explore certified doorstep salon & wellness experiences</p>
          </div>
          <Link to="/services" className="text-xs font-bold text-[#FF2E7E] hover:underline flex items-center gap-1">
            <span>View Full Menu</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {homeData.categories.map((cat: any) => (
            <Link
              key={cat.id}
              to={`/services?category=${encodeURIComponent(cat.title)}`}
              className="p-5 rounded-[28px] bg-white border border-[#ECECEC] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center justify-center text-center space-y-3 group"
            >
              <img src={cat.image} alt={cat.title} className="w-14 h-14 rounded-2xl object-cover border border-[#ECECEC] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-[#111827]">{cat.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. DYNAMIC FEATURED SERVICES */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="px-3 py-1 rounded-full bg-pink-50 text-[#FF2E7E] text-xs font-bold border border-pink-200">
              ✨ Customer Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-2">Featured Doorstep Treatments</h2>
          </div>
          <Link to="/services" className="text-xs font-bold text-[#FF2E7E] hover:underline flex items-center gap-1">
            <span>Explore All Services</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeData.featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* 5. DYNAMIC CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
            ★ Verified Community Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">Loved by Thousands of Customers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {homeData.customerReviews.map((rev) => (
            <div key={rev.id} className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={rev.image} alt={rev.name} className="w-12 h-12 rounded-full object-cover border border-pink-200" />
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">{rev.name}</h4>
                    <span className="text-[11px] text-[#64748B] font-medium">{rev.serviceName} • {rev.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                  <Star size={16} className="fill-amber-400" /> {rev.rating}.0★
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. DYNAMIC FAQS */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <HelpCircle className="w-10 h-10 text-[#FF2E7E] mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {homeData.faqs.map((faq, i) => (
            <div key={i} className="p-6 rounded-[28px] bg-white border border-[#ECECEC] shadow-md space-y-2">
              <h4 className="text-base font-bold text-[#111827]">{faq.question}</h4>
              <p className="text-xs text-[#64748B] leading-relaxed font-medium">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
