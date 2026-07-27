import React, { useState } from 'react';
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
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { Badge } from '@/components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';

interface DocItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  status: 'VERIFIED' | 'PENDING' | 'REJECTED' | 'NOT_SUBMITTED';
  fileName?: string;
  previewUrl?: string;
  feedback?: string;
}

export const VerificationCenter: React.FC = () => {
  const { showToast } = useToast();
  const [selectedPreviewImg, setSelectedPreviewImg] = useState<string | null>(null);

  const [documents, setDocuments] = useState<DocItem[]>([
    {
      id: 'doc_1',
      title: '1. Government Photo ID',
      description: 'Aadhaar Card, PAN Card, or Passport (Front & Back)',
      icon: FileCheck,
      status: 'VERIFIED',
      fileName: 'Aadhaar_Front_Back_Verified.pdf',
      previewUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'doc_2',
      title: '2. Live Face Selfie Match',
      description: 'Clear front-facing selfie photo matching your Government ID',
      icon: UserCheck,
      status: 'VERIFIED',
      fileName: 'Live_Selfie_Biometric.jpg',
      previewUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'doc_3',
      title: '3. Salon / Studio Address Proof',
      description: 'Electricity bill, rent agreement, or GST registration certificate',
      icon: MapPin,
      status: 'VERIFIED',
      fileName: 'Salon_Rent_Agreement_2026.pdf',
      previewUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'doc_4',
      title: '4. Skill & Aesthetics Certification',
      description: 'Cosmetology diploma, bridal makeup certificate, or CIDESCO credential',
      icon: Award,
      status: 'PENDING',
      fileName: 'Advanced_HydraFacial_Diploma.pdf',
      previewUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
      feedback: 'Document under 5-stage verification audit by NexServe Admin Team.',
    },
    {
      id: 'doc_5',
      title: '5. Police Clearance Background Certificate',
      description: 'Official police verification certificate issued within 6 months',
      icon: ShieldAlert,
      status: 'REJECTED',
      fileName: 'Police_Clearance_Scan.jpg',
      previewUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      feedback: 'RE-UPLOAD REQUESTED: Image was slightly blurry. Please upload a clear high-res scan of the police stamp.',
    },
  ]);

  const verifiedCount = documents.filter((d) => d.status === 'VERIFIED').length;
  const progressPercent = Math.round((verifiedCount / documents.length) * 100);

  const handleUploadNew = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              status: 'PENDING',
              fileName: 'Updated_Document_Scan_2026.jpg',
              feedback: 'Re-uploaded document submitted for admin review.',
            }
          : doc
      )
    );
    showToast('Document Uploaded!', 'New document submitted for 5-stage admin verification.', 'success');
  };

  const timelineLogs = [
    { time: 'Jul 27, 2026 - 10:15 AM', text: 'Admin requested re-upload for Police Clearance Certificate.', type: 'warning' },
    { time: 'Jul 26, 2026 - 04:30 PM', text: 'Government ID & Face Match verified by Automated Identity AI.', type: 'success' },
    { time: 'Jul 26, 2026 - 02:00 PM', text: 'Partner onboarding application submitted.', type: 'info' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20 bg-[#FFFDFE] text-[#111827] relative">
      {/* Header Banner */}
      <div className="p-8 md:p-12 rounded-[32px] bg-gradient-to-br from-purple-50/90 via-pink-50/50 to-white border border-pink-200 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-purple-200 text-purple-700 text-xs font-bold shadow-xs">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span>Stripe Identity & Uber Onboarding Standard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mt-3">
            Partner Verification Center
          </h1>
          <p className="text-xs text-[#64748B] font-semibold mt-1">
            Complete all 5 verification stages to earn your official <strong className="text-emerald-600">✓ 5-Stage Verified Partner</strong> badge.
          </p>
        </div>

        <div className="text-left sm:text-right shrink-0">
          <span className="text-xs font-extrabold text-[#111827] uppercase tracking-wider block mb-1">Overall Audit Status</span>
          <span className="px-4 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-extrabold border border-amber-200 inline-block">
            IN AUDIT ({progressPercent}% COMPLETE)
          </span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
        <div className="flex items-center justify-between font-bold text-xs">
          <span className="text-[#111827]">5-Stage Onboarding Progress</span>
          <span className="text-[#FF2E7E]">{verifiedCount} of 5 Documents Verified</span>
        </div>

        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8 }}
            className="h-full bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8]"
          />
        </div>
      </div>

      {/* Document Upload Dropzones Grid */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-[#111827]">5-Stage Verification Document Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc) => {
            const Icon = doc.icon;
            return (
              <div
                key={doc.id}
                className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-pink-50 text-[#FF2E7E]">
                      <Icon size={20} />
                    </div>
                    {doc.status === 'VERIFIED' ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 size={14} /> VERIFIED
                      </span>
                    ) : doc.status === 'PENDING' ? (
                      <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 flex items-center gap-1">
                        <Clock size={14} /> PENDING AUDIT
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200 flex items-center gap-1">
                        <AlertTriangle size={14} /> RE-UPLOAD NEEDED
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-[#111827]">{doc.title}</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">{doc.description}</p>
                  </div>

                  {doc.fileName && (
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span className="truncate max-w-[200px]">{doc.fileName}</span>
                      {doc.previewUrl && (
                        <button
                          type="button"
                          onClick={() => setSelectedPreviewImg(doc.previewUrl!)}
                          className="text-[#FF2E7E] hover:underline flex items-center gap-1 cursor-pointer shrink-0 font-bold"
                        >
                          <Eye size={14} /> Preview
                        </button>
                      )}
                    </div>
                  )}

                  {doc.feedback && (
                    <div
                      className={`p-4 rounded-2xl text-xs font-medium space-y-1 ${
                        doc.status === 'REJECTED'
                          ? 'bg-rose-50 border border-rose-200 text-rose-800'
                          : 'bg-amber-50 border border-amber-200 text-amber-900'
                      }`}
                    >
                      <span className="font-bold block">Reviewer Feedback:</span>
                      <p>{doc.feedback}</p>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleUploadNew(doc.id)}
                  className={`w-full h-12 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    doc.status === 'REJECTED'
                      ? 'bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <Upload size={16} />
                  <span>{doc.status === 'REJECTED' ? 'Re-Upload Document' : 'Replace Document File'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verification Timeline Log */}
      <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-5">
        <h3 className="text-lg font-bold text-[#111827] flex items-center gap-2 border-b border-[#ECECEC] pb-3">
          <Clock className="text-[#FF2E7E]" size={20} />
          <span>Verification Audit Trail & Log</span>
        </h3>

        <div className="space-y-3">
          {timelineLogs.map((log, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#111827]">{log.text}</span>
              <span className="text-slate-400 font-mono font-medium">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Document Lightbox Preview Modal */}
      <AnimatePresence>
        {selectedPreviewImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          >
            <div className="relative max-w-2xl w-full bg-white rounded-[32px] overflow-hidden p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
                <h4 className="text-base font-bold text-[#111827]">Document Lightbox Preview</h4>
                <button onClick={() => setSelectedPreviewImg(null)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>

              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 border border-[#ECECEC]">
                <img src={selectedPreviewImg} alt="Document Lightbox" className="w-full h-full object-cover" />
              </div>

              <Button variant="secondary" onClick={() => setSelectedPreviewImg(null)} className="w-full h-11 text-xs font-bold rounded-2xl">
                Close Preview
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
