import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, AlertTriangle, FileText, Upload, RefreshCw, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export const VendorAccountRejected: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20 pt-10 px-4 bg-[#FFFDFE] text-[#111827]">
      <div className="p-8 rounded-[36px] bg-rose-500 text-white shadow-2xl space-y-4 text-center">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center">
          <XCircle className="w-10 h-10 text-white" />
        </div>

        <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase font-mono tracking-wider inline-block">
          STATUS: VERIFICATION REJECTED
        </span>
        <h1 className="text-3xl font-extrabold">Account Application Rejected</h1>

        <p className="text-xs sm:text-sm text-rose-100 font-medium leading-relaxed max-w-xl mx-auto">
          Your partner verification application requires document corrections before you can accept doorstep bookings on GlowHome.
        </p>
      </div>

      {/* REJECTION FEEDBACK REASON CARD */}
      <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
        <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider flex items-center gap-2 border-b border-[#ECECEC] pb-3">
          <AlertTriangle size={18} className="text-rose-500" />
          <span>Administrator Feedback Note</span>
        </h3>

        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-900 leading-relaxed">
          "Government ID scan copy was blurry or unreadable. Please re-upload a clear high-resolution PDF or JPG copy of your front and back Government Photo ID."
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/vendor/verification" className="w-full sm:w-auto">
            <Button variant="primary" leftIcon={<Upload size={16} />} className="w-full h-12 px-6 rounded-2xl text-xs font-bold shadow-lg">
              Re-Upload Corrected Documents
            </Button>
          </Link>

          <a href="mailto:glowhome.help@gmail.com" className="text-xs font-bold text-[#FF2E7E] hover:underline flex items-center gap-1">
            <Mail size={14} /> Contact Support Desk
          </a>
        </div>
      </div>
    </div>
  );
};
