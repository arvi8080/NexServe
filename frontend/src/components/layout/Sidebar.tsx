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
  Network,
  ShieldCheck,
  Building2,
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
    { name: 'Franchises & Branches', path: '/admin/branches', icon: Network },
    { name: 'Enterprise ERP', path: '/admin/erp', icon: Building2 },
    { name: 'Security Matrix', path: '/admin/security', icon: ShieldCheck },
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
      {/* Mobile Drawer Trigger Button */}
      <button
        onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
        className="md:hidden fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#FF2E7E] text-white shadow-2xl flex items-center justify-center cursor-pointer"
        aria-label="Open Sidebar Navigation"
      >
        {mobileDrawerOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop Persistent Glass Sidebar (280px) */}
      <aside className="hidden md:flex flex-col w-[280px] shrink-0 p-6 space-y-8 bg-white/80 backdrop-blur-2xl border border-[#ECECEC] rounded-[36px] shadow-xl shadow-[#FF2E7E]/5 self-start sticky top-28">
        <div className="space-y-1 px-2">
          <span className="text-[10px] font-mono font-extrabold text-[#FF2E7E] uppercase tracking-widest block">
            {role.replace('_', ' ')} PORTAL
          </span>
          <h3 className="text-lg font-bold text-[#111827]">Command Center</h3>
        </div>

        <nav className="space-y-1.5">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white shadow-lg shadow-[#FF2E7E]/20'
                    : 'text-slate-600 hover:text-[#111827] hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                  <span>{link.name}</span>
                </div>
                {isActive && <ChevronRight size={14} className="text-white/80" />}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className="w-[280px] h-full bg-white p-6 space-y-6 overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
              <span className="text-xs font-bold text-[#FF2E7E] uppercase font-mono">{role} NAVIGATION</span>
              <button onClick={() => setMobileDrawerOpen(false)} className="p-2 text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <nav className="space-y-2">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                      isActive ? 'bg-[#FF2E7E] text-white' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
