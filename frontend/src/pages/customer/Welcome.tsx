import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { bookingApi } from '@/api/booking';
import { notificationApi } from '@/api/notification';
import { Booking, Notification } from '@/types';
import { BookingCard } from '@/components/cards/BookingCard';
import { ServiceCard } from '@/components/cards/ServiceCard';
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
  Bot,
  Crown,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Loader } from '@/components/common/Loader';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDateTime } from '@/utils/formatters';

export const CustomerWelcome: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([bookingApi.getMyBookings(), notificationApi.getNotifications()])
      .then(([bData, nData]) => {
        setBookings(bData);
        setNotifications(nData);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader message="Loading your customer sanctuary..." />;

  const upcomingBookings = bookings.filter((b) => b.status === 'ACCEPTED' || b.status === 'ONGOING' || b.status === 'PENDING');
  const completedBookings = bookings.filter((b) => b.status === 'COMPLETED');
  const featuredUpcoming = upcomingBookings[0];

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const quickActions = [
    { title: '✨ AI Concierge', path: '/ai-concierge', icon: Bot, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: '👑 Premium VIP', path: '/customer/membership', icon: Crown, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: '🎁 Refer & Earn', path: '/customer/referral', icon: Gift, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Book Treatment', path: '/services', icon: Sparkles, color: 'text-[#FF2E7E]', bg: 'bg-pink-50' },
    { title: 'Track Session', path: '/customer/bookings', icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Wallet Balance', path: '/customer/wallet', icon: WalletIcon, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const recentReviews = [
    {
      name: 'Ananya Rao',
      rating: 5,
      comment: 'The Diamond Hydra-Facial beautician was extremely professional. Single-use sachet opened live!',
      date: 'July 24, 2026',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Sneha Verma',
      rating: 5,
      comment: 'Hair Spa session at home saved so much travel time. Complete floor cleanup done afterwards!',
      date: 'July 22, 2026',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    },
  ];

  return (
    <div className="space-y-10 bg-[#FFFDFE] text-[#111827] pb-16 relative">
      {/* 1. WELCOME GREETING HERO BAR */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel p-8 md:p-10 relative overflow-hidden bg-gradient-to-br from-pink-50/90 via-rose-50/40 to-white border border-[#ECECEC] shadow-2xl shadow-[#FF2E7E]/10"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-pink-200 text-[#FF2E7E] text-xs font-bold shadow-xs">
              <Sparkles size={14} />
              <span>NexServe Preferred Customer • {currentDate}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
              Welcome back, {user?.firstName || 'Arvind'}! 👋
            </h1>
            <p className="text-sm text-[#64748B] max-w-xl font-normal leading-relaxed">
              Here is what is happening with your doorstep beauty appointments today.
            </p>
          </div>

          <Link
            to="/ai-concierge"
            className="gradient-btn h-[52px] px-7 text-sm font-bold rounded-full shrink-0 shadow-lg shadow-[#FF2E7E]/25"
          >
            <span>Ask AI Beauty Concierge</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>

      {/* 2. QUICK STATISTICS BAR (4 Floating 24px Glass Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-[#ECECEC] shadow-xl shadow-[#FF2E7E]/5 space-y-3 hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B]">Upcoming Sessions</span>
            <div className="p-2.5 rounded-2xl bg-pink-50 text-[#FF2E7E]"><Calendar size={20} /></div>
          </div>
          <h3 className="text-3xl font-extrabold text-[#111827]">{upcomingBookings.length}</h3>
          <span className="text-[11px] font-bold text-emerald-600 block">✓ Confirmed Slots</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#ECECEC] shadow-xl shadow-[#FF2E7E]/5 space-y-3 hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B]">Completed Services</span>
            <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600"><CheckCircle2 size={20} /></div>
          </div>
          <h3 className="text-3xl font-extrabold text-[#111827]">{completedBookings.length}</h3>
          <span className="text-[11px] font-bold text-purple-600 block">100% Satisfaction</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#ECECEC] shadow-xl shadow-[#FF2E7E]/5 space-y-3 hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B]">Wallet Balance</span>
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600"><WalletIcon size={20} /></div>
          </div>
          <h3 className="text-3xl font-extrabold text-[#111827]">₹2,450</h3>
          <span className="text-[11px] font-bold text-[#FF2E7E] block">+₹250 Cashback Earned</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#ECECEC] shadow-xl shadow-[#FF2E7E]/5 space-y-3 hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B]">Reward Points</span>
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600"><Award size={20} /></div>
          </div>
          <h3 className="text-3xl font-extrabold text-[#111827]">850 PTS</h3>
          <span className="text-[11px] font-bold text-amber-600 block">Tier: Gold Concierge</span>
        </div>
      </div>

      {/* 3. QUICK ACTIONS GRID (6 Shortcuts) */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#111827]">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((act, i) => {
            const Icon = act.icon;
            return (
              <Link
                key={i}
                to={act.path}
                className="p-5 rounded-3xl bg-white border border-[#ECECEC] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center justify-center text-center space-y-2.5 group"
              >
                <div className={`p-3.5 rounded-2xl ${act.bg} ${act.color} group-hover:scale-110 transition-transform`}>
                  <Icon size={22} />
                </div>
                <span className="text-xs font-bold text-[#111827]">{act.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4. UPCOMING BOOKING FEATURED CARD */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#111827]">Upcoming Active Session</h3>
          <Link to="/customer/bookings" className="text-xs font-bold text-[#FF2E7E] hover:underline flex items-center gap-1">
            <span>View All Bookings</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {upcomingBookings.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border border-[#ECECEC] shadow-xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-[#111827]">No Active Sessions Today</h4>
            <p className="text-xs text-[#64748B]">Treat yourself to a hydra-facial or hair spa session right at home.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingBookings.slice(0, 1).map((b) => (
              <BookingCard key={b.id} booking={b} />
            ))}
          </div>
        )}
      </div>

      {/* 5. EXCLUSIVE OFFERS BANNER */}
      <div className="p-8 rounded-[32px] bg-gradient-to-r from-purple-900 via-slate-900 to-pink-950 text-white shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 z-10 text-center sm:text-left">
          <Badge variant="purple">FESTIVAL SPECIAL</Badge>
          <h3 className="text-2xl sm:text-3xl font-extrabold">25% OFF Your Next Hydra-Facial</h3>
          <p className="text-xs text-slate-300 max-w-md">Use promo code <strong className="text-pink-400">LUXURY25</strong> at checkout. Valid on all certified partner sessions.</p>
        </div>
        <Link to="/services" className="gradient-btn h-12 px-6 text-xs font-bold rounded-full shrink-0 z-10">
          <span>Claim Offer</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* 6. RECOMMENDED SERVICES GRID */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#111827]">Recommended Doorstep Treatments</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_SERVICES.slice(0, 4).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};
