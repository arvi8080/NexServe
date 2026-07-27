import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin, Heart, Globe, Share2, MessageCircle, Smartphone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Col 1: Company */}
        <div className="space-y-4 md:col-span-1">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF4D8D] to-[#E91E63] flex items-center justify-center shadow-lg shadow-[#FF4D8D]/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              Nex<span className="gradient-text">Serve</span>
            </span>
          </Link>
          <p className="text-slate-400 text-xs leading-relaxed">
            India's premier doorstep luxury beauty & spa platform. Certified top-tier professionals delivered safely to your living room.
          </p>
        </div>

        {/* Col 2: Services */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Top Treatments</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link to="/services?category=FACIAL" className="hover:text-white transition-colors">Diamond Hydra-Facial</Link></li>
            <li><Link to="/services?category=HAIR_SPA" className="hover:text-white transition-colors">Keratin Hair Spa</Link></li>
            <li><Link to="/services?category=PARTY_MAKEUP" className="hover:text-white transition-colors">HD Party & Glam Makeup</Link></li>
            <li><Link to="/services?category=WAXING" className="hover:text-white transition-colors">Rica Honey Smooth Waxing</Link></li>
            <li><Link to="/services?category=PEDICURE" className="hover:text-white transition-colors">Gel Nail Art & Pedicure</Link></li>
          </ul>
        </div>

        {/* Col 3: Help */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Help & Safety</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link to="/about" className="hover:text-white transition-colors">Mono-Dose Hygiene Promise</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">24/7 Concierge Desk</Link></li>
            <li><Link to="/become-pro" className="hover:text-white transition-colors">Become a Partner Pro</Link></li>
            <li><Link to="/customer/wallet" className="hover:text-white transition-colors">Refunds & Cancellation</Link></li>
          </ul>
        </div>

        {/* Col 4: Contact */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-xs text-slate-400">
            <li className="flex items-center gap-3"><Phone size={16} className="text-[#FF4D8D]" /> +91 1800 200 8899</li>
            <li className="flex items-center gap-3"><Mail size={16} className="text-[#FF4D8D]" /> support@nexserve.com</li>
            <li className="flex items-start gap-3"><MapPin size={16} className="text-[#FF4D8D] mt-0.5" /> 100 Feet Road, Indiranagar, Bengaluru</li>
          </ul>
        </div>

        {/* Col 5: App Download & Socials */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Get the App</h4>
          <p className="text-xs text-slate-400">Book doorstep beauty in seconds from your mobile phone.</p>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-white transition-colors">
              <Smartphone size={16} className="text-[#FF4D8D]" /> App Store
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-white transition-colors">
              <Smartphone size={16} className="text-[#FF4D8D]" /> Google Play
            </button>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors"><Globe size={16} /></a>
            <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors"><Share2 size={16} /></a>
            <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors"><MessageCircle size={16} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <p>© 2026 NexServe Technologies Inc. All rights reserved.</p>
        <p className="flex items-center gap-1 mt-2 sm:mt-0">
          Made with <Heart size={14} className="text-[#FF4D8D] fill-[#FF4D8D]" /> for supreme elegance
        </p>
      </div>
    </footer>
  );
};
