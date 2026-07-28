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
import { MapPin, Calendar, Clock, CreditCard, ShieldCheck, Tag, Sparkles, Navigation, ArrowRight, CheckCircle2, Globe } from 'lucide-react';

export const BookingCheckout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { selectedCountry, paymentGateways, formatPrice } = useCountry();

  const [service, setService] = useState<Service | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<CustomerAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<CustomerAddress | null>(null);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<string>('RAZORPAY');

  const [bookingDate, setBookingDate] = useState('2026-07-28');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [promoCode, setPromoCode] = useState('LUXURY25');
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
    if (paymentGateways && paymentGateways.length > 0) {
      setSelectedGateway(paymentGateways[0].gatewayName);
    }
  }, [paymentGateways]);

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
        notes: `Selected Slot: ${selectedSlot} • Region: ${selectedCountry.name} (${selectedCountry.currency}) • Gateway: ${selectedGateway}`,
      });

      showToast('Booking Created!', `Redirecting to ${selectedGateway} payment gateway...`, 'success');
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
            {selectedCountry.name} Region Marketplace
          </span>
        </div>
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

          {/* 2. REGION PAYMENT GATEWAYS */}
          <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
            <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider flex items-center gap-2 border-b border-[#ECECEC] pb-3">
              <CreditCard size={18} className="text-[#FF2E7E]" />
              <span>Supported Payment Gateways ({selectedCountry.name})</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {paymentGateways.map((gw) => {
                const isSelected = selectedGateway === gw.gatewayName;
                return (
                  <button
                    key={gw.id}
                    type="button"
                    onClick={() => setSelectedGateway(gw.gatewayName)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer space-y-1 ${
                      isSelected
                        ? 'bg-[#FF2E7E] text-white border-transparent shadow-md'
                        : 'bg-slate-50 border-[#ECECEC] text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xs font-extrabold block">{gw.gatewayName}</span>
                    <span className="text-[9px] opacity-80 block font-mono">
                      {gw.gatewayName === 'CASH' ? 'Pay After Service' : 'Instant Online'}
                    </span>
                  </button>
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
                <span>To Pay</span>
                <span className="text-2xl text-[#FF2E7E]">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={handleConfirmBooking}
              isLoading={isSubmitting}
              leftIcon={<CreditCard size={18} />}
              className="w-full h-14 rounded-2xl text-xs font-bold shadow-xl"
            >
              Pay with {selectedGateway} ({formatPrice(finalTotal)})
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
