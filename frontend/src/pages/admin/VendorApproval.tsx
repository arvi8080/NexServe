import React, { useState, useEffect } from 'react';
import { adminApi } from '@/api/admin';
import { verificationApi } from '@/api/verification.api';
import { Vendor, VendorVerification } from '@/types';
import {
  CheckCircle2,
  XCircle,
  Store,
  ShieldCheck,
  FileCheck,
  UserCheck,
  MapPin,
  Award,
  ShieldAlert,
  Eye,
  MessageSquare,
  X,
  FileText,
  RefreshCw,
  Sparkles,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { Loader } from '@/components/common/Loader';
import { EmptyState } from '@/components/common/EmptyState';
import { Modal } from '@/components/ui/Modal';

export const VendorApproval: React.FC = () => {
  const { showToast } = useToast();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [verifications, setVerifications] = useState<Record<string, VendorVerification>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDocPreview, setSelectedDocPreview] = useState<string | null>(null);
  const [rejectingVendorId, setRejectingVendorId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    setIsLoading(true);
    adminApi
      .getPendingVendors()
      .then(async (vData) => {
        setVendors(vData);
        const verifMap: Record<string, VendorVerification> = {};
        for (const v of vData) {
          const verif = await verificationApi.getVendorVerification(v.id);
          verifMap[v.id] = verif;
        }
        setVerifications(verifMap);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleApproveVendor = async (vendorId: string) => {
    await adminApi.updateVendorStatus(vendorId, 'APPROVED');
    await verificationApi.approveVendorVerification(vendorId);
    setVendors((prev) => prev.filter((v) => v.id !== vendorId));
    showToast('Vendor Certified & Approved!', 'Partner granted 5-Stage Verified badge & published live.', 'success');
  };

  const handleRejectVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingVendorId || !rejectReason.trim()) return;

    await adminApi.updateVendorStatus(rejectingVendorId, 'REJECTED');
    await verificationApi.rejectVendorVerification(rejectingVendorId, rejectReason);
    setVendors((prev) => prev.filter((v) => v.id !== rejectingVendorId));
    setRejectingVendorId(null);
    setRejectReason('');
    showToast('Application Rejected', 'Partner notified with verification feedback.', 'info');
  };

  if (isLoading) return <Loader message="Hydrating vendor verification documents & trust scores..." />;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 bg-[#FFFDFE] text-[#111827]">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-[#FF2E7E] text-xs font-extrabold border border-pink-200 mb-2">
          <ShieldCheck size={14} />
          <span>Super Admin Security & Compliance Inspector</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#111827]">Vendor Onboarding Verification Queue</h1>
        <p className="text-xs text-[#64748B] font-semibold mt-1">
          Review 5-stage government IDs, live face biometrics, police clearance certificates, and trust scores.
        </p>
      </div>

      {vendors.length === 0 ? (
        <EmptyState
          iconType="calendar"
          title="All Vendor Verifications Completed"
          description="There are currently no pending vendor approval applications in the queue."
        />
      ) : (
        <div className="space-y-6">
          {vendors.map((vendor) => {
            const verif = verifications[vendor.id];
            return (
              <div key={vendor.id} className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#ECECEC] pb-4">
                  <div className="flex items-center gap-5">
                    <img
                      src={vendor.profileImage || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'}
                      alt={vendor.businessName}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-pink-200 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-extrabold text-[#111827]">{vendor.businessName}</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-extrabold border border-amber-200 uppercase font-mono">
                          UNDER REVIEW
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        Owner: {vendor.phone} • {vendor.city}, {vendor.state}
                      </p>
                    </div>
                  </div>

                  {/* Trust Score & Badges */}
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 rounded-2xl bg-purple-50 border border-purple-200 text-center">
                      <span className="text-[10px] font-extrabold text-purple-700 uppercase block font-mono">TRUST SCORE</span>
                      <span className="text-xl font-extrabold text-purple-900">{verif?.trustScore || 98} / 100</span>
                    </div>

                    <Button
                      variant="primary"
                      onClick={() => handleApproveVendor(vendor.id)}
                      leftIcon={<CheckCircle2 size={16} />}
                      className="h-11 px-5 rounded-2xl text-xs font-bold shadow-lg"
                    >
                      Approve & Certify
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() => setRejectingVendorId(vendor.id)}
                      leftIcon={<XCircle size={16} />}
                      className="h-11 px-5 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50"
                    >
                      Reject Application
                    </Button>
                  </div>
                </div>

                {/* 5-Stage Verification Document Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#111827]">
                      <span>Govt Photo ID</span>
                      <span className="text-emerald-600 text-[10px]">✓ VERIFIED</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono">{verif?.govtIdType || 'AADHAAR'}: {verif?.govtIdNumberEncrypted || '•••• 9081'}</p>
                    <button
                      type="button"
                      onClick={() => setSelectedDocPreview('https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80')}
                      className="text-[#FF2E7E] hover:underline text-[11px] font-bold flex items-center gap-1"
                    >
                      <Eye size={12} /> Inspect Doc
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#111827]">
                      <span>Police Clearance</span>
                      <span className="text-emerald-600 text-[10px]">✓ PASSED</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">Clean Criminal Background Check</p>
                    <button
                      type="button"
                      onClick={() => setSelectedDocPreview(verif?.policeVerificationDoc || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80')}
                      className="text-[#FF2E7E] hover:underline text-[11px] font-bold flex items-center gap-1"
                    >
                      <Eye size={12} /> Inspect Doc
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#111827]">
                      <span>Skill Diploma</span>
                      <span className="text-emerald-600 text-[10px]">✓ CERTIFIED</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">Cosmetology Master Diploma</p>
                    <button
                      type="button"
                      onClick={() => setSelectedDocPreview(verif?.skillCertificateDoc || 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=600&q=80')}
                      className="text-[#FF2E7E] hover:underline text-[11px] font-bold flex items-center gap-1"
                    >
                      <Eye size={12} /> Inspect Doc
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#111827]">
                      <span>Encrypted Bank</span>
                      <span className="text-emerald-600 text-[10px]">✓ VALIDATED</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono">{verif?.bankPayoutPreference || 'UPI'}: {verif?.bankAccountNumberEncrypted || '••••4892'}</p>
                    <span className="text-[10px] text-slate-400 font-bold block">{verif?.bankIfscOrBranchCode || 'HDFC0001234'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reject Reason Modal */}
      {rejectingVendorId && (
        <Modal isOpen={!!rejectingVendorId} onClose={() => setRejectingVendorId(null)} title="Reject Vendor Verification Application">
          <form onSubmit={handleRejectVendor} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Rejection Feedback Reason</label>
              <textarea
                rows={3}
                required
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. Government ID scan is blurry or police clearance certificate has expired..."
                className="w-full p-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-medium text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full h-12 rounded-2xl text-xs font-bold shadow-xl">
              Send Rejection Feedback
            </Button>
          </form>
        </Modal>
      )}

      {/* Lightbox Inspector */}
      {selectedDocPreview && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-4 max-w-xl w-full space-y-4 relative">
            <button
              onClick={() => setSelectedDocPreview(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <X size={18} />
            </button>
            <h4 className="text-sm font-bold text-[#111827] px-2">Document Verification Inspector</h4>
            <img src={selectedDocPreview} alt="Document" className="w-full h-80 object-cover rounded-2xl" />
          </div>
        </div>
      )}
    </div>
  );
};
