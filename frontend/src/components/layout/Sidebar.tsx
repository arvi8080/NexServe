import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Bell,
  Wallet,
  User as UserIcon,
  Scissors,
  BriefcaseBusiness,
  Clock,
  Star,
  DollarSign,
  CheckSquare,
  ChevronRight,
  Menu,
  X,
  HelpCircle,
  Settings,
  LogOut,
  FileText,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Role, User as AuthUser, normalizeRole } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { isVendorBusinessLocked } from '@/middleware/rbacMiddleware';

interface SidebarProps {
  role: Role;
}

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const customerLinks = [
    { name: 'Dashboard', path: '/customer/dashboard', icon: LayoutDashboard },
    { name: 'My Bookings', path: '/customer/bookings', icon: Calendar },
    { name: 'Wallet & Invoices', path: '/customer/wallet', icon: Wallet },
    { name: 'Notifications', path: '/customer/notifications', icon: Bell },
    { name: 'My Profile', path: '/customer/profile', icon: UserIcon },
    { name: 'Help & Support', path: '/customer/support', icon: HelpCircle },
    { name: 'Settings', path: '/customer/settings', icon: Settings },
  ];

  const vendorLinks = [
    { name: 'Dashboard', path: '/vendor/dashboard', icon: LayoutDashboard },
    { name: 'My Services', path: '/vendor/services', icon: Scissors },
    { name: 'Availability', path: '/vendor/availability', icon: Clock },
    { name: 'Bookings', path: '/vendor/bookings', icon: Calendar },
    { name: 'Earnings', path: '/vendor/earnings', icon: DollarSign },
    { name: 'Wallet', path: '/vendor/wallet', icon: Wallet },
    { name: 'Reviews', path: '/vendor/reviews', icon: Star },
    { name: 'Notifications', path: '/vendor/notifications', icon: Bell },
    { name: 'Documents & Verification', path: '/vendor/verification', icon: FileText },
    { name: 'Vendor Profile', path: '/vendor/profile', icon: UserIcon },
    { name: 'Settings', path: '/vendor/settings', icon: Settings },
    { name: 'Support', path: '/vendor/support', icon: HelpCircle },
  ];

  const allowedPendingVendorPaths = ['/vendor/verification', '/vendor/profile', '/vendor/support', '/vendor/pending-verification'];
  const isPendingVendor = role === 'VENDOR' && isVendorBusinessLocked(user as AuthUser | null);
  const visibleVendorLinks = isPendingVendor
    ? vendorLinks.filter((link) => allowedPendingVendorPaths.includes(link.path))
    : vendorLinks;

  const adminLinks = [
    { name: 'Overview Stats', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Vendor Approvals', path: '/admin/vendors/pending', icon: CheckSquare },
    { name: 'Manage Customers', path: '/admin/customers', icon: Users },
    { name: 'Manage Services', path: '/admin/services', icon: Scissors },
    { name: 'Manage Bookings', path: '/admin/bookings', icon: Calendar },
    { name: 'Support', path: '/admin/support', icon: HelpCircle },
  ];

  const superAdminLinks = [
    ...adminLinks,
    { name: 'Enterprise ERP', path: '/admin/erp', icon: BriefcaseBusiness },
  ];

  const normalizedRole = normalizeRole(role);
  const links = normalizedRole === 'SUPER_ADMIN' ? superAdminLinks : normalizedRole === 'ADMIN' ? adminLinks : normalizedRole === 'VENDOR' ? visibleVendorLinks : customerLinks;

  const renderNavLinks = (mobile: boolean) =>
    links.map((link) => {
      const isActive = mobile ? location.pathname === link.path : location.pathname === link.path || location.pathname.startsWith(link.path + '/');
      const Icon = link.icon;
      return (
        <Link key={link.path} to={link.path} onClick={() => mobile && setMobileDrawerOpen(false)}
          className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
            isActive ? 'bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white shadow-lg shadow-[#FF2E7E]/20' : 'text-slate-600 hover:text-[#111827] hover:bg-slate-100/80'
          }`}>
          <div className="flex items-center gap-3">
            <Icon size={17} className={isActive ? 'text-white' : 'text-slate-400'} />
            <span>{link.name}</span>
          </div>
          {isActive && <ChevronRight size={14} className="text-white/80" />}
        </Link>
      );
    });

  return (
    <React.Fragment>
      <aside className="hidden md:flex flex-col w-[280px] shrink-0 p-6 space-y-6 bg-white/80 backdrop-blur-2xl border border-[#ECECEC] rounded-[36px] shadow-xl shadow-[#FF2E7E]/5 self-start sticky top-28">
        <div className="space-y-1 px-2">
          <span className="text-[10px] font-mono font-extrabold text-[#FF2E7E] uppercase tracking-widest block">{role.replace('_', ' ')} PORTAL</span>
          <h3 className="text-lg font-bold text-[#111827]">Command Center</h3>
        </div>
        <nav className="space-y-1">{renderNavLinks(false)}</nav>
        <div className="pt-4 border-t border-[#ECECEC]">
          <Link to="/logout" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all">
            <LogOut size={17} className="text-rose-400" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      <button onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
        className="md:hidden fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#FF2E7E] text-white shadow-2xl" aria-label="Open Sidebar">
        {mobileDrawerOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {mobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className="w-[280px] h-full bg-white p-6 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
              <span className="text-xs font-bold text-[#FF2E7E] uppercase font-mono">{role} NAVIGATION</span>
              <button onClick={() => setMobileDrawerOpen(false)} className="p-2 text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <nav className="space-y-1.5">{renderNavLinks(true)}</nav>
            <div className="pt-4 border-t border-[#ECECEC] mt-4">
              <Link to="/logout" onClick={() => setMobileDrawerOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all">
                <LogOut size={18} className="text-rose-400" />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
