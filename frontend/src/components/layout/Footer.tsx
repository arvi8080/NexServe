import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin, Heart, Globe, Share2, MessageCircle, Smartphone } from 'lucide-react';

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Col 1: Company */}
        <div className="space-y-4 md:col-span-1">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF2E7E] to-[#FF5CA8] flex items-center justify-center shadow-lg shadow-[#FF2E7E]/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              Glow<span className="gradient-text">Home</span>
            </span>
          </Link>
          <p className="text-slate-400 text-xs leading-relaxed">
            Nepal's premier doorstep beauty, facial, hair spa, and parlour marketplace. Verified top-tier professionals delivered safely to your home in Kathmandu, Pokhara & Lalitpur.
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
            <li><Link to="/become-pro" className="hover:text-white transition-colors">Register Your Parlour</Link></li>
            <li><Link to="/customer/wallet" className="hover:text-white transition-colors">Refunds & Cancellation</Link></li>
          </ul>
        </div>

        {/* Col 4: Actual Contact Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact Us</h4>
          <ul className="space-y-3 text-xs text-slate-400">
            <li>
              <a href="tel:+9779808422407" className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone size={16} className="text-[#FF2E7E]" />
                <span>+977 9808422407</span>
              </a>
            </li>
            <li>
              <a href="mailto:glowhomeofficial123@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail size={16} className="text-[#FF2E7E]" />
                <span>glowhomeofficial123@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="https://instagram.com/glowhome_nepal" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                <InstagramIcon size={16} className="text-[#FF2E7E]" />
                <span>@glowhome_nepal</span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-[#FF2E7E] mt-0.5 shrink-0" />
              <span>Durbar Marg & Jhamsikhel, Kathmandu Valley, Nepal 🇳🇵</span>
            </li>
          </ul>
        </div>

        {/* Col 5: App Download & Socials */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Get the App</h4>
          <p className="text-xs text-slate-400">Book doorstep beauty & home services in seconds from your mobile phone in Nepal.</p>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-white transition-colors">
              <Smartphone size={16} className="text-[#FF2E7E]" /> App Store
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-white transition-colors">
              <Smartphone size={16} className="text-[#FF2E7E]" /> Google Play
            </button>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <a href="https://instagram.com/glowhome_nepal" target="_blank" rel="noreferrer" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors" title="Instagram">
              <InstagramIcon size={16} />
            </a>
            <a href="mailto:glowhomeofficial123@gmail.com" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors" title="Email">
              <Mail size={16} />
            </a>
            <a href="tel:+9779808422407" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors" title="Phone">
              <Phone size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <p>© 2026 GlowHome Nepal. All rights reserved.</p>
        <p className="flex items-center gap-1 mt-2 sm:mt-0">
          Made with <Heart size={14} className="text-[#FF2E7E] fill-[#FF2E7E]" /> for supreme elegance in Nepal 🇳🇵
        </p>
      </div>
    </footer>
  );
};
