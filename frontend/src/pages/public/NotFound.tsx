import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-[#FFFDFE] text-[#111827]">
      <div className="p-10 md:p-16 rounded-[32px] bg-white border border-[#ECECEC] shadow-2xl shadow-[#FF2E7E]/10 text-center max-w-lg space-y-6">
        {/* Luxury 404 Graphic Badge */}
        <div className="w-24 h-24 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center mx-auto shadow-md">
          <Sparkles className="w-12 h-12 text-[#FF2E7E]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF2E7E]">404 ERROR</span>
          <h1 className="text-4xl font-extrabold text-[#111827]">Page Not Found</h1>
          <p className="text-xs text-[#64748B] leading-relaxed max-w-sm mx-auto">
            The treatment menu page or service route you requested does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <Link to="/">
            <Button variant="primary" size="lg" leftIcon={<Home size={18} />}>
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
