import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { serviceApi } from '@/api/service';
import { addressApi } from '@/api/address.api';
import { bookingApi } from '@/api/booking';
import { Service, CustomerAddress } from '@/types';
import { calculateHaversineDistance, estimateTravelTimeMinutes, calculateTravelFee } from '@/utils/distanceCalculator';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/context/ToastContext';
import { useCountry } from '@/context/CountryContext';
import { AddressManagerModal } from '@/components/common/AddressManagerModal';
import { SkeletonLoader } from '@/components/common/SkeletonLoader';
import { MapPin, Calendar, Clock, CreditCard, ShieldCheck, Tag, Sparkles, Navigation, ArrowRight, CheckCircle2, Globe, Info, Wallet } from 'lucide-react';

export const BookingCheckout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { selectedCountry, formatPrice } = useCountry();

  const [service, setService] = useState<Service | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<CustomerAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<CustomerAddress | null>(null);
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  // Direct Vendor Payment Methods for MVP Launch
  const indiaDirectMethods = [
    { id: 'Cash', label: 'Cash on Arrival', desc: 'Pay Cash after service completion' },
    { id: 'PhonePe', label: 'PhonePe (Vendor UPI)', desc: 'Scan vendor PhonePe QR' },
    { id: 'GPay', label: 'Google Pay (Vendor UPI)', desc: 'Pay via vendor GPay UPI' },
    { id: 'Paytm', label: 'Paytm (Vendor UPI)', desc: 'Pay via vendor Paytm UPI' },
  ];

  const nepalDirectMethods = [
    { id: 'Cash', label: 'Cash on Arrival', desc: 'Pay Cash after service completion' },
    { id: 'eSewa', label: 'eSewa (Vendor Wallet)', desc: 'Transfer to vendor eSewa ID' },
    { id: 'Khalti', label: 'Khalti (Vendor Wallet)', desc: 'Transfer to vendor Khalti ID' },
    { id: 'Fonepay', label: 'Fonepay (Vendor QR)', desc: 'Scan vendor Fonepay QR' },
  ];

  const currentDirectMethods = selectedCountry.code === 'NP' ? nepalDirectMethods : indiaDirectMethods;
  const [selectedDirectMethod, setSelectedDirectMethod] = useState<string>(currentDirectMethods[0].id);

  const [bookingDate, setBookingDate] = useState('2026-07-28');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Vendor Base Coordinates
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

  useEffect(() => {
    if (currentDirectMethods.length > 0) {
      setSelectedDirectMethod(currentDirectMethods[0].id);
    }
  }, [selectedCountry]);

  // Compute Distance & Fees
  const customerLat = selectedAddress?.latitude || 12.971598;
  const customerLng = selectedAddress?.longitude || 77.641151;

  const distanceKm = calculateHaversineDistance(vendorLat, vendorLng, customerLat, customerLng);
  const travelMins = estimateTravelTimeMinutes(distanceKm);
  const travelFee = calculateTravelFee(distanceKm);

  const basePrice = service?.price || 1499;
  const discount = Math.round(basePrice * 0.25); // 25% promo discount
  const subtotalAfterDiscount = basePrice - discount;
  const taxRate = selectedCountry?.taxRate ? selectedCountry.taxRate / 100 : 0.18;
  const calculatedTax = Math.round(subtotalAfterDiscount * taxRate);
  const finalTotal = subtotalAfterDiscount + calculatedTax + travelFee;

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
        notes: `Direct Vendor Payment: ${selectedDirectMethod} • Slot: ${selectedSlot} • Region: ${selectedCountry.name}`,
      });

      showToast(
        'Booking Confirmed!',
        `Your doorstep session is booked. Pay ${selectedDirectMethod} directly to the service provider.`,
        'success'
      );
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
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{selectedCountry.flag}</span>
          <span className="text-xs font-bold text-[#FF2E7E] uppercase font-mono tracking-wider">
            {selectedCountry.name} MVP Direct Vendor Payments
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#111827]">Doorstep Booking & Checkout</h1>
        <p className="text-xs text-[#64748B] font-semibold mt-1">Review treatment details, select saved address, and confirm doorstep appointment</p>
      </div>

      {/* MVP DIRECT VENDOR PAYMENT NOTICE DISCLAIMER BANNER */}
      <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs font-medium space-y-1.5 flex items-start gap-3 shadow-sm">
        <Info size={20} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-extrabold text-amber-900 text-sm">Direct Vendor Payment Notice</h4>
          <p className="text-amber-800 leading-relaxed font-medium">
            Payments are currently made directly to the service provider using Cash or their preferred UPI/Wallet account upon session completion. Platform-based online payments will be available in a future update.
          </p>
        </div>
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
                Manage Address Book
              </Button>
            </div>

            {selectedAddress ? (
              <div className="p-5 rounded-2xl bg-pink-50/40 border border-pink-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FF2E7E] text-white text-[10px] font-extrabold uppercase">
                      {selectedAddress.label}
                    </span>
                    <h4 className="text-sm font-bold text-[#111827]">{selectedAddress.fullName}</h4>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">{selectedAddress.phoneNumber}</span>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {selectedAddress.addressLine1}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.postalCode}
                </p>

                {/* Distance telemetry */}
                <div className="pt-2 border-t border-pink-200/60 flex items-center gap-4 text-xs font-bold text-[#FF2E7E]">
                  <span className="flex items-center gap-1"><Navigation size={14} /> {distanceKm} km from Salon</span>
                  <span>•</span>
                  <span>Arrival: ~{travelMins} Mins</span>
                </div>
              </div>
            ) : (
              <Button onClick={() => setAddressModalOpen(true)} variant="outline" className="w-full h-12 rounded-2xl text-xs font-bold">
                + Select or Add Delivery Address
              </Button>
            )}
          </div>

          {/* 2. DIRECT VENDOR PAYMENT SELECTOR */}
          <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
            <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider flex items-center gap-2 border-b border-[#ECECEC] pb-3">
              <Wallet size={18} className="text-[#FF2E7E]" />
              <span>Select Direct Payment Method ({selectedCountry.name})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentDirectMethods.map((m) => {
                const isSelected = selectedDirectMethod === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedDirectMethod(m.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1 ${
                      isSelected
                        ? 'bg-white border-[#FF2E7E] shadow-xl ring-2 ring-[#FF2E7E]/20'
                        : 'bg-slate-50 border-[#ECECEC] text-slate-700 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#111827]">{m.label}</span>
                      {isSelected && <CheckCircle2 size={16} className="text-[#FF2E7E]" />}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium block">{m.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. TREATMENT SUMMARY */}
          <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
            <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider border-b border-[#ECECEC] pb-3">
              Treatment Details
            </h3>
            <div className="flex items-center gap-4">
              <img src={service.image} alt={service.title} className="w-16 h-16 rounded-2xl object-cover" />
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
              Payment Summary ({selectedCountry.currency})
            </h3>

            <div className="space-y-3 text-xs font-medium text-[#111827]">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Treatment Base Price</span>
                <span className="font-bold">{formatPrice(basePrice)}</span>
              </div>

              <div className="flex items-center justify-between text-emerald-600 font-bold">
                <span>Promo Discount (25% OFF)</span>
                <span>-{formatPrice(discount)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span>{selectedCountry.taxName} Tax ({selectedCountry.taxRate}%)</span>
                <span className="font-bold">{formatPrice(calculatedTax)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span>Doorstep Travel Fee ({distanceKm} km)</span>
                <span className="font-bold text-[#FF2E7E]">{travelFee === 0 ? 'FREE' : formatPrice(travelFee)}</span>
              </div>

              <div className="pt-3 border-t border-[#ECECEC] flex items-center justify-between text-lg font-extrabold text-[#111827]">
                <span>Total Amount</span>
                <span className="text-2xl text-[#FF2E7E]">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={handleConfirmBooking}
              isLoading={isSubmitting}
              leftIcon={<CheckCircle2 size={18} />}
              className="w-full h-14 rounded-2xl text-xs font-bold shadow-xl"
            >
              Confirm Doorstep Booking ({formatPrice(finalTotal)})
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
