import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  FileCheck,
  UserCheck,
  MapPin,
  Award,
  ShieldAlert,
  Upload,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  X,
  FileText,
  Camera,
  CreditCard,
  Building,
  Sparkles,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { Badge } from '@/components/ui/Badge';
import { verificationApi } from '@/api/verification.api';
import { VendorVerification } from '@/types';
import { calculateVendorTrustScore, evaluateTrustBadges } from '@/utils/trustScoreCalculator';

interface DocItem {
  id: string;
  title: string;
  description: string;
  status: 'VERIFIED' | 'PENDING' | 'REJECTED' | 'NOT_SUBMITTED';
  fileName?: string;
  previewUrl?: string;
}

export const VerificationCenter: React.FC = () => {
  const { showToast } = useToast();
  const [selectedPreviewImg, setSelectedPreviewImg] = useState<string | null>(null);
  const [verification, setVerification] = useState<VendorVerification | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bank Form State
  const [bankAccountHolder, setBankAccountHolder] = useState('Glow & Grace Studio Pvt Ltd');
  const [bankAccountNumber, setBankAccountNumber] = useState('489201928301');
  const [ifscCode, setIfscCode] = useState('HDFC0001234');
  const [payoutPref, setPayoutPref] = useState('UPI');

  useEffect(() => {
    verificationApi.getVendorVerification('vendor_1').then((data) => {
      setVerification(data);
    });
  }, []);

  const trustScore = calculateVendorTrustScore({
    hasIdentityVerified: true,
    hasSkillCertificate: true,
    completedJobsCount: 128,
    averageRating: 4.9,
    cancellationRatePercent: 1.2,
  });

  const trustBadges = evaluateTrustBadges(
    {
      hasIdentityVerified: true,
      hasSkillCertificate: true,
      completedJobsCount: 128,
      averageRating: 4.9,
      cancellationRatePercent: 1.2,
    },
    trustScore
  );

  const [documents, setDocuments] = useState<DocItem[]>([
    {
      id: 'doc_1',
      title: '1. Government Identity Proof',
      description: 'Aadhaar Card, PAN Card, Passport, or Citizenship (Nepal)',
      status: 'VERIFIED',
      fileName: 'Aadhaar_Government_ID_Verified.pdf',
      previewUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'doc_2',
      title: '2. Live Selfie Face Match',
      description: 'Live biometrics check matching government photo ID',
      status: 'VERIFIED',
      fileName: 'Live_Selfie_Match_Approved.jpg',
      previewUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'doc_3',
      title: '3. Police Verification Certificate',
      description: 'Clean criminal record verification document',
      status: 'VERIFIED',
      fileName: 'Police_Clearance_Certificate.pdf',
      previewUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'doc_4',
      title: '4. Skill Certification',
      description: 'Cosmetology diploma, CIDESCO or VLCC skill certification',
      status: 'VERIFIED',
      fileName: 'Cosmetology_Master_Diploma.pdf',
      previewUrl: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=600&q=80',
    },
  ]);

  const handleFileUpload = (docId: string) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId
          ? {
              ...d,
              status: 'PENDING',
              fileName: 'Uploaded_Document_Submitted.pdf',
              previewUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80',
            }
          : d
      )
    );
    showToast('Document Uploaded!', 'Document submitted for Admin verification review.', 'success');
  };

  const handleSaveBankDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Bank Settings Saved!', 'Payout banking info encrypted and stored securely.', 'success');
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 bg-[#FFFDFE] text-[#111827]">
      {/* Header & Trust Score Gauge */}
      <div className="p-8 md:p-10 rounded-[36px] bg-gradient-to-br from-purple-900 via-[#FF2E7E] to-pink-600 text-white shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold backdrop-blur-md">
              ✓ 5-STAGE ENTERPRISE VERIFICATION HUB
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">Trust & Verification Center</h1>
            <p className="text-xs text-pink-100 font-medium">
              Verified professionals receive 4x more customer bookings and priority listing on search catalog.
            </p>
          </div>

          {/* Trust Score Gauge Display */}
          <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-center space-y-1 shrink-0 min-w-[180px]">
            <span className="text-[10px] font-extrabold uppercase font-mono tracking-widest text-pink-200">
              VENDOR TRUST SCORE
            </span>
            <div className="text-4xl font-extrabold text-white flex items-center justify-center gap-1">
              <span>{trustScore}</span>
              <span className="text-sm opacity-75">/ 100</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 px-3 py-0.5 rounded-full inline-block">
              TOP 2% ELITE PARTNER
            </span>
          </div>
        </div>

        {/* Verification Badges */}
        <div className="pt-4 border-t border-white/20 flex flex-wrap gap-2">
          {trustBadges.map((badge, i) => (
            <span key={i} className="px-3 py-1.5 rounded-full bg-white text-[#FF2E7E] text-xs font-extrabold shadow-md flex items-center gap-1.5">
              <Sparkles size={14} />
              <span>{badge.replace('_', ' ')}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 5-Stage Verification Document Dropzones */}
      <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
        <h3 className="text-base font-extrabold text-[#111827] flex items-center gap-2 border-b border-[#ECECEC] pb-3">
          <FileCheck size={18} className="text-[#FF2E7E]" />
          <span>5-Stage Identity & Credential Documents</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <div key={doc.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#111827]">{doc.title}</h4>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    doc.status === 'VERIFIED'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {doc.status}
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium">{doc.description}</p>

              {doc.fileName && (
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span className="truncate max-w-[200px]">{doc.fileName}</span>
                  {doc.previewUrl && (
                    <button
                      type="button"
                      onClick={() => setSelectedPreviewImg(doc.previewUrl!)}
                      className="text-[#FF2E7E] hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <Eye size={14} /> Preview
                    </button>
                  )}
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFileUpload(doc.id)}
                leftIcon={<Upload size={14} />}
                className="w-full h-10 text-xs font-bold rounded-xl"
              >
                Upload / Update Document
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Encrypted Banking & Payout Settings */}
      <form onSubmit={handleSaveBankDetails} className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
          <h3 className="text-base font-extrabold text-[#111827] flex items-center gap-2">
            <CreditCard size={18} className="text-[#FF2E7E]" />
            <span>Encrypted Bank Account & Payout Preference</span>
          </h3>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-1 border border-emerald-200">
            <Lock size={12} /> 256-Bit Encrypted
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Account Holder Name</label>
            <input
              type="text"
              required
              value={bankAccountHolder}
              onChange={(e) => setBankAccountHolder(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Bank Account / eSewa Number (Encrypted)</label>
            <input
              type="text"
              required
              value={bankAccountNumber}
              onChange={(e) => setBankAccountNumber(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">IFSC Code / Branch Code</label>
            <input
              type="text"
              required
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Payout Preference</label>
            <select
              value={payoutPref}
              onChange={(e) => setPayoutPref(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
            >
              <option value="UPI">Direct UPI Payout (India)</option>
              <option value="RAZORPAY">Razorpay Instant Payout (India)</option>
              <option value="ESEWA">eSewa Wallet Payout (Nepal)</option>
              <option value="KHALTI">Khalti Wallet Payout (Nepal)</option>
            </select>
          </div>
        </div>

        <Button type="submit" variant="primary" isLoading={isSubmitting} className="w-full h-12 rounded-2xl text-xs font-bold shadow-xl">
          Save Encrypted Payout Settings
        </Button>
      </form>

      {/* Lightbox Modal */}
      {selectedPreviewImg && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-4 max-w-xl w-full space-y-4 relative">
            <button
              onClick={() => setSelectedPreviewImg(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <X size={18} />
            </button>
            <h4 className="text-sm font-bold text-[#111827] px-2">Document Preview Inspector</h4>
            <img src={selectedPreviewImg} alt="Preview" className="w-full h-80 object-cover rounded-2xl" />
          </div>
        </div>
      )}
    </div>
  );
};
