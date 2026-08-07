import React, { useState, useEffect } from 'react';
import { serviceApi } from '@/api/service';
import { vendorServiceApi } from '@/api/vendorService.api';
import { Service, VendorService } from '@/types';
import { Plus, Edit2, Trash2, CheckCircle2, Clock, DollarSign, Tag, Save, X, Sparkles, Globe, MapPin, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { Loader } from '@/components/common/Loader';
import { Modal } from '@/components/ui/Modal';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency } from '@/utils/formatters';
import { isVendorBusinessLocked } from '@/middleware/rbacMiddleware';

export const MyServices: React.FC = () => {
  const { showToast } = useToast();
  const { user } = useAuth();
  const [activeCountryCode, setActiveCountryCode] = useState<'IN' | 'NP'>('IN');
  const [globalServices, setGlobalServices] = useState<Service[]>([]);
  const [vendorOfferings, setVendorOfferings] = useState<VendorService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Activate Master Catalog Modal
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
  const [selectedMasterServiceId, setSelectedMasterServiceId] = useState<string>('');

  // Edit Modal State
  const [editingOffering, setEditingOffering] = useState<VendorService | null>(null);
  const [editPrice, setEditPrice] = useState<number>(1499);
  const [editDiscountPrice, setEditDiscountPrice] = useState<number>(1199);
  const [editDuration, setEditDuration] = useState<number>(60);
  const [editArea, setEditArea] = useState<string>('Indiranagar');

  const isPendingVendor = isVendorBusinessLocked(user);
  const isApprovedVendor = !isPendingVendor && (user?.role === 'SUPER_ADMIN' || user?.role === 'VENDOR' || user?.role === 'VENDOR_OWNER' || user?.role === 'PROFESSIONAL' || (user as any)?.verificationStatus === 'APPROVED');

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
        if (gData.length > 0) {
          setSelectedMasterServiceId(gData[0].id);
        }
      })
      .finally(() => setIsLoading(false));
  }, [activeCountryCode]);

  const handleOpenEdit = (offering: VendorService) => {
    setEditingOffering(offering);
    setEditPrice(offering.price);
    setEditDiscountPrice(offering.discountPrice || offering.price);
    setEditDuration(offering.duration);
    setEditArea(offering.area || 'Indiranagar');
  };

  const handleSaveOffering = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOffering) return;

    // Min & Max Price Range Cap Validation
    const masterService = globalServices.find((s) => s.id === editingOffering.serviceId) || editingOffering.service;
    const minCap = masterService?.minPrice || 300;
    const maxCap = masterService?.maxPrice || 5000;
    const currSym = countryConfig[activeCountryCode].currencySymbol;

    if (editPrice < minCap || editPrice > maxCap) {
      showToast(
        'Pricing Range Cap Violation',
        `Price must be between ${currSym}${minCap} and ${currSym}${maxCap} as defined in Admin Master Catalog.`,
        'error'
      );
      return;
    }

    const updated = vendorOfferings.map((vo) =>
      vo.id === editingOffering.id
        ? {
            ...vo,
            price: Number(editPrice),
            discountPrice: Number(editDiscountPrice),
            discountPercentage: Math.round(((editPrice - editDiscountPrice) / editPrice) * 100),
            duration: Number(editDuration),
            area: editArea,
          }
        : vo
    );

    setVendorOfferings(updated);
    setEditingOffering(null);
    showToast(
      'Service Pricing Updated!',
      `Live business price set to ${currSym}${editPrice} (${countryConfig[activeCountryCode].name}).`,
      'success'
    );
  };

  const handleActivateMasterService = async (e: React.FormEvent) => {
    e.preventDefault();
    const masterService = globalServices.find((s) => s.id === selectedMasterServiceId);
    if (!masterService) return;

    const newOffering: VendorService = {
      id: `vs_${Date.now()}`,
      vendorId: 'vendor_1',
      serviceId: masterService.id,
      country: activeCountryCode,
      state: activeCountryCode === 'NP' ? 'Bagmati' : 'Karnataka',
      city: activeCountryCode === 'NP' ? 'Kathmandu' : 'Bengaluru',
      area: activeCountryCode === 'NP' ? 'Durbar Marg' : 'Indiranagar',
      price: masterService.price || 1499,
      discountPrice: Math.round((masterService.price || 1499) * 0.8),
      discountPercentage: 20,
      duration: masterService.defaultDuration || 45,
      experienceYears: 5,
      available: true,
      instantBooking: true,
      homeService: true,
      serviceRadius: 10,
      maxBookingsPerDay: 6,
      status: 'ACTIVE',
      service: masterService,
    };

    setVendorOfferings((prev) => [...prev, newOffering]);
    setIsActivateModalOpen(false);
    showToast('Catalog Treatment Activated!', `Successfully published ${masterService.title} for ${countryConfig[activeCountryCode].name}.`, 'success');
  };

  if (isLoading) return <Loader message="Hydrating dynamic vendor pricing & master catalog..." />;

  return (
    <div className="space-y-8 pb-20 bg-[#FFFDFE] text-[#111827]">
      {/* Header & Country Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-[#FF2E7E] text-xs font-extrabold border border-pink-200 mb-2">
            <Globe size={14} />
            <span>Dynamic Marketplace Pricing Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">My Service Catalog & Pricing</h1>
          <p className="text-xs text-[#64748B] font-semibold mt-1">
            Set custom business prices, discounts, and duration within Admin catalog min/max caps.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            if (isPendingVendor) {
              showToast('Access Restricted', 'Your account must be approved before using this feature.', 'error');
              return;
            }
            setIsActivateModalOpen(true);
          }}
          leftIcon={<Plus size={16} />}
          disabled={!isApprovedVendor}
          title={isPendingVendor ? 'Your account must be approved before using this feature.' : undefined}
          className="h-11 px-5 rounded-2xl text-xs font-bold shadow-lg"
        >
          + Activate Master Treatment
        </Button>
      </div>

      {/* Region Selector Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit border border-[#ECECEC]">
        {(['IN', 'NP'] as const).map((code) => {
          const cfg = countryConfig[code];
          const isActive = activeCountryCode === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setActiveCountryCode(code)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#FF2E7E] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#111827]'
              }`}
            >
              <span>{cfg.flag}</span>
              <span>{cfg.name} ({cfg.currencySymbol} {cfg.currency})</span>
            </button>
          );
        })}
      </div>

      {/* Offerings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vendorOfferings.map((offering) => {
          const currSym = countryConfig[activeCountryCode].currencySymbol;
          const master = globalServices.find((s) => s.id === offering.serviceId) || offering.service;

          return (
            <div key={offering.id} className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={master?.image || 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=200&q=80'}
                    alt=""
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-pink-200"
                  />
                  <div>
                    <h3 className="text-base font-bold text-[#111827]">{master?.title || 'Master Treatment'}</h3>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <MapPin size={12} className="text-[#FF2E7E]" /> {offering.area || 'Indiranagar'}, {offering.city || 'Bengaluru'}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEdit(offering)}
                  leftIcon={<Edit2 size={14} />}
                  className="h-9 px-3 text-xs font-bold rounded-xl"
                >
                  Edit Price
                </Button>
              </div>

              {/* Price Breakdown */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Master Cap</span>
                  <span className="text-xs font-extrabold text-slate-700 block">
                    {currSym}{master?.minPrice || 300} - {currSym}{master?.maxPrice || 5000}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-pink-50 border border-pink-100 space-y-0.5">
                  <span className="text-[10px] font-bold text-[#FF2E7E] uppercase">Your Live Price</span>
                  <span className="text-base font-extrabold text-[#FF2E7E] block">
                    {currSym}{offering.price}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Duration</span>
                  <span className="text-xs font-extrabold text-slate-700 block">
                    {offering.duration} Mins
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Pricing Modal */}
      {editingOffering && (
        <Modal isOpen={!!editingOffering} onClose={() => setEditingOffering(null)} title="Update Dynamic Service Pricing">
          <form onSubmit={handleSaveOffering} className="space-y-4 pt-2">
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-600 shrink-0" />
              <span>
                Admin Master Price Range: {countryConfig[activeCountryCode].currencySymbol}
                {(globalServices.find((s) => s.id === editingOffering.serviceId) || editingOffering.service)?.minPrice || 300} - {countryConfig[activeCountryCode].currencySymbol}
                {(globalServices.find((s) => s.id === editingOffering.serviceId) || editingOffering.service)?.maxPrice || 5000}
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Custom Price ({countryConfig[activeCountryCode].currencySymbol})</label>
              <input
                type="number"
                required
                value={editPrice}
                onChange={(e) => setEditPrice(Number(e.target.value))}
                className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Discount Price</label>
                <input
                  type="number"
                  value={editDiscountPrice}
                  onChange={(e) => setEditDiscountPrice(Number(e.target.value))}
                  className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Duration (Mins)</label>
                <input
                  type="number"
                  required
                  value={editDuration}
                  onChange={(e) => setEditDuration(Number(e.target.value))}
                  className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full h-12 rounded-2xl text-xs font-bold shadow-xl pt-2">
              Save Dynamic Pricing
            </Button>
          </form>
        </Modal>
      )}

      {/* Activate Master Service Modal */}
      {isActivateModalOpen && (
        <Modal isOpen={isActivateModalOpen} onClose={() => setIsActivateModalOpen(false)} title="Activate Treatment From Admin Master Catalog">
          <form onSubmit={handleActivateMasterService} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Select Master Service</label>
              <select
                value={selectedMasterServiceId}
                onChange={(e) => setSelectedMasterServiceId(e.target.value)}
                className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
              >
                {globalServices.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.category})
                  </option>
                ))}
              </select>
            </div>

            <Button type="submit" variant="primary" className="w-full h-12 rounded-2xl text-xs font-bold shadow-xl">
              Publish Service to Catalog
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
};
