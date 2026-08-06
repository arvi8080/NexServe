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
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-linear-to-tr from-[#FF2E7E] to-[#FF5CA8] flex items-center justify-center shadow-lg shadow-[#FF2E7E]/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#111827]">
              Glow<span className="gradient-text">Home</span>
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-bold text-slate-400 hidden xs:inline-block">
              Nepal's Doorstep Beauty & Home Services
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
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white shadow-md shadow-[#FF2E7E]/20'
                    : 'text-slate-600 hover:text-[#111827] hover:bg-slate-200/50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls (Right) */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <NotificationBell />

          {user ? (
            <ProfileMenu />
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <button className="h-10 sm:h-11 px-4 sm:px-5 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                  Sign In
                </button>
              </Link>
              <Link to="/register">
                <button className="h-10 sm:h-11 px-4 sm:px-5 rounded-2xl text-xs font-bold bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white shadow-lg shadow-[#FF2E7E]/20 hover:opacity-95 transition-opacity">
                  Get Started
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-[#ECECEC] px-6 py-6 space-y-4 shadow-xl"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                    location.pathname === link.path ? 'bg-pink-50 text-[#FF2E7E]' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
