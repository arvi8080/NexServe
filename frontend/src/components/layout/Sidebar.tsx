import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Bell,
  Wallet,
  User,
  Scissors,
  Clock,
  Star,
  DollarSign,
  CheckSquare,
  BarChart3,
  Sparkles,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { Role } from '@/types';

interface SidebarProps {
  role: Role;
}

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const location = useLocation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const customerLinks = [
    { name: 'Overview', path: '/customer/dashboard', icon: LayoutDashboard },
    { name: 'My Bookings', path: '/customer/bookings', icon: Calendar },
    { name: 'Notifications', path: '/customer/notifications', icon: Bell },
    { name: 'Wallet & Invoices', path: '/customer/wallet', icon: Wallet },
    { name: 'My Profile', path: '/customer/profile', icon: User },
  ];

  const vendorLinks = [
    { name: 'Dashboard', path: '/vendor/dashboard', icon: LayoutDashboard },
    { name: 'My Services', path: '/vendor/services', icon: Scissors },
    { name: 'Availability', path: '/vendor/availability', icon: Clock },
    { name: 'Customer Reviews', path: '/vendor/reviews', icon: Star },
    { name: 'Earnings', path: '/vendor/earnings', icon: DollarSign },
    { name: 'Vendor Profile', path: '/vendor/profile', icon: User },
  ];

  const adminLinks = [
    { name: 'Overview Stats', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Vendor Approvals', path: '/admin/vendors/pending', icon: CheckSquare },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  ];

  const links =
    role === 'ADMIN' || role === 'SUPER_ADMIN'
      ? adminLinks
      : role === 'VENDOR_OWNER' || role === 'PROFESSIONAL'
      ? vendorLinks
      : customerLinks;

  return (
    <>
      {/* 1. Desktop Floating Sidebar (1024px+) */}
      <aside className="w-[280px] bg-white border border-[#ECECEC] rounded-3xl min-h-[calc(100vh-6rem)] p-5 flex-col justify-between shrink-0 hidden lg:flex shadow-xl shadow-[#FF2E7E]/5 mr-6">
        <div className="space-y-6">
          {/* Active Portal Badge */}
          <div className="px-4 py-3.5 bg-pink-50/80 rounded-2xl border border-pink-100">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF2E7E] block">ACTIVE PORTAL</span>
            <span className="text-sm font-extrabold text-[#111827] capitalize">{role.toLowerCase().replace('_', ' ')} Panel</span>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white shadow-md shadow-[#FF2E7E]/25 font-bold'
                      : 'text-[#64748B] hover:text-[#111827] hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-1.5 rounded-xl ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon size={16} />
                  </div>
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Concierge Support Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-50/80 via-rose-50/40 to-white border border-pink-100 text-center space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF2E7E] to-[#FF5CA8] flex items-center justify-center text-white mx-auto shadow-md shadow-[#FF2E7E]/20">
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#111827]">Need Support?</h4>
            <p className="text-[11px] text-[#64748B] leading-relaxed">24/7 Concierge team ready to assist.</p>
          </div>
          <Link
            to="/contact"
            className="inline-block w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-[#111827] shadow-xs transition-all hover:scale-[1.02]"
          >
            Contact Concierge
          </Link>
        </div>
      </aside>

      {/* 2. Mobile / Tablet Floating Action Bar & Collapsible Navigation (<1024px) */}
      <div className="lg:hidden w-full mb-6">
        <button
          onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
          className="w-full p-4 rounded-2xl bg-white border border-[#ECECEC] shadow-md flex items-center justify-between text-xs font-bold text-[#111827]"
        >
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-pink-50 text-[#FF2E7E]">
              <LayoutDashboard size={18} />
            </span>
            <span>Dashboard Menu ({role.toLowerCase().replace('_', ' ')})</span>
          </div>
          <ChevronRight size={18} className={`text-slate-400 transition-transform ${mobileDrawerOpen ? 'rotate-90' : ''}`} />
        </button>

        {mobileDrawerOpen && (
          <div className="mt-2 p-4 rounded-2xl bg-white border border-[#ECECEC] shadow-xl space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileDrawerOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={16} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
