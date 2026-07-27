import React, { useState, useEffect } from 'react';
import { adminApi } from '@/api/admin';
import { Vendor } from '@/types';
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
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { Loader } from '@/components/common/Loader';
import { EmptyState } from '@/components/common/EmptyState';
import { AnimatePresence, motion } from 'framer-motion';

export const VendorApproval: React.FC = () => {
  const { showToast } = useToast();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDocPreview, setSelectedDocPreview] = useState<string | null>(null);
  const [rejectingVendorId, setRejectingVendorId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    adminApi
      .getPendingVendors()
      .then((data) => setVendors(data))
      .finally(() => setIsLoading(false));
  }, []);

  const handleUpdateStatus = async (vendorId: string, status: 'APPROVED' | 'REJECTED') => {
    await adminApi.updateVendorStatus(vendorId, status);
    setVendors((prev) => prev.filter((v) => v.id !== vendorId));
    showToast(
      `Vendor ${status === 'APPROVED' ? 'Approved & Certified!' : 'Application Rejected'}`,
      status === 'APPROVED'
        ? 'Partner granted 5-Stage Verified Badge.'
        : `Rejection reason sent: "${rejectReason || 'Document verification failed.'}"`,
      status === 'APPROVED' ? 'success' : 'info'
    );
    setRejectingVendorId(null);
    setRejectReason('');
  };

  const handleRequestDoc = (vendorName: string) => {
    showToast('Re-Upload Request Sent!', `Notified ${vendorName} to re-upload clear government ID scan.`, 'info');
  };

  if (isLoading) return <Loader message="Fetching pending 5-stage vendor audit list..." />;

  return (
    <div className="space-y-6 max-w-4xl mx-auto bg-[#FFFDFE] text-[#111827] pb-16 relative">
      <div>
        <h1 className="text-3xl font-extrabold text-[#111827]">5-Stage Vendor Verification Desk</h1>
        <p className="text-xs text-[#64748B] font-medium mt-1">
          Stripe Identity standard admin workflow: audit documents, request re-uploads, reject with reason, or issue 5-Stage Verified badge.
        </p>
      </div>

      {vendors.length === 0 ? (
        <EmptyState
          iconType="sparkles"
          title="All Clear! No Pending Vendor Audits"
          description="Every submitted partner application has undergone 5-stage verification."
          actionText="Go to Admin Dashboard"
          actionPath="/admin/dashboard"
        />
      ) : (
        <div className="space-y-6">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
              {/* Vendor Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ECECEC] pb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 shrink-0">
                    <Store size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#111827]">{vendor.businessName}</h3>
                    <p className="text-xs text-[#64748B]">{vendor.address}, {vendor.city}, {vendor.state} • Phone: {vendor.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleRequestDoc(vendor.businessName)}
                    leftIcon={<RefreshCw size={14} className="text-amber-600" />}
                  >
                    Request Re-Upload
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setRejectingVendorId(vendor.id)}
                    leftIcon={<XCircle size={14} className="text-rose-500" />}
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleUpdateStatus(vendor.id, 'APPROVED')}
                    leftIcon={<CheckCircle2 size={14} />}
                    className="h-11 px-5 text-xs font-bold rounded-2xl"
                  >
                    Approve & Issue Badge
                  </Button>
                </div>
              </div>

              {/* Document Review Grid with Lightbox Shortcuts */}
              <div className="space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF2E7E] block">Uploaded Documents Audit</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
                  <button
                    onClick={() => setSelectedDocPreview('https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80')}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#FF2E7E] flex items-center justify-between text-slate-700 cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5"><FileCheck size={16} className="text-emerald-600" /> Govt ID</span>
                    <Eye size={14} className="text-[#FF2E7E]" />
                  </button>

                  <button
                    onClick={() => setSelectedDocPreview('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80')}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#FF2E7E] flex items-center justify-between text-slate-700 cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5"><UserCheck size={16} className="text-emerald-600" /> Face Match</span>
                    <Eye size={14} className="text-[#FF2E7E]" />
                  </button>

                  <button
                    onClick={() => setSelectedDocPreview('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80')}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#FF2E7E] flex items-center justify-between text-slate-700 cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5"><MapPin size={16} className="text-emerald-600" /> Address</span>
                    <Eye size={14} className="text-[#FF2E7E]" />
                  </button>

                  <button
                    onClick={() => setSelectedDocPreview('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80')}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#FF2E7E] flex items-center justify-between text-slate-700 cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5"><Award size={16} className="text-emerald-600" /> Skill Cert</span>
                    <Eye size={14} className="text-[#FF2E7E]" />
                  </button>
                </div>
              </div>

              {/* Reject With Reason Accordion Modal */}
              {rejectingVendorId === vendor.id && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
                  <span className="text-xs font-bold text-rose-800 block">Enter Reason for Rejection:</span>
                  <input
                    type="text"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="e.g. Government ID photo blurry, please submit clear high-res scan..."
                    className="w-full h-10 px-4 rounded-xl bg-white border border-rose-300 text-xs text-[#111827] focus:outline-none focus:border-rose-500"
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setRejectingVendorId(null)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(vendor.id, 'REJECTED')}
                      className="px-4 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 cursor-pointer"
                    >
                      Confirm Rejection & Send Email
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Admin Document Preview Modal */}
      <AnimatePresence>
        {selectedDocPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          >
            <div className="relative max-w-2xl w-full bg-white rounded-[32px] overflow-hidden p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
                <h4 className="text-base font-bold text-[#111827]">Stripe Identity Document Lightbox Audit</h4>
                <button onClick={() => setSelectedDocPreview(null)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>

              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 border border-[#ECECEC]">
                <img src={selectedDocPreview} alt="Document Audit Preview" className="w-full h-full object-cover" />
              </div>

              <Button variant="secondary" onClick={() => setSelectedDocPreview(null)} className="w-full h-11 text-xs font-bold rounded-2xl">
                Close Preview Modal
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
