import React, { ReactNode } from 'react';
import { Sparkles, ShieldCheck, Zap, Star, Headphones, Users } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children?: ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const featureCards = [
    { icon: ShieldCheck, title: '100% Secure', desc: 'Your data is encrypted', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { icon: Zap, title: 'Quick Booking', desc: 'Book experts in seconds', color: 'text-[#FF2E7A]', bg: 'bg-pink-50' },
    { icon: Star, title: 'Verified Pros', desc: 'Background checked experts', color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: Headphones, title: '24×7 Support', desc: 'Always available concierge', color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FFF8FB] text-slate-900 grid grid-cols-1 lg:grid-cols-12 relative overflow-hidden">
      {/* Ambient Floating Blobs & Soft Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#FF5FA2]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#FF2E7A]/10 rounded-full blur-3xl pointer-events-none" />

      {/* LEFT BRANDING SECTION (40%) */}
      <div className="lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-between relative z-10 space-y-10 border-r border-[#ECECEC]/60 bg-white/40 backdrop-blur-md">
        {/* Top Branding Header */}
        <div className="space-y-6">
          <Link to="/" className="inline-flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF2E7A] to-[#FF5FA2] flex items-center justify-center shadow-lg shadow-[#FF2E7A]/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                Nex<span className="gradient-text">Serve</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#FF2E7A]">
                Luxury Doorstep Beauty & Wellness
              </span>
            </div>
          </Link>

          <div className="space-y-3 pt-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Welcome Back to <br />
              <span className="gradient-text">NexServe</span>
            </h1>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed font-normal">
              Sign in to continue your beauty journey with India's premium doorstep beauty & spa platform.
            </p>
          </div>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          {featureCards.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div key={i} className="p-4 rounded-2xl bg-white/80 border border-[#ECECEC] shadow-xs space-y-1.5 backdrop-blur-md">
                <div className={`w-8 h-8 rounded-xl ${feat.bg} ${feat.color} flex items-center justify-center`}>
                  <Icon size={18} />
                </div>
                <h4 className="text-xs font-bold text-slate-900">{feat.title}</h4>
                <p className="text-[11px] text-slate-500">{feat.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom Hero Customer Portrait Visual with Floating Badges */}
        <div className="relative pt-4">
          <div className="flex items-center gap-5 p-4 rounded-3xl bg-white/90 border border-[#ECECEC] shadow-xl backdrop-blur-xl max-w-md relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#FF2E7A] p-0.5 shrink-0 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                alt="Happy NexServe Customer"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Ananya Sharma</h4>
              <p className="text-xs text-slate-500 font-medium">Verified Customer • Bengaluru</p>
              <div className="flex items-center gap-1 mt-1 text-xs font-bold text-amber-500">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span>5.0 Star Experience</span>
              </div>
            </div>
          </div>

          {/* Floating Badge 1 */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="absolute -top-3 right-4 bg-gradient-to-r from-[#FF2E7A] to-[#FF5FA2] text-white px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-lg shadow-[#FF2E7A]/25 flex items-center gap-1.5"
          >
            <Users size={14} />
            <span>20,000+ Happy Clients</span>
          </motion.div>

          {/* Floating Badge 2 */}
          <div className="absolute -bottom-3 right-8 bg-white px-3 py-1 rounded-full border border-pink-100 shadow-md text-xs font-bold text-slate-800 flex items-center gap-1">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span>4.9 Average Rating</span>
          </div>
        </div>
      </div>

      {/* RIGHT LOGIN CARD SECTION (60%) */}
      <div className="lg:col-span-7 p-6 sm:p-12 lg:p-16 flex items-center justify-center relative z-10">
        <div className="w-full max-w-lg">{children || <Outlet />}</div>
      </div>
    </div>
  );
};
