import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, Search, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileMenu } from './ProfileMenu';
import { NotificationBell } from './NotificationBell';
import { useAuth } from '@/context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: '✨ AI Concierge', path: '/ai-concierge' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Become a Pro', path: '/become-pro' },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/90 border-b border-[#ECECEC] shadow-lg shadow-[#FF2E7E]/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo (Left) */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#FF2E7E] to-[#FF5CA8] flex items-center justify-center shadow-lg shadow-[#FF2E7E]/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#111827]">
              Nex<span className="gradient-text">Serve</span>
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-bold text-slate-400 hidden xs:inline-block">
              Luxury Doorstep Beauty & Wellness
            </span>
          </div>
        </Link>

        {/* Navigation (Center - Desktop 1024px+) */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-full border border-[#ECECEC]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#FF2E7E] text-white shadow-md shadow-[#FF2E7E]/20'
                    : 'text-slate-600 hover:text-[#111827] hover:bg-slate-200/60'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/search"
            className="p-2 sm:p-2.5 text-slate-500 hover:text-[#111827] rounded-full hover:bg-pink-50 transition-all touch-manipulation"
          >
            <Search className="w-5 h-5" />
          </Link>

          {user && <NotificationBell />}

          <div className="hidden sm:block">
            <ProfileMenu />
          </div>

          {/* Mobile/Tablet Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#111827] transition-all lg:hidden touch-manipulation cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-b border-[#ECECEC] bg-white overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-2xl text-sm font-bold text-[#111827] hover:bg-pink-50 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-[#ECECEC]">
                <ProfileMenu />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
