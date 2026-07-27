import React, { useState, useEffect } from 'react';
import { serviceApi } from '@/api/service';
import { vendorServiceApi } from '@/api/vendorService.api';
import { Service, VendorService } from '@/types';
import { Plus, Edit2, Trash2, CheckCircle2, Clock, DollarSign, Tag, Save, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { formatCurrency } from '@/utils/formatters';
import { Loader } from '@/components/common/Loader';

export const MyServices: React.FC = () => {
  const { showToast } = useToast();
  const [globalServices, setGlobalServices] = useState<Service[]>([]);
  const [vendorOfferings, setVendorOfferings] = useState<VendorService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Edit Modal State
  const [editingOffering, setEditingOffering] = useState<VendorService | null>(null);
  const [editPrice, setEditPrice] = useState<number>(1499);
  const [editDiscountPrice, setEditDiscountPrice] = useState<number>(1199);
  const [editDuration, setEditDuration] = useState<number>(60);
  const [editExperience, setEditExperience] = useState<number>(8);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      serviceApi.getAllServices(),
      vendorServiceApi.getVendorServicesByVendorId('vendor_1'),
    ])
      .then(([gData, vData]) => {
        setGlobalServices(gData);
        setVendorOfferings(vData);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleOpenEdit = (offering: VendorService) => {
    setEditingOffering(offering);
    setEditPrice(offering.price);
    setEditDiscountPrice(offering.discountPrice || offering.price);
    setEditDuration(offering.duration);
    setEditExperience(offering.experienceYears);
  };

  const handleSaveOffering = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOffering) return;

    const updated = vendorOfferings.map((vo) =>
      vo.id === editingOffering.id
        ? {
            ...vo,
            price: Number(editPrice),
            discountPrice: Number(editDiscountPrice),
            discountPercentage: Math.round(((editPrice - editDiscountPrice) / editPrice) * 100),
            duration: Number(editDuration),
            experienceYears: Number(editExperience),
          }
        : vo
    );

    setVendorOfferings(updated);
    setEditingOffering(null);
    showToast('Offering Updated!', 'Your custom price, discount, and duration have been saved. Other vendors are unaffected.', 'success');
  };

  if (isLoading) return <Loader message="Loading your vendor service catalog..." />;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 bg-[#FFFDFE] text-[#111827]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Vendor Service Offerings & Pricing</h1>
          <p className="text-xs text-[#64748B] font-semibold mt-1">
            Manage your independent service catalog listings, custom prices, discounts, and duration rules.
          </p>
        </div>

        <Button variant="primary" onClick={() => showToast('Listing Created', 'Added new global service offering to your vendor menu.', 'success')} leftIcon={<Plus size={16} />} className="h-11 px-5 rounded-2xl text-xs font-bold">
          List New Service
        </Button>
      </div>

      {/* Independent Vendor Service Offerings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vendorOfferings.map((offering) => (
          <div key={offering.id} className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-pink-50 text-[#FF2E7E] text-[10px] font-extrabold border border-pink-200">
                Independent Vendor Listing
              </span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 size={14} /> ACTIVE LISTING
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#111827]">{offering.service?.title || 'Diamond Hydra-Glow Facial'}</h3>
              <p className="text-xs text-[#64748B]">{offering.service?.description}</p>
            </div>

            {/* Price & Duration Details */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Your List Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-extrabold text-[#FF2E7E]">{formatCurrency(offering.discountPrice || offering.price)}</span>
                  {offering.discountPrice && <span className="text-xs text-slate-400 line-through">₹{offering.price}</span>}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Duration</span>
                <span className="text-sm font-bold text-[#111827]">{offering.duration} Minutes</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => handleOpenEdit(offering)}
                className="flex-1 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#111827] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Edit2 size={14} /> Edit My Price & Duration
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingOffering && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <form onSubmit={handleSaveOffering} className="max-w-md w-full p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
              <h3 className="text-base font-bold text-[#111827]">Edit Vendor Pricing & Rules</h3>
              <button type="button" onClick={() => setEditingOffering(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#111827] block mb-1">Original Rack Price (₹)</label>
                <input
                  type="number"
                  required
                  value={editPrice}
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                  className="w-full h-11 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-[#111827]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#111827] block mb-1">Discounted Offer Price (₹)</label>
                <input
                  type="number"
                  required
                  value={editDiscountPrice}
                  onChange={(e) => setEditDiscountPrice(Number(e.target.value))}
                  className="w-full h-11 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-[#FF2E7E]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#111827] block mb-1">Treatment Duration (Minutes)</label>
                <input
                  type="number"
                  required
                  value={editDuration}
                  onChange={(e) => setEditDuration(Number(e.target.value))}
                  className="w-full h-11 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-[#111827]"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full h-12 rounded-2xl text-xs font-bold" leftIcon={<Save size={16} />}>
              Save Vendor Listing Changes
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
