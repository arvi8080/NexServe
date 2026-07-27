import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { serviceApi } from '@/api/service';
import { addressApi } from '@/api/address.api';
import { bookingApi } from '@/api/booking';
import { Service, CustomerAddress } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import { calculateHaversineDistance, estimateTravelTimeMinutes, calculateTravelFee } from '@/utils/distanceCalculator';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/context/ToastContext';
import { AddressManagerModal } from '@/components/common/AddressManagerModal';
import { SkeletonLoader } from '@/components/common/SkeletonLoader';
import { MapPin, Calendar, Clock, CreditCard, ShieldCheck, Tag, Sparkles, Navigation, ArrowRight, CheckCircle2 } from 'lucide-react';

export const BookingCheckout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [service, setService] = useState<Service | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<CustomerAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<CustomerAddress | null>(null);
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  const [bookingDate, setBookingDate] = useState('2026-07-28');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [promoCode, setPromoCode] = useState('LUXURY25');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Vendor Base Coordinates (Indiranagar Studio)
  const vendorLat = 12.93524;
  const vendorLng = 77.62451;

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      serviceApi.getServiceById(id || 'service_1'),
      addressApi.getAddresses(),
    ])
      .then(([sData, aData]) => {
        setService(sData);
        setSavedAddresses(aData);
        if (aData.length > 0) {
          const defaultAddr = aData.find((a) => a.isDefault) || aData[0];
          setSelectedAddress(defaultAddr);
        }
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  // Compute Distance & Fees
  const customerLat = selectedAddress?.latitude || 12.971598;
  const customerLng = selectedAddress?.longitude || 77.641151;

  const distanceKm = calculateHaversineDistance(vendorLat, vendorLng, customerLat, customerLng);
  const travelMins = estimateTravelTimeMinutes(distanceKm);
  const travelFee = calculateTravelFee(distanceKm);

  const basePrice = service?.price || 1499;
  const discount = Math.round((basePrice * 0.25)); // 25% promo discount
  const subtotalAfterDiscount = basePrice - discount;
  const gstTax = Math.round(subtotalAfterDiscount * 0.18); // 18% GST tax
  const finalTotal = subtotalAfterDiscount + gstTax + travelFee;

  const handleAddNewAddress = async (newAddr: Partial<CustomerAddress>) => {
    const created = await addressApi.createAddress(newAddr);
    setSavedAddresses((prev) => [...prev, created]);
    setSelectedAddress(created);
  };

  const handleConfirmBooking = async () => {
    if (!selectedAddress) {
      showToast('Address Required', 'Please select a doorstep service address.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const createdBooking = await bookingApi.createBooking({
        serviceId: service?.id || 'service_1',
        bookingDate,
        address: `${selectedAddress.addressLine1}, ${selectedAddress.city}`,
        notes: `Selected Slot: ${selectedSlot} • Travel Fee: ₹${travelFee}`,
      });

      showToast('Booking Created!', 'Redirecting to Razorpay payment gateway...', 'success');
      setTimeout(() => {
        navigate(`/customer/bookings/${createdBooking.id}`);
      }, 800);
    } catch {
      showToast('Booking Error', 'Could not process booking. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !service) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 pb-20 pt-6 px-4">
        <SkeletonLoader type="banner" />
        <SkeletonLoader type="card" count={2} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-28 px-4 bg-[#FFFDFE] text-[#111827]">
      <div>
        <h1 className="text-3xl font-extrabold text-[#111827]">Doorstep Booking & Location Checkout</h1>
        <p className="text-xs text-[#64748B] font-semibold mt-1">Review treatment details, select saved address, and confirm doorstep appointment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Address Selector & Schedule */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. LOCATION & SAVED ADDRESS CARD */}
          <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
              <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider flex items-center gap-2">
                <MapPin size={18} className="text-[#FF2E7E]" />
                <span>Doorstep Service Address</span>
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAddressModalOpen(true)}
                className="h-8 px-3 text-[11px] font-bold rounded-xl"
              >
                Change Address
              </Button>
            </div>

            {selectedAddress ? (
              <div className="p-5 rounded-2xl bg-pink-50/50 border border-pink-200/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#FF2E7E] text-white text-[10px] font-extrabold">
                    {selectedAddress.label} Address
                  </span>
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 size={14} /> Serviceable Area
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-[#111827]">
                    {selectedAddress.addressLine1}, {selectedAddress.addressLine2 ? `${selectedAddress.addressLine2}, ` : ''}{selectedAddress.city} - {selectedAddress.postalCode}
                  </p>
                  <span className="text-xs text-slate-500 font-medium">Recipient: {selectedAddress.fullName} • {selectedAddress.phoneNumber}</span>
                </div>

                {/* Location Telemetry Bar */}
                <div className="pt-3 border-t border-pink-200/60 flex items-center justify-between text-xs font-bold text-[#FF2E7E]">
                  <div className="flex items-center gap-1.5">
                    <Navigation size={14} /> <span>Geodesic Distance: {distanceKm} km</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} /> <span>ETA: ~{travelMins} Mins</span>
                  </div>
                </div>
              </div>
            ) : (
              <Button variant="primary" onClick={() => setAddressModalOpen(true)} className="w-full h-12 rounded-2xl text-xs font-bold">
                + Select Doorstep Address
              </Button>
            )}
          </div>

          {/* 2. TREATMENT SUMMARY CARD */}
          <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-5">
            <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider border-b border-[#ECECEC] pb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-purple-600" />
              <span>Treatment Package</span>
            </h3>

            <div className="flex items-center gap-4">
              <img src={service.image || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80'} alt={service.title} className="w-20 h-20 rounded-2xl object-cover border border-[#ECECEC]" />
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#111827]">{service.title}</h4>
                <p className="text-xs text-[#64748B]">{service.description}</p>
                <div className="flex items-center gap-3 text-xs font-bold text-[#FF2E7E] pt-1">
                  <span>{service.duration} Mins Session</span>
                  <span>•</span>
                  <span>100% Sealed Mono-Dose Kit</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Price Breakdown Ledger */}
        <div className="space-y-6">
          <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-5 sticky top-24">
            <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider border-b border-[#ECECEC] pb-3">
              Payment Summary
            </h3>

            <div className="space-y-3 text-xs font-medium text-[#111827]">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Treatment List Price</span>
                <span className="font-bold">₹{basePrice}</span>
              </div>

              <div className="flex items-center justify-between text-emerald-600 font-bold">
                <span>Promo Discount (25% OFF)</span>
                <span>-₹{discount}</span>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span>GST Tax (18% SAC 999722)</span>
                <span className="font-bold">₹{gstTax}</span>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span>Doorstep Travel Fee ({distanceKm} km)</span>
                <span className="font-bold text-[#FF2E7E]">{travelFee === 0 ? 'FREE' : `₹${travelFee}`}</span>
              </div>

              <div className="pt-3 border-t border-[#ECECEC] flex items-center justify-between text-lg font-extrabold text-[#111827]">
                <span>To Pay</span>
                <span className="text-2xl text-[#FF2E7E]">{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={handleConfirmBooking}
              isLoading={isSubmitting}
              leftIcon={<CreditCard size={18} />}
              className="w-full h-14 rounded-2xl text-xs font-bold shadow-xl"
            >
              Proceed to Razorpay Payment
            </Button>
          </div>
        </div>
      </div>

      <AddressManagerModal
        isOpen={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        onSelectAddress={(addr) => setSelectedAddress(addr)}
        savedAddresses={savedAddresses}
        onAddNewAddress={handleAddNewAddress}
      />
    </div>
  );
};
