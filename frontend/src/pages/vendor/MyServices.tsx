import React, { useState, useEffect } from 'react';
import { serviceApi } from '@/api/service';
import { vendorServiceApi } from '@/api/vendorService.api';
import { Service, VendorService } from '@/types';
import { Plus, Edit2, Trash2, CheckCircle2, Clock, DollarSign, Tag, Save, X, Sparkles, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { formatCurrency } from '@/utils/formatters';
import { Loader } from '@/components/common/Loader';
import { Modal } from '@/components/ui/Modal';

export const MyServices: React.FC = () => {
  const { showToast } = useToast();
  const [activeCountryCode, setActiveCountryCode] = useState<'IN' | 'NP'>('IN');
  const [globalServices, setGlobalServices] = useState<Service[]>([]);
  const [vendorOfferings, setVendorOfferings] = useState<VendorService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Edit Modal State
  const [editingOffering, setEditingOffering] = useState<VendorService | null>(null);
  const [editPrice, setEditPrice] = useState<number>(1499);
  const [editDiscountPrice, setEditDiscountPrice] = useState<number>(1199);
  const [editDuration, setEditDuration] = useState<number>(60);

  const countryConfig = {
    IN: { name: 'India', flag: '🇮🇳', currencySymbol: '₹', currency: 'INR' },
    NP: { name: 'Nepal', flag: '🇳🇵', currencySymbol: 'रु', currency: 'NPR' },
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      serviceApi.getAllServices(),
      vendorServiceApi.getVendorServicesByVendorId('vendor_1', activeCountryCode),
    ])
      .then(([gData, vData]) => {
        setGlobalServices(gData);
        setVendorOfferings(vData);
      })
      .finally(() => setIsLoading(false));
  }, [activeCountryCode]);

  const handleOpenEdit = (offering: VendorService) => {
    setEditingOffering(offering);
    setEditPrice(offering.price);
    setEditDiscountPrice(offering.discountPrice || offering.price);
    setEditDuration(offering.duration);
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
          }
        : vo
    );

    setVendorOfferings(updated);
    setEditingOffering(null);
    showToast(
      'Independent Price Saved!',
      `Updated ${countryConfig[activeCountryCode].name} pricing (${countryConfig[activeCountryCode].currencySymbol}${editDiscountPrice}). Other regions remain untouched.`,
      'success'
    );
  };

  if (isLoading) return <Loader message="Loading your vendor service catalog..." />;

  const currentConfig = countryConfig[activeCountryCode];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 bg-[#FFFDFE] text-[#111827]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Multi-Country Independent Pricing Manager</h1>
          <p className="text-xs text-[#64748B] font-semibold mt-1">
            Configure independent pricing, discounts, and duration rules for each region (Zero currency exchange conversion).
          </p>
        </div>

        <Button variant="primary" onClick={() => showToast('Listing Created', `Added new offering for ${currentConfig.name}.`, 'success')} leftIcon={<Plus size={16} />} className="h-11 px-5 rounded-2xl text-xs font-bold">
          Add {currentConfig.name} Service
        </Button>
      </div>

      {/* Country Tabs */}
      <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-slate-100 border border-[#ECECEC] max-w-md">
        <button
          type="button"
          onClick={() => setActiveCountryCode('IN')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeCountryCode === 'IN' ? 'bg-[#FF2E7E] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🇮🇳 India</span>
          <span className="opacity-80 font-mono">(₹ INR)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCountryCode('NP')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeCountryCode === 'NP' ? 'bg-[#FF2E7E] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🇳🇵 Nepal</span>
          <span className="opacity-80 font-mono">(रु NPR)</span>
        </button>
      </div>

      {/* Independent Vendor Service Offerings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vendorOfferings.map((offering) => (
          <div key={offering.id} className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-pink-50 text-[#FF2E7E] text-[10px] font-extrabold border border-pink-200 flex items-center gap-1.5">
                <span>{currentConfig.flag}</span>
                <span>{currentConfig.name} Independent Listing</span>
              </span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 size={14} /> ACTIVE
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#111827]">{offering.service?.title || 'Diamond Hydra-Glow Facial'}</h3>
              <p className="text-xs text-[#64748B]">{offering.service?.description}</p>
            </div>

            {/* Price & Duration Details */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">{currentConfig.name} List Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-extrabold text-[#FF2E7E]">
                    {formatCurrency(offering.discountPrice || offering.price, currentConfig.currencySymbol, currentConfig.currency)}
                  </span>
                  {offering.discountPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      {formatCurrency(offering.price, currentConfig.currencySymbol, currentConfig.currency)}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Duration</span>
                <span className="text-sm font-bold text-[#111827]">{offering.duration} Mins</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => handleOpenEdit(offering)}
                leftIcon={<Edit2 size={14} />}
                className="w-full h-11 text-xs font-bold rounded-2xl"
              >
                Edit {currentConfig.name} Pricing
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Offering Modal */}
      {editingOffering && (
        <Modal isOpen={!!editingOffering} onClose={() => setEditingOffering(null)} title={`Edit ${currentConfig.name} Business Pricing (${currentConfig.flag})`}>
          <form onSubmit={handleSaveOffering} className="space-y-4 pt-2">
            <div className="p-3 rounded-xl bg-pink-50 text-xs text-slate-700 font-medium">
              Editing prices here applies strictly to <span className="font-bold text-[#FF2E7E]">{currentConfig.name} ({currentConfig.currencySymbol})</span>. Other country listings are independent and unchanged.
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">List Price ({currentConfig.currencySymbol})</label>
              <input
                type="number"
                required
                value={editPrice}
                onChange={(e) => setEditPrice(Number(e.target.value))}
                className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Discount Price ({currentConfig.currencySymbol})</label>
              <input
                type="number"
                required
                value={editDiscountPrice}
                onChange={(e) => setEditDiscountPrice(Number(e.target.value))}
                className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Duration (Minutes)</label>
              <input
                type="number"
                required
                value={editDuration}
                onChange={(e) => setEditDuration(Number(e.target.value))}
                className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
              />
            </div>

            <Button type="submit" variant="primary" leftIcon={<Save size={16} />} className="w-full h-12 rounded-2xl text-xs font-bold shadow-xl pt-2">
              Save {currentConfig.name} Pricing
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
};
