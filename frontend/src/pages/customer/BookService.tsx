import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { serviceApi } from '@/api/service';
import { bookingApi } from '@/api/booking';
import { Service } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import { Calendar, MapPin, FileText, ArrowRight, ShieldCheck, Clock, CheckCircle2, Sparkles, Home, Building } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { Loader } from '@/components/common/Loader';
import { MOCK_SERVICES } from '@/services/mockDataService';

export const BookService: React.FC = () => {
  const { id, serviceId } = useParams<{ id?: string; serviceId?: string }>();
  const targetId = id || serviceId;
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [bookingDate, setBookingDate] = useState('2026-08-08T14:00');
  const [address, setAddress] = useState('Durbar Marg, Ward 1, Kathmandu, Nepal');
  const [addressTag, setAddressTag] = useState<'home' | 'office' | 'custom'>('home');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (targetId) {
      serviceApi
        .getServiceById(targetId)
        .then((data) => {
          if (isMounted) setService(data);
        })
        .catch(() => {
          const fallback = MOCK_SERVICES.find((s) => s.id === targetId) || MOCK_SERVICES[0];
          if (isMounted) setService(fallback);
        })
        .finally(() => {
          if (isMounted) setIsLoading(false);
        });
    } else {
      setService(MOCK_SERVICES[0]);
      setIsLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [targetId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;

    setIsSubmitting(true);
    try {
      const newBooking = await bookingApi.createBooking({
        serviceId: service.id,
        bookingDate,
        address,
        notes,
      });

      showToast('Booking Configured!', 'Proceeding to secure checkout payment.', 'success');
      navigate(`/customer/checkout/${newBooking.id}`);
    } catch {
      showToast('Booking Error', 'Could not initiate booking session.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loader fullScreen message="Loading appointment schedule..." />;
  if (!service) return <div className="text-center py-20 text-slate-400 font-bold">Selected service is unavailable.</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 bg-[#FFFDFE] text-[#111827]">
      {/* Step Progress Indicator */}
      <div className="p-6 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl flex items-center justify-around text-xs font-bold">
        <div className="flex items-center gap-2 text-[#FF2E7E]">
          <span className="w-7 h-7 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center font-extrabold text-xs">1</span>
          <span>Schedule & Slot</span>
        </div>
        <span className="text-slate-300">────────</span>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center font-extrabold text-xs">2</span>
          <span>Payment & Confirmation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Booking Form */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSubmit} className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#111827]">Configure Your Doorstep Session</h2>
              <p className="text-xs text-slate-500 mt-1">Select appointment date, time slot & Kathmandu location</p>
            </div>

            {/* Address Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#111827] flex items-center gap-1.5">
                <MapPin size={16} className="text-[#FF2E7E]" />
                <span>Doorstep Delivery Address *</span>
              </label>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAddressTag('home');
                    setAddress('Durbar Marg, Ward 1, Kathmandu, Nepal');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    addressTag === 'home' ? 'bg-[#FF2E7E] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Home size={14} />
                  <span>Home</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddressTag('office');
                    setAddress('Jhamsikhel, Lalitpur, Nepal');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    addressTag === 'office' ? 'bg-[#FF2E7E] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Building size={14} />
                  <span>Office</span>
                </button>
              </div>

              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
                placeholder="Full address (House/Flat No, Landmark, Area)..."
              />
            </div>

            {/* Appointment Schedule & Slot */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#111827] flex items-center gap-1.5">
                <Calendar size={16} className="text-[#FF2E7E]" />
                <span>Select Appointment Date & Time *</span>
              </label>
              <input
                type="datetime-local"
                required
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
              />
            </div>

            {/* Special Instructions */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#111827] flex items-center gap-1.5">
                <FileText size={16} className="text-[#FF2E7E]" />
                <span>Special Instructions or Skin Preferences</span>
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
                placeholder="e.g. Sensitive skin, ring doorbell twice, specific product preference..."
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              rightIcon={<ArrowRight size={18} />}
              className="w-full h-14 rounded-2xl text-sm font-extrabold shadow-xl shadow-[#FF2E7E]/20"
            >
              Continue to Payment (रु {service.price.toLocaleString()})
            </Button>
          </form>
        </div>

        {/* Right Column: Service Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-6 sticky top-24">
            <h3 className="text-base font-bold text-[#111827] border-b border-[#ECECEC] pb-4">Treatment Summary</h3>

            <div className="flex items-center gap-4">
              <img src={service.image} alt={service.title} className="w-20 h-20 rounded-2xl object-cover border border-[#ECECEC]" />
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded-full bg-pink-50 text-[#FF2E7E] text-[10px] font-bold">
                  {service.category}
                </span>
                <h4 className="text-xs font-bold text-[#111827] line-clamp-2">{service.title}</h4>
                <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                  <Clock size={12} />
                  <span>{service.duration} mins</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 space-y-2 border border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Treatment Cost</span>
                <span className="font-bold text-slate-900">रु {service.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Doorstep Travel & Setup Fee</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between font-extrabold text-sm text-[#111827]">
                <span>Total Amount</span>
                <span className="text-[#FF2E7E]">रु {service.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-2 text-emerald-800 text-[11px] font-medium">
              <div className="flex items-center gap-2 font-bold text-xs text-emerald-900">
                <ShieldCheck size={16} />
                <span>GlowHome Hygiene Guarantee</span>
              </div>
              <p className="leading-relaxed">
                Single-use sealed mono-dose kit, sanitized tools, and certified beautician mask & gloves included.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
