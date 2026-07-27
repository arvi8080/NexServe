import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { User, Shield, LogOut, ChevronDown, Sparkles, LayoutDashboard, Calendar, Settings, Home } from 'lucide-react';
import { Role } from '@/types';

export const ProfileMenu: React.FC = () => {
  const { user, logout, switchRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="text-xs font-semibold text-slate-700 hover:text-[#FF2E7E] px-3 py-2 rounded-full transition-colors"
        >
          Sign In
        </Link>
        <Link to="/register" className="gradient-btn px-5 py-2.5 text-xs font-bold rounded-full">
          Get Started
        </Link>
      </div>
    );
  }

  const handleRoleChange = (role: Role) => {
    if (switchRole) switchRole(role);
    setIsOpen(false);
    if (role === 'ADMIN') navigate('/admin/dashboard');
    else if (role === 'VENDOR_OWNER') navigate('/vendor/dashboard');
    else navigate('/customer/dashboard');
  };

  const getDashboardLink = () => {
    if (user.role === 'SUPER_ADMIN') return '/admin/erp';
    if (user.role === 'ADMIN') return '/admin/dashboard';
    if (user.role === 'VENDOR_OWNER' || user.role === 'PROFESSIONAL') return '/vendor/dashboard';
    return '/customer/dashboard';
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Top Navbar Profile Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 pr-3 rounded-full bg-slate-100/80 border border-[#ECECEC] hover:border-[#FF2E7E]/40 hover:bg-pink-50/50 transition-all focus:outline-none cursor-pointer"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FF2E7E] to-[#FF5CA8] p-0.5 border-2 border-white shadow-xs flex items-center justify-center font-bold text-white text-xs overflow-hidden shrink-0">
          {user.profileImage ? (
            <img src={user.profileImage} alt={user.firstName} className="w-full h-full object-cover rounded-full" />
          ) : (
            <span>{user.firstName[0]}</span>
          )}
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold text-[#111827] leading-tight">
            {user.firstName} {user.lastName || ''}
          </span>
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">{user.role.replace('_', ' ')}</span>
        </div>
        <ChevronDown size={14} className="text-slate-400" />
      </button>

      {/* 320px Luxury SaaS Profile Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-[320px] bg-white/98 backdrop-blur-2xl border border-[#ECECEC] rounded-3xl p-6 shadow-2xl shadow-[#FF2E7E]/15 z-50 animate-in fade-in slide-in-from-top-2 duration-200 space-y-5">
          {/* Top Profile Header */}
          <div className="flex flex-col items-center text-center space-y-2 pb-4 border-b border-[#ECECEC]">
            <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#FF2E7E] to-[#FF5CA8] shadow-md shadow-[#FF2E7E]/20">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-[#FF2E7E] text-lg overflow-hidden">
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.firstName} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span>{user.firstName[0]}</span>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold text-[#111827]">
                {user.firstName} {user.lastName || ''}
              </h4>
              <p className="text-xs text-[#64748B] truncate max-w-[260px] font-medium">{user.email}</p>
            </div>
            <span className="px-3 py-1 bg-pink-50 text-[#FF2E7E] text-[10px] font-extrabold rounded-full border border-pink-200 uppercase font-mono tracking-wider">
              {user.role.replace('_', ' ')}
            </span>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <Link
              to={getDashboardLink()}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-[#111827] hover:bg-slate-50 transition-colors"
            >
              <div className="p-2 rounded-xl bg-pink-50 text-[#FF2E7E]">
                <LayoutDashboard size={16} />
              </div>
              <span>Dashboard</span>
            </Link>

            {user.role === 'CUSTOMER' && (
              <Link
                to="/customer/bookings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-[#111827] hover:bg-slate-50 transition-colors"
              >
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Calendar size={16} />
                </div>
                <span>My Bookings</span>
              </Link>
            )}

            <Link
              to="/customer/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-[#111827] hover:bg-slate-50 transition-colors"
            >
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Settings size={16} />
              </div>
              <span>Account Settings</span>
            </Link>
          </div>

          {/* Demo Role Switcher Pills */}
          <div className="pt-3 border-t border-[#ECECEC] space-y-2">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block px-1">
              DEMO ROLE SWITCH
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleRoleChange('CUSTOMER')}
                className={`py-2 px-3 text-[11px] font-bold rounded-2xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  user.role === 'CUSTOMER'
                    ? 'bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>🩷</span> Customer
              </button>
              <button
                onClick={() => handleRoleChange('VENDOR_OWNER')}
                className={`py-2 px-3 text-[11px] font-bold rounded-2xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  user.role === 'VENDOR_OWNER'
                    ? 'bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>⚪</span> Vendor
              </button>
              <button
                onClick={() => handleRoleChange('ADMIN')}
                className={`py-2 px-3 text-[11px] font-bold rounded-2xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  user.role === 'ADMIN'
                    ? 'bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>⚪</span> Admin
              </button>
            </div>
          </div>

          {/* Logout Action Button */}
          <div className="pt-2 border-t border-[#ECECEC]">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
                navigate('/');
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-bold text-rose-600 bg-rose-50/80 hover:bg-rose-100 transition-colors cursor-pointer"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
