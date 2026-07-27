import React, { useState, useEffect } from 'react';
import { vendorApi } from '@/api/vendor';
import { bookingApi } from '@/api/booking';
import { Vendor, Booking } from '@/types';
import {
  DollarSign,
  Calendar as CalendarIcon,
  Star,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Navigation,
  MessageSquare,
  Phone,
  Play,
  Check,
  X,
  MapPin,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Zap,
  TrendingDown,
  Sun,
  Umbrella,
} from 'lucide-react';
import { formatCurrency, formatDateTime } from '@/utils/formatters';
import { Badge } from '@/components/ui/Badge';
import { Loader } from '@/components/common/Loader';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const VendorDashboard: React.FC = () => {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [vacationMode, setVacationMode] = useState(false);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(27);
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    Promise.all([vendorApi.getVendorProfile(), bookingApi.getVendorBookings()])
      .then(([vData, bData]) => {
        setVendor(vData);
        setBookings(bData);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleUpdateStatus = async (bookingId: string, status: 'ACCEPTED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED') => {
    try {
      await bookingApi.updateBookingStatus(bookingId, status);
      setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status } : b)));
      showToast('Status Updated', `Booking status set to ${status}.`, 'success');
    } catch {
      showToast('Error', 'Could not update booking status.', 'error');
    }
  };

  if (isLoading) return <Loader message="Loading world-class partner operations center..." />;

  const todayBookings = bookings.filter((b) => b.status === 'ACCEPTED' || b.status === 'ONGOING' || b.status === 'PENDING');
  const completedBookingsCount = 142;

  const kpis = [
    { title: "Today's Appointments", value: `${todayBookings.length || 6} Scheduled`, icon: CalendarIcon, color: "text-[#FF2E7E]", bg: "bg-pink-50", trend: "+2 vs yesterday", positive: true },
    { title: "Monthly Earnings", value: "₹85,000", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50", trend: "+24% vs last month", positive: true },
    { title: "Completed Jobs", value: `${completedBookingsCount} Done`, icon: CheckCircle2, color: "text-purple-600", bg: "bg-purple-50", trend: "100% On Time", positive: true },
    { title: "Average Rating", value: `${vendor?.averageRating || 4.9}★`, icon: Star, color: "text-amber-500", bg: "bg-amber-50", trend: "128 Verified Reviews", positive: true },
    { title: "Pending Requests", value: "2 New Leads", icon: Clock, color: "text-blue-600", bg: "bg-blue-50", trend: "Needs Acceptance", positive: true },
    { title: "Active Wallet Balance", value: "₹12,400", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50", trend: "Payout Mon Jul 28", positive: true },
  ];

  const timelineSchedule = [
    {
      time: '09:00 AM',
      service: 'HD Airbrush Bridal Party Makeup',
      customer: 'Priya Sharma',
      phone: '+91 98765 12345',
      location: 'Flat 402, Sterling Residency, Indiranagar, Bengaluru',
      duration: '90 Mins',
      status: 'ONGOING',
      amount: 4999,
      id: 'b1',
    },
    {
      time: '11:30 AM',
      service: 'Herbal Keratin Scalp Hair Spa',
      customer: 'Kavya Nair',
      phone: '+91 98765 67890',
      location: 'House 12, 5th Cross, Koramangala, Bengaluru',
      duration: '60 Mins',
      status: 'ACCEPTED',
      amount: 1299,
      id: 'b2',
    },
    {
      time: '03:00 PM',
      service: 'Diamond Hydra-Glow Facial',
      customer: 'Ananya Rao',
      phone: '+91 98765 54321',
      location: 'Villa 8, Palm Meadows, Whitefield, Bengaluru',
      duration: '60 Mins',
      status: 'PENDING',
      amount: 1499,
      id: 'b3',
    },
  ];

  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-10 bg-[#FFFDFE] text-[#111827] pb-28 relative">
      {/* Soft Ambient Radial Globs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#FF5CA8]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Greeting Banner */}
      <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-[#111827]">Good Morning, Arvind 👋</h1>
            <Badge variant={vendor?.status === 'APPROVED' ? 'success' : 'warning'}>
              {vendor?.status === 'APPROVED' ? 'VERIFIED PARTNER' : 'VERIFICATION PENDING'}
            </Badge>
          </div>
          <p className="text-xs text-[#64748B] font-semibold">
            Monday, July 27, 2026 • Doorstep Beauty Command Center
          </p>
        </div>

        {/* Header Search & Live Controls */}
        <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search appointments, clients..."
              className="w-full h-10 pl-10 pr-4 rounded-full bg-slate-50 border border-[#ECECEC] text-xs font-medium focus:outline-none focus:border-[#FF2E7E]"
            />
          </div>

          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`h-10 px-4 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isOnline ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-200 text-slate-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white animate-pulse' : 'bg-slate-500'}`} />
            <span>{isOnline ? 'LIVE ONLINE' : 'OFFLINE'}</span>
          </button>

          <button
            onClick={() => setVacationMode(!vacationMode)}
            className={`h-10 px-4 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              vacationMode ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Umbrella size={14} />
            <span>{vacationMode ? 'VACATION ON' : 'HOLIDAY MODE'}</span>
          </button>
        </div>
      </div>

      {/* 6 World-Class Dashboard KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="p-5 rounded-[28px] bg-white border border-[#ECECEC] shadow-xl shadow-[#FF2E7E]/5 space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#64748B]">{kpi.title}</span>
                <div className={`p-2 rounded-xl ${kpi.bg} ${kpi.color}`}><Icon size={16} /></div>
              </div>
              <h3 className="text-2xl font-extrabold text-[#111827]">{kpi.value}</h3>
              <span className="text-[10px] font-bold text-emerald-600 block">{kpi.trend}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Main Grid: Today's Timeline Schedule (7 Cols) & Mini Calendar + Quick Analytics (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Today's Timeline Schedule (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
              <h3 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                <Clock className="text-[#FF2E7E]" size={22} />
                <span>Today's Timeline Schedule</span>
              </h3>
              <span className="text-xs font-bold text-slate-500">3 Sessions Pending</span>
            </div>

            {/* Timeline Items */}
            <div className="space-y-6 relative before:absolute before:left-6 before:top-3 before:bottom-3 before:w-0.5 before:bg-pink-100">
              {timelineSchedule.map((item) => (
                <div key={item.id} className="relative pl-12 space-y-3">
                  {/* Timeline Time Pin Dot */}
                  <div className="absolute left-4 top-1 -translate-x-1/2 w-4 h-4 rounded-full bg-[#FF2E7E] ring-4 ring-pink-100" />

                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-pink-100 text-[#FF2E7E] text-xs font-extrabold">
                          {item.time}
                        </span>
                        <h4 className="text-base font-bold text-[#111827]">{item.service}</h4>
                      </div>
                      <Badge variant={item.status === 'ONGOING' ? 'purple' : item.status === 'ACCEPTED' ? 'info' : 'warning'}>
                        {item.status}
                      </Badge>
                    </div>

                    <div className="space-y-1 text-xs text-[#64748B] font-medium">
                      <p className="font-bold text-[#111827]">Client: {item.customer} • {item.duration}</p>
                      <p className="flex items-center gap-1"><MapPin size={14} className="text-[#FF2E7E]" /> {item.location}</p>
                      <p className="text-xs font-extrabold text-[#111827] pt-1">Session Fee: {formatCurrency(item.amount)}</p>
                    </div>

                    {/* Timeline Action Buttons */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60 flex-wrap">
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(item.location)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold flex items-center gap-1.5"
                      >
                        <Navigation size={14} /> GPS Route
                      </a>
                      <a
                        href={`tel:${item.phone}`}
                        className="px-3.5 py-2 rounded-xl bg-slate-200 text-slate-800 hover:bg-slate-300 text-xs font-bold flex items-center gap-1.5"
                      >
                        <Phone size={14} /> Call Client
                      </a>
                      <Link
                        to={`/customer/chat/${item.id}`}
                        className="px-3.5 py-2 rounded-xl bg-pink-50 text-[#FF2E7E] hover:bg-pink-100 text-xs font-bold flex items-center gap-1.5"
                      >
                        <MessageSquare size={14} /> Chat
                      </Link>

                      {item.status === 'PENDING' && (
                        <button
                          onClick={() => handleUpdateStatus(item.id, 'ACCEPTED')}
                          className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 cursor-pointer ml-auto"
                        >
                          Accept
                        </button>
                      )}
                      {item.status === 'ACCEPTED' && (
                        <button
                          onClick={() => handleUpdateStatus(item.id, 'ONGOING')}
                          className="px-4 py-2 rounded-xl bg-[#FF2E7E] text-white text-xs font-bold hover:bg-[#FF2E7E]/90 cursor-pointer ml-auto"
                        >
                          Start Service
                        </button>
                      )}
                      {item.status === 'ONGOING' && (
                        <button
                          onClick={() => handleUpdateStatus(item.id, 'COMPLETED')}
                          className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 cursor-pointer ml-auto"
                        >
                          Complete Service
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Mini Calendar & Slot Config (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Monthly Mini Calendar */}
          <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
              <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
                <CalendarIcon className="text-[#FF2E7E]" size={18} />
                <span>July 2026 Schedule</span>
              </h3>
              <div className="flex items-center gap-1 text-slate-400">
                <button className="p-1 hover:text-slate-600"><ChevronLeft size={16} /></button>
                <button className="p-1 hover:text-slate-600"><ChevronRight size={16} /></button>
              </div>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-2">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {calendarDays.map((d) => {
                const isSelected = selectedCalendarDate === d;
                const isBooked = d === 27 || d === 28 || d === 30;
                return (
                  <button
                    key={d}
                    onClick={() => setSelectedCalendarDate(d)}
                    className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white shadow-md'
                        : isBooked
                        ? 'bg-pink-50 text-[#FF2E7E] border border-pink-200'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-around pt-3 border-t border-[#ECECEC] text-[11px] text-[#64748B] font-semibold">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#FF2E7E]" /> Today</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-pink-200" /> Booked Slots</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-200" /> Open</span>
            </div>
          </div>

          {/* Quick Analytics & Performance Overview */}
          <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
            <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
              <Zap className="text-amber-500" size={18} />
              <span>Performance Insights</span>
            </h3>

            <div className="space-y-3 text-xs font-medium">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
                <span className="text-[#64748B]">Peak Booking Hours</span>
                <span className="font-bold text-[#111827]">02:00 PM – 06:00 PM</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
                <span className="text-[#64748B]">Most Booked Treatment</span>
                <span className="font-bold text-[#FF2E7E]">Diamond Hydra Facial</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
                <span className="text-[#64748B]">Repeat Customer Rate</span>
                <span className="font-bold text-emerald-600">84.2% (High Loyalty)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
                <span className="text-[#64748B]">Cancellation Rate</span>
                <span className="font-bold text-emerald-600">1.2% (Top 1%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Quick Actions Bar (Bottom Sticky) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-2xl border border-[#ECECEC] shadow-2xl shadow-[#FF2E7E]/15 rounded-full px-6 py-3 flex items-center gap-3 max-w-2xl w-full justify-around">
        <button
          onClick={() => showToast('Quick Accept', 'Next pending lead accepted.', 'success')}
          className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
        >
          <CheckCircle2 size={16} /> <span>Accept Lead</span>
        </button>
        <span className="text-slate-300">|</span>
        <button
          onClick={() => showToast('GPS Route Started', 'Opening Google Maps navigation.', 'info')}
          className="flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
        >
          <Navigation size={16} /> <span>GPS Route</span>
        </button>
        <span className="text-slate-300">|</span>
        <Link to="/vendor/availability" className="flex items-center gap-1.5 text-xs font-bold text-[#FF2E7E] hover:text-[#FF2E7E]/80">
          <Clock size={16} /> <span>Slots</span>
        </Link>
        <span className="text-slate-300">|</span>
        <Link to="/contact" className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800">
          <AlertCircle size={16} /> <span>Support</span>
        </Link>
      </div>
    </div>
  );
};
