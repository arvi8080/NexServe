import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useCountry } from '@/context/CountryContext';
import { bookingApi } from '@/api/booking';
import { customerApi, CustomerDashboardStats } from '@/api/customer.api';
import { Booking, Service } from '@/types';
import { MOCK_SERVICES } from '@/services/mockDataService';
import {
  Calendar,
  Bell,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Wallet as WalletIcon,
  Award,
  Clock,
  Star,
  Search,
  MapPin,
  Phone,
  MessageSquare,
  Gift,
  Heart,
  Tag,
  ShieldCheck,
  UserCheck,
  TrendingUp,
  RotateCcw,
  Navigation,
  HelpCircle,
  XCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Loader } from '@/components/common/Loader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const CustomerWelcome: React.FC = () => {
  const { user } = useAuth();
  const { selectedCountry, formatPrice } = useCountry();
  const [stats, setStats] = useState<CustomerDashboardStats | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [wishlist, setWishlist] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate Dynamic Time-of-Day Greeting
  const currentHour = new Date().getHours();
  const timeGreeting = currentHour < 12 ? 'Good Morning' : currentHour < 17 ? 'Good Afternoon' : 'Good Evening';

  useEffect(() => {
    Promise.all([
      customerApi.getDashboardStats(),
      bookingApi.getMyBookings(),
      customerApi.getWishlist(),
    ])
      .then(([stData, bData, wData]) => {
        setStats(stData);
        setBookings(bData);
        setWishlist(wData);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader message="Hydrating customer command center telemetry..." />;

  const upcomingBooking = bookings.find((b) => b.status === 'ACCEPTED' || b.status === 'ONGOING' || b.status === 'PENDING');

  const statCards = [
    { title: 'Upcoming Bookings', value: stats?.upcomingBookingsCount || 0, icon: Calendar, color: 'text-pink-600', bg: 'bg-pink-50' },
    { title: 'Active Sessions', value: stats?.activeBookingsCount || 0, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Completed Sessions', value: stats?.completedBookingsCount || 0, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Cancelled Sessions', value: stats?.cancelledBookingsCount || 0, icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
    { title: 'Wallet Balance', value: formatPrice(stats?.walletBalance || 0), icon: WalletIcon, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Saved Wishlist', value: wishlist.length, icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
    { title: 'Total Reviews Given', value: stats?.totalReviewsCount || 0, icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8 pb-20 bg-[#FFFDFE] text-[#111827]">
      {/* 1. DYNAMIC TIME-OF-DAY GREETING & CUSTOMER PROFILE BANNER */}
      <div className="p-8 md:p-10 rounded-[36px] bg-gradient-to-br from-[#111827] via-slate-900 to-pink-950 text-white shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={
                user?.profileImage ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
              }
              alt={user?.firstName}
              className="w-20 h-20 rounded-3xl object-cover border-2 border-[#FF2E7E] shadow-xl shrink-0"
            />
            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-white/10 text-pink-200 text-[10px] font-extrabold uppercase font-mono tracking-wider">
                GLOWHOME VIP MEMBER • {selectedCountry.name} ({selectedCountry.flag})
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight">
                {timeGreeting}, {user?.firstName || 'Valued Customer'}! ✨
              </h1>
              <p className="text-xs text-slate-300 font-medium">
                Welcome back to your luxury home services sanctuary.
              </p>
            </div>
          </div>

          <Link to="/services">
            <Button variant="primary" leftIcon={<Search size={16} />} className="h-12 px-6 rounded-2xl text-xs font-bold shadow-xl">
              Browse Treatment Catalog
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. REAL STATISTICAL TELEMETRY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="p-5 rounded-[28px] bg-white border border-[#ECECEC] shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{card.title}</span>
                <div className={`p-2.5 rounded-2xl ${card.bg} ${card.color}`}>
                  <Icon size={18} />
                </div>
              </div>
              <span className="text-2xl font-extrabold text-[#111827] block">{card.value}</span>
            </div>
          );
        })}
      </div>

      {/* 3. QUICK ACTION HUBS */}
      <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
        <h3 className="text-base font-extrabold text-[#111827]">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <Link
            to="/services"
            className="p-5 rounded-3xl bg-pink-50/60 border border-pink-100 hover:border-pink-300 transition-all text-center space-y-2 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FF2E7E] text-white mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Search size={20} />
            </div>
            <span className="text-xs font-bold text-slate-900 block">Book Service</span>
          </Link>

          <Link
            to="/customer/bookings"
            className="p-5 rounded-3xl bg-purple-50/60 border border-purple-100 hover:border-purple-300 transition-all text-center space-y-2 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <RotateCcw size={20} />
            </div>
            <span className="text-xs font-bold text-slate-900 block">Repeat Booking</span>
          </Link>

          <Link
            to={upcomingBooking ? `/customer/bookings/${upcomingBooking.id}` : '/customer/bookings'}
            className="p-5 rounded-3xl bg-emerald-50/60 border border-emerald-100 hover:border-emerald-300 transition-all text-center space-y-2 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Navigation size={20} />
            </div>
            <span className="text-xs font-bold text-slate-900 block">Track Booking</span>
          </Link>

          <Link
            to="/customer/wallet"
            className="p-5 rounded-3xl bg-amber-50/60 border border-amber-100 hover:border-amber-300 transition-all text-center space-y-2 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <WalletIcon size={20} />
            </div>
            <span className="text-xs font-bold text-slate-900 block">My Wallet</span>
          </Link>

          <Link
            to="/customer/support"
            className="p-5 rounded-3xl bg-blue-50/60 border border-blue-100 hover:border-blue-300 transition-all text-center space-y-2 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <HelpCircle size={20} />
            </div>
            <span className="text-xs font-bold text-slate-900 block">Help & Support</span>
          </Link>
        </div>
      </div>

      {/* 4. RECOMMENDED TREATMENTS & RECENT ACTIVITY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommended Services */}
        <div className="lg:col-span-2 p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
            <div>
              <h3 className="text-base font-extrabold text-[#111827]">Recommended For You</h3>
              <p className="text-xs text-slate-500 font-medium">Curated doorstep treatments in {selectedCountry.name}</p>
            </div>
            <Link to="/services" className="text-xs font-bold text-[#FF2E7E] hover:underline flex items-center gap-1">
              View All Catalog <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_SERVICES.slice(0, 4).map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="p-4 rounded-3xl bg-slate-50 border border-slate-200 hover:border-pink-300 transition-all space-y-3 block"
              >
                <img
                  src={service.image || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=300&q=80'}
                  alt={service.title}
                  className="w-full h-32 object-cover rounded-2xl"
                />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-[#111827] truncate">{service.title}</h4>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-[#FF2E7E]">{formatPrice(service.price)}</span>
                    <span className="text-slate-400 font-medium">{service.duration} Mins</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
          <h3 className="text-base font-extrabold text-[#111827] border-b border-[#ECECEC] pb-4">
            Recent Activity Log
          </h3>

          <div className="space-y-4">
            {stats?.recentActivity.map((act) => (
              <div key={act.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#111827]">
                  <span>{act.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">Just Now</span>
                </div>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{act.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
