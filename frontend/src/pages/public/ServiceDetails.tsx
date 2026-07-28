import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  Clock,
  ShieldCheck,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  MapPin,
  ArrowRight,
  Zap,
  Tag,
  DollarSign,
  ChevronDown,
  Building,
  Globe,
} from 'lucide-react';
import { serviceApi } from '@/api/service';
import { vendorServiceApi } from '@/api/vendorService.api';
import { Service, VendorService } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { useCountry } from '@/context/CountryContext';
import { SkeletonLoader } from '@/components/common/SkeletonLoader';

export const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();
  const { selectedCountry, formatPrice } = useCountry();

  const [service, setService] = useState<Service | null>(null);
  const [vendorOfferings, setVendorOfferings] = useState<VendorService[]>([]);
  const [selectedOffering, setSelectedOffering] = useState<VendorService | null>(null);
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [isLoading, setIsLoading] = useState(true);

  const timeSlots = ['10:00 AM', '12:30 PM', '02:00 PM', '04:30 PM', '06:00 PM'];

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      serviceApi.getServiceById(id || 'service_1'),
      vendorServiceApi.getVendorServicesByGlobalServiceId(id || 'service_1', selectedCountry.code),
    ])
      .then(([sData, vData]) => {
        setService(sData);
        setVendorOfferings(vData);
        if (vData.length > 0) {
          setSelectedOffering(vData[0]);
        }
      })
      .finally(() => setIsLoading(false));
  }, [id, selectedCountry]);

  const handleBookVendorOffering = (offering: VendorService) => {
    if (!isAuthenticated) {
      showToast('Sign In Required', 'Please log in to your NexServe account to continue booking.', 'info');
      navigate('/login');
      return;
    }

    showToast('Slot Selected!', `Booking session with ${offering.vendor?.businessName || 'Verified Beautician'} for ${selectedSlot}.`, 'success');
    navigate(`/customer/book/${service?.id || 'service_1'}`);
  };

  if (isLoading || !service) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 pb-20 pt-6 px-4">
        <SkeletonLoader type="banner" />
        <SkeletonLoader type="list" count={4} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-28 px-4 bg-[#FFFDFE] text-[#111827] relative">
      {/* 1. GLOBAL SERVICE HEADER BANNER */}
      <div className="p-8 md:p-12 rounded-[40px] bg-gradient-to-br from-pink-500/90 via-[#FF2E7E] to-purple-900 text-white shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="purple">GLOBAL TREATMENT DEFINITION</Badge>
          <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md flex items-center gap-1.5">
            <span>{selectedCountry.flag}</span>
            <span>Region: {selectedCountry.name} ({selectedCountry.currency})</span>
          </span>
        </div>

        <div className="space-y-3 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            {service.title}
          </h1>
          <p className="text-sm sm:text-base text-pink-100 font-normal leading-relaxed">
            {service.description}
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-bold pt-2 border-t border-white/20">
          <div className="flex items-center gap-1.5"><Clock size={16} /> <span>{service.duration} Mins Session</span></div>
          <div className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-emerald-300" /> <span>5-Stage Certified Beauticians</span></div>
        </div>
      </div>

      {/* 2. MULTI-VENDOR MARKETPLACE COMPARISON TABLE (TRUST BADGES & SCORES) */}
      <div className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 text-[#FF2E7E] text-xs font-extrabold border border-pink-200">
            <Building size={14} />
            <span>Multi-Vendor Marketplace Comparison ({selectedCountry.name})</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-2">
            Select Certified Professional Offering This Service
          </h2>
          <p className="text-xs text-[#64748B] font-semibold mt-1">
            Compare independent {selectedCountry.name} business prices ({selectedCountry.currencySymbol}), ratings, and 5-stage verified trust scores
          </p>
        </div>

        <div className="space-y-4">
          {vendorOfferings.map((offering) => {
            const isSelected = selectedOffering?.id === offering.id;
            return (
              <div
                key={offering.id}
                onClick={() => setSelectedOffering(offering)}
                className={`p-6 md:p-8 rounded-[32px] bg-white border transition-all cursor-pointer space-y-6 ${
                  isSelected
                    ? 'border-[#FF2E7E] shadow-2xl shadow-[#FF2E7E]/10 ring-2 ring-[#FF2E7E]/20'
                    : 'border-[#ECECEC] shadow-xl hover:border-pink-300'
                }`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  {/* Vendor Info & Trust Badges */}
                  <div className="flex items-center gap-5">
                    <img
                      src={offering.vendor?.profileImage || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'}
                      alt={offering.vendor?.businessName}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-pink-200 shrink-0"
                    />
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-[#111827]">{offering.vendor?.businessName}</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200">
                          ✓ 5-Stage Verified
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-extrabold border border-purple-200">
                          🏆 98 Trust Score
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star size={14} className="fill-amber-400" /> {offering.vendor?.averageRating || 4.9}★ ({offering.vendor?.totalReviews || 128} Reviews)
                        </span>
                        <span>•</span>
                        <span>{offering.experienceYears} Years Exp</span>
                        <span>•</span>
                        <span>{offering.serviceRadius} km Radius</span>
                      </div>
                    </div>
                  </div>

                  {/* Independent Price & Discount Controls */}
                  <div className="flex items-center gap-6">
                    <div className="text-left md:text-right">
                      {offering.discountPrice && (
                        <span className="text-xs text-slate-400 line-through block">
                          {formatPrice(offering.price)}
                        </span>
                      )}
                      <span className="text-2xl font-extrabold text-[#FF2E7E]">
                        {formatPrice(offering.discountPrice || offering.price)}
                      </span>
                      {offering.discountPercentage && offering.discountPercentage > 0 && (
                        <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full block mt-0.5">
                          {offering.discountPercentage}% OFF
                        </span>
                      )}
                    </div>

                    <Button
                      variant={isSelected ? 'primary' : 'secondary'}
                      onClick={() => handleBookVendorOffering(offering)}
                      className="h-12 px-6 text-xs font-bold rounded-2xl shrink-0"
                    >
                      Book Professional
                    </Button>
                  </div>
                </div>

                {/* Time Slot Picker */}
                {isSelected && (
                  <div className="pt-4 border-t border-[#ECECEC] space-y-3">
                    <span className="text-xs font-bold text-[#111827] block">Select Slot for {offering.vendor?.businessName}:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSlot(slot);
                          }}
                          className={`py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                            selectedSlot === slot
                              ? 'bg-[#FF2E7E] text-white border-transparent shadow-md'
                              : 'bg-slate-50 border-[#ECECEC] text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
