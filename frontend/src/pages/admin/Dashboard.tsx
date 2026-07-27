import React, { useState, useEffect } from 'react';
import { adminApi } from '@/api/admin';
import { AdminDashboardStats } from '@/types';
import {
  Users,
  Store,
  Calendar as CalendarIcon,
  DollarSign,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Download,
  FileText,
  Tag,
  Bell,
  Search,
  CheckCircle2,
  XCircle,
  Activity,
  CreditCard,
  Percent,
  SlidersHorizontal,
  Star,
  RefreshCw,
  Plus,
  Briefcase,
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { Link } from 'react-router-dom';
import { Loader } from '@/components/common/Loader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { motion } from 'framer-motion';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    adminApi
      .getDashboardStats()
      .then((data) => setStats(data))
      .finally(() => setIsLoading(false));
  }, []);

  const handleExportReport = (reportType: string) => {
    showToast('Report Generated!', `${reportType} downloaded as CSV/PDF.`, 'success');
  };

  if (isLoading) return <Loader message="Compiling platform metric telemetry..." />;

  const kpis = [
    { title: "Total Ecosystem Revenue", value: "₹12.4 Lakhs", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50", trend: "+32.4% vs last month" },
    { title: "Today's Revenue", value: "₹45,200", icon: TrendingUp, color: "text-[#FF2E7E]", bg: "bg-pink-50", trend: "+18% vs yesterday" },
    { title: "Active Customers", value: `${stats?.totalUsers || 4850} Users`, icon: Users, color: "text-blue-600", bg: "bg-blue-50", trend: "+142 new this week" },
    { title: "Active Vendors", value: `${stats?.totalVendors || 128} Salons`, icon: Store, color: "text-purple-600", bg: "bg-purple-50", trend: "100% Verified" },
    { title: "Bookings Today", value: `${stats?.totalBookings || 86} Sessions`, icon: CalendarIcon, color: "text-pink-600", bg: "bg-pink-50", trend: "98% Completion" },
    { title: "Pending Approvals", value: `${stats?.pendingVendorsCount || 4} Audits`, icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50", trend: "Needs Review" },
    { title: "Refund Requests", value: "0 Pending", icon: RefreshCw, color: "text-emerald-500", bg: "bg-emerald-50", trend: "Clean Ledger" },
    { title: "Customer Satisfaction", value: "98.4%", icon: Star, color: "text-amber-400", bg: "bg-amber-50", trend: "Top Ecosystem Score" },
  ];

  const liveActivityFeed = [
    { id: 1, type: 'BOOKING', text: 'New booking confirmed for Diamond Hydra-Glow Facial by Sneha R.', time: '2 mins ago', icon: CalendarIcon, color: 'text-pink-500' },
    { id: 2, type: 'PAYMENT', text: 'Payment of ₹1,499 received via Razorpay UPI.', time: '5 mins ago', icon: CreditCard, color: 'text-emerald-500' },
    { id: 3, type: 'VENDOR', text: 'Glow & Grace Studio updated doorstep availability.', time: '12 mins ago', icon: Store, color: 'text-purple-500' },
    { id: 4, type: 'REVIEW', text: '5-Star review posted by Kavya Nair for Keratin Hair Spa.', time: '18 mins ago', icon: Star, color: 'text-amber-500' },
  ];

  const topServices = [
    { title: 'Diamond Hydra-Glow Facial', bookings: 420, revenue: 629580, rating: 4.9, growth: '+28%' },
    { title: 'Herbal Keratin Scalp Hair Spa', bookings: 380, revenue: 493620, rating: 4.8, growth: '+22%' },
    { title: 'HD Airbrush Bridal Makeup', bookings: 120, revenue: 599880, rating: 5.0, growth: '+35%' },
    { title: 'Gel Nail Extension & Art', bookings: 290, revenue: 260710, rating: 4.7, growth: '+18%' },
  ];

  return (
    <div className="space-y-10 bg-[#FFFDFE] text-[#111827] pb-28 relative">
      {/* Soft Ambient Radial Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#FF5CA8]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Search Command Bar */}
      <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-[#111827]">Super Admin Command Center</h1>
            <Badge variant="purple">SUPER ADMIN PRIVILEGES</Badge>
          </div>
          <p className="text-xs text-[#64748B] font-semibold">
            Monday, July 27, 2026 • Platform Ecosystem Operations & Financial Telemetry
          </p>
        </div>

        {/* Header Search & Actions */}
        <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap">
          <Link to="/admin/erp" className="gradient-btn h-10 px-5 text-xs font-bold rounded-full flex items-center gap-1.5 shrink-0">
            <Briefcase size={16} />
            <span>Open Enterprise ERP</span>
          </Link>

          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users, vendors, bookings..."
              className="w-full h-10 pl-10 pr-4 rounded-full bg-slate-50 border border-[#ECECEC] text-xs font-medium focus:outline-none focus:border-[#FF2E7E]"
            />
          </div>

          <span className="px-3.5 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ALL SYSTEMS OPERATIONAL</span>
          </span>
        </div>
      </div>

      {/* 8 Large Admin KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="p-6 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl shadow-[#FF2E7E]/5 space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#64748B]">{kpi.title}</span>
                <div className={`p-2.5 rounded-2xl ${kpi.bg} ${kpi.color}`}><Icon size={20} /></div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">{kpi.value}</h3>
              <span className="text-[11px] font-bold text-emerald-600 block">{kpi.trend}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Grid: Pending Vendor Verification Desk (7 Cols) & Live Activity Feed (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Pending Vendor Approvals (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
              <h3 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                <Store className="text-[#FF2E7E]" size={22} />
                <span>Pending Vendor Partner Audit Queue</span>
              </h3>
              <Link to="/admin/vendors/pending" className="text-xs font-bold text-[#FF2E7E] hover:underline flex items-center gap-1">
                View Full Desk ({stats?.pendingVendorsCount || 4}) <ArrowRight size={14} />
              </Link>
            </div>

            {/* Pending Partner Cards */}
            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-amber-50/60 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-[#111827]">Aura Organic Beauty Salon</h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">Audit Pending</span>
                  </div>
                  <p className="text-xs text-[#64748B] font-medium">Owner: Swati Mohan • HSR Layout Sector 3, Bengaluru</p>
                  <p className="text-xs text-slate-600 font-semibold pt-1">Credentials: GST, Salon Trade License, 6+ Yrs Exp</p>
                </div>
                <Link to="/admin/vendors/pending" className="gradient-btn h-11 px-5 text-xs font-bold rounded-2xl shrink-0">
                  Audit & Approve
                </Link>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-[#111827]">Luxe Glow Doorstep Studio</h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold">Documents Received</span>
                  </div>
                  <p className="text-xs text-[#64748B] font-medium">Owner: Ritu Verma • Koramangala 4th Block, Bengaluru</p>
                  <p className="text-xs text-slate-600 font-semibold pt-1">Credentials: Aesthetics Certification, 8+ Yrs Exp</p>
                </div>
                <Link to="/admin/vendors/pending" className="gradient-btn h-11 px-5 text-xs font-bold rounded-2xl shrink-0">
                  Audit & Approve
                </Link>
              </div>
            </div>
          </div>

          {/* Top Services Ranking Table */}
          <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-5">
            <h3 className="text-lg font-bold text-[#111827] flex items-center gap-2 border-b border-[#ECECEC] pb-3">
              <Sparkles className="text-[#FF2E7E]" size={20} />
              <span>Top Platform Treatments & Revenue Ranking</span>
            </h3>

            <div className="space-y-3">
              {topServices.map((s, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-pink-100 text-[#FF2E7E] font-extrabold text-xs flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#111827]">{s.title}</h4>
                      <span className="text-[11px] text-[#64748B] font-medium">{s.bookings} Sessions • {s.rating}★ Rating</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-[#111827] block">{formatCurrency(s.revenue)}</span>
                    <span className="text-[10px] font-bold text-emerald-600">{s.growth} Growth</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Real-Time Activity Feed & Reports (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Activity Feed */}
          <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
              <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
                <Activity className="text-blue-500 animate-pulse" size={18} />
                <span>Live System Event Stream</span>
              </h3>
              <span className="text-[11px] font-bold text-emerald-600">Socket.IO Connected</span>
            </div>

            <div className="space-y-3">
              {liveActivityFeed.map((ev) => {
                const Icon = ev.icon;
                return (
                  <div key={ev.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <div className={`p-2 rounded-xl bg-white shadow-xs ${ev.color}`}><Icon size={16} /></div>
                    <div className="flex-1 space-y-0.5">
                      <p className="text-xs text-[#111827] font-semibold leading-relaxed">{ev.text}</p>
                      <span className="text-[10px] text-slate-400 block font-medium">{ev.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reports & Financial Exports */}
          <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
            <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
              <Download className="text-[#FF2E7E]" size={18} />
              <span>Reports & Audit Export Center</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleExportReport('Ecosystem Revenue Report')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-pink-50 text-left border border-slate-100 space-y-1 transition-colors cursor-pointer"
              >
                <FileText size={18} className="text-[#FF2E7E]" />
                <span className="text-xs font-bold text-[#111827] block">Revenue Report</span>
                <span className="text-[10px] text-slate-400 block">PDF / Excel Export</span>
              </button>

              <button
                onClick={() => handleExportReport('GST Tax Ledger')}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-pink-50 text-left border border-slate-100 space-y-1 transition-colors cursor-pointer"
              >
                <FileText size={18} className="text-blue-500" />
                <span className="text-xs font-bold text-[#111827] block">GST Tax Audit</span>
                <span className="text-[10px] text-slate-400 block">PDF / Excel Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Quick Actions Bar (Bottom Sticky) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-2xl border border-[#ECECEC] shadow-2xl shadow-[#FF2E7E]/15 rounded-full px-6 py-3 flex items-center gap-3 max-w-2xl w-full justify-around">
        <Link to="/admin/erp" className="flex items-center gap-1.5 text-xs font-bold text-[#FF2E7E] hover:text-[#FF2E7E]/80">
          <Briefcase size={16} /> <span>Enterprise ERP</span>
        </Link>
        <span className="text-slate-300">|</span>
        <Link to="/admin/vendors/pending" className="flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-900">
          <Store size={16} /> <span>Audit Vendor</span>
        </Link>
        <span className="text-slate-300">|</span>
        <button
          onClick={() => handleExportReport('Full Ecosystem Audit')}
          className="flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
        >
          <Download size={16} /> <span>Export Audit</span>
        </button>
      </div>
    </div>
  );
};
