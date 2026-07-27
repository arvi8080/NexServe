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

export const BookService: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [bookingDate, setBookingDate] = useState('2026-07-28T14:00');
  const [address, setAddress] = useState('77 10th Main, 4th Block, Koramangala, Bengaluru');
  const [addressTag, setAddressTag] = useState<'home' | 'office' | 'custom'>('home');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (serviceId) {
      serviceApi
        .getServiceById(serviceId)
        .then((data) => setService(data))
        .finally(() => setIsLoading(false));
    }
  }, [serviceId]);

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
        <div className="flex items-center gap-2 text-[#FF2E7E]">
          <span className="w-7 h-7 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center font-extrabold text-xs">2</span>
          <span>Doorstep Address</span>
        </div>
        <span className="text-slate-300">────────</span>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center font-extrabold text-xs">3</span>
          <span>Payment & Confirm</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form & Slot Config (7 Cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          {/* Schedule & Date Slot */}
          <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-[#111827] flex items-center gap-2">
              <Calendar className="text-[#FF2E7E]" size={20} />
              <span>Select Date & Time Slot</span>
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Date & Time</label>
              <input
                type="datetime-local"
                required
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full h-12 px-4 rounded-2xl bg-white border border-[#ECECEC] text-xs text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
              />
            </div>
          </div>

          {/* Doorstep Address Selection */}
          <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-[#111827] flex items-center gap-2">
              <MapPin className="text-[#FF2E7E]" size={20} />
              <span>Doorstep Service Address</span>
            </h3>

            {/* Address Tag Selector */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setAddressTag('home');
                  setAddress('77 10th Main, 4th Block, Koramangala, Bengaluru');
                }}
                className={`flex-1 py-2.5 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                  addressTag === 'home'
                    ? 'bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white border-transparent shadow-md'
                    : 'bg-white border-[#ECECEC] text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Home size={14} /> Home
              </button>

              <button
                type="button"
                onClick={() => {
                  setAddressTag('office');
                  setAddress('Suite 402, Prestige Tech Park, Marathahalli, Bengaluru');
                }}
                className={`flex-1 py-2.5 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                  addressTag === 'office'
                    ? 'bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white border-transparent shadow-md'
                    : 'bg-white border-[#ECECEC] text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Building size={14} /> Office
              </button>
            </div>

            <textarea
              rows={3}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white border border-[#ECECEC] text-xs text-[#111827] focus:outline-none focus:border-[#FF2E7E] resize-none"
              placeholder="Enter house no, building name, street and pincode..."
            />
          </div>

          {/* Special Instructions */}
          <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-[#111827] flex items-center gap-2">
              <FileText className="text-[#FF2E7E]" size={20} />
              <span>Special Instructions (Optional)</span>
            </h3>

            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-white border border-[#ECECEC] text-xs text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
              placeholder="e.g. Ring doorbell, sensitive skin preferences..."
            />
          </div>

          {/* Submit Action Button */}
          <Button
            type="submit"
            variant="primary"
            className="w-full h-[58px] rounded-full text-base font-bold shadow-lg shadow-[#FF2E7E]/25"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight size={20} />}
          >
            Confirm & Proceed to Checkout
          </Button>
        </form>

        {/* Right Column: Sticky Service Summary Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-28 p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-2xl space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF2E7E] block">
              Appointment Summary
            </span>

            <div className="flex items-center gap-4">
              <img src={service.image} alt={service.title} className="w-16 h-16 rounded-2xl object-cover border border-[#ECECEC]" />
              <div>
                <h3 className="text-base font-bold text-[#111827]">{service.title}</h3>
                <p className="text-xs text-[#64748B] mt-0.5">{service.duration} mins • {service.category.replace('_', ' ')}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 space-y-2 text-xs text-slate-700">
              <div className="flex justify-between font-medium">
                <span>Treatment Price</span>
                <span>{formatCurrency(service.price)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Single-Use Mono-Dose Kit</span>
                <span className="text-emerald-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Doorstep Delivery Fee</span>
                <span className="text-emerald-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between font-bold border-t border-pink-200/60 pt-2 text-[#111827]">
                <span>Total Payable</span>
                <span>{formatCurrency(service.price)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#64748B] font-medium">
              <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
              <span>100% Satisfaction Guarantee. Free cancellation up to 2 hours before.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
