import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Clock, FileCheck, CheckCircle2, AlertTriangle, ArrowRight, Lock, User, FileText, Upload, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export const VendorPendingVerification: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 pt-6 px-4 bg-[#FFFDFE] text-[#111827]">
      {/* 1. PROMINENT UNDER VERIFICATION WARNING BANNER */}
      <div className="p-8 rounded-[36px] bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white shadow-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-md">
            <Clock className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div>
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase font-mono tracking-wider">
              STATUS: PENDING ADMIN VERIFICATION
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Account Under Review</h1>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
          Your account is under verification. You can complete your profile and upload credentials, but you cannot receive bookings or go live until an administrator approves your account.
        </p>
      </div>

      {/* 2. RESTRICTED FEATURES NOTICE CARD */}
      <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-5">
        <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider flex items-center gap-2 border-b border-[#ECECEC] pb-3">
          <Lock size={18} className="text-amber-500" />
          <span>Restricted Features During Verification</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 opacity-60">
            <ShieldAlert size={18} className="text-rose-500 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block">Go Live & Accept Bookings</span>
              <span className="text-[11px] text-slate-500">Disabled until admin certification</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 opacity-60">
            <Lock size={18} className="text-rose-500 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block">Earnings & Wallet Payouts</span>
              <span className="text-[11px] text-slate-500">Disabled until bank approval</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DOCUMENT VERIFICATION CHECKLIST CTA */}
      <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
          <div>
            <h3 className="text-base font-extrabold text-[#111827]">Required Verification Documents</h3>
            <p className="text-xs text-slate-500 font-medium">Ensure all 5-stage documents are uploaded to speed up approval.</p>
          </div>

          <Link to="/vendor/verification">
            <Button variant="primary" leftIcon={<Upload size={14} />} className="h-10 px-4 text-xs font-bold rounded-xl shadow-md">
              Upload Credentials
            </Button>
          </Link>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs font-bold text-emerald-900">
              <CheckCircle2 size={18} className="text-emerald-600" />
              <span>1. Government Photo ID (Aadhaar / Passport / Citizenship)</span>
            </div>
            <span className="text-[10px] font-mono font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              SUBMITTED
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs font-bold text-amber-900">
              <Clock size={18} className="text-amber-600" />
              <span>2. Police Verification Certificate</span>
            </div>
            <span className="text-[10px] font-mono font-extrabold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
              UNDER REVIEW
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs font-bold text-amber-900">
              <Clock size={18} className="text-amber-600" />
              <span>3. Professional Skill Diploma / Certification</span>
            </div>
            <span className="text-[10px] font-mono font-extrabold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
              UNDER REVIEW
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
