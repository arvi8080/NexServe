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
                to="/become-pro"
                className="w-full sm:w-auto h-[58px] px-8 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md text-sm font-extrabold flex items-center justify-center gap-2"
              >
                <span>Register Your Parlour</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="relative z-10 w-full max-w-md shrink-0">
            <img
              src={homeData.heroBanner.backgroundImage}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/beauty_parlour_hero.jpg';
              }}
              alt="Luxury Vibrant Beauty Parlour"
              className="rounded-3xl shadow-2xl border-4 border-white/20 object-cover aspect-4/3 w-full"
            />
          </div>
        </div>
      </section>

      {/* 2. CATEGORY QUICK FILTERS */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#FF2E7E] uppercase font-mono tracking-wider block">
              TREATMENT CATEGORIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">Explore Home Salon Treatments</h2>
          </div>
          <Link to="/services" className="text-xs font-bold text-[#FF2E7E] hover:underline flex items-center gap-1">
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {homeData.categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/services?category=${cat.title.toUpperCase().replace(/\s+/g, '_')}`}
              className="p-4 rounded-2xl bg-white border border-[#ECECEC] hover:border-[#FF2E7E] hover:shadow-lg transition-all space-y-3 text-center group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl mx-auto overflow-hidden bg-pink-50 border border-pink-100 group-hover:scale-105 transition-transform">
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-extrabold text-[#111827] group-hover:text-[#FF2E7E] block truncate">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED & POPULAR SERVICES */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#FF2E7E] uppercase font-mono tracking-wider block">
              MOST BOOKED
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">Featured Doorstep Treatments</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeData.featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
};
