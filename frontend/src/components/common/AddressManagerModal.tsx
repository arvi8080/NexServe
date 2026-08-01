import React, { useState } from 'react';
import { MapPin, Navigation, Home, Briefcase, Plus, X, Check, Save, Globe, Building, Info } from 'lucide-react';
import { CustomerAddress } from '@/types';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

// TODO: Enable Google Maps, Nearby Search, Live GPS Tracking, and Distance Calculation after reaching ~100 active users by setting ENABLE_GOOGLE_MAPS=true

interface AddressManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress: (address: CustomerAddress) => void;
  savedAddresses: CustomerAddress[];
  onAddNewAddress: (address: Partial<CustomerAddress>) => void;
}

export const AddressManagerModal: React.FC<AddressManagerModalProps> = ({
  isOpen,
  onClose,
  onSelectAddress,
  savedAddresses,
  onAddNewAddress,
}) => {
  const { showToast } = useToast();
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form State for Manual Selection (Country -> State -> City -> Area)
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Karnataka');
  const [city, setCity] = useState('Bengaluru');
  const [area, setArea] = useState('Indiranagar');
  const [label, setLabel] = useState<'Home' | 'Office' | 'Other'>('Home');
  const [fullName, setFullName] = useState('Arvind Kumar');
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');
  const [addressLine1, setAddressLine1] = useState('10th Main Road, Suite 402');
  const [landmark, setLandmark] = useState('Near Metro Station');
  const [postalCode, setPostalCode] = useState('560038');

  if (!isOpen) return null;

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressLine1.trim() || !city.trim()) {
      showToast('Missing Fields', 'Please complete doorstep address line and city.', 'error');
      return;
    }

    const newAddress: Partial<CustomerAddress> = {
      label,
      fullName,
      phoneNumber,
      addressLine1: `${addressLine1}, ${area}`,
      landmark,
      city,
      state,
      country,
      postalCode,
      latitude: 12.971598,
      longitude: 77.641151,
      isDefault: savedAddresses.length === 0,
    };

    onAddNewAddress(newAddress);
    setIsAddingNew(false);
    showToast('Address Saved!', 'New doorstep service location added to address book.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-[36px] p-6 md:p-8 max-w-xl w-full space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
          <div>
            <span className="text-[10px] font-bold text-[#FF2E7E] uppercase font-mono tracking-wider block">
              MVP MANUAL ADDRESS SELECTION
            </span>
            <h3 className="text-xl font-extrabold text-[#111827]">Doorstep Location Book</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        {/* Saved Addresses List vs Add Form */}
        {!isAddingNew ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Saved Locations</span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsAddingNew(true)}
                leftIcon={<Plus size={14} />}
                className="h-9 px-3 text-xs font-bold rounded-xl"
              >
                + Add Location
              </Button>
            </div>

            <div className="space-y-3">
              {savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => {
                    onSelectAddress(addr);
                    onClose();
                  }}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#FF2E7E] transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-[#FF2E7E] text-[10px] font-extrabold uppercase">
                        {addr.label}
                      </span>
                      <h4 className="text-sm font-bold text-[#111827] group-hover:text-[#FF2E7E]">{addr.fullName}</h4>
                    </div>
                    <span className="text-xs text-slate-500 font-semibold">{addr.phoneNumber}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    {addr.addressLine1}, {addr.city}, {addr.state} - {addr.postalCode}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveAddress} className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#FF2E7E] uppercase font-mono">NEW MANUAL ADDRESS</span>
              <button type="button" onClick={() => setIsAddingNew(false)} className="text-xs text-slate-400 hover:underline">
                Back to saved
              </button>
            </div>

            {/* Country -> State Dropdowns */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900"
                >
                  <option value="India">🇮🇳 India</option>
                  <option value="Nepal">🇳🇵 Nepal</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">State / Province</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900"
                >
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bagmati">Bagmati (Nepal)</option>
                  <option value="Gandaki">Gandaki (Nepal)</option>
                </select>
              </div>
            </div>

            {/* City -> Area Dropdowns */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900"
                >
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="New Delhi">New Delhi</option>
                  <option value="Kathmandu">Kathmandu</option>
                  <option value="Pokhara">Pokhara</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Area / Locality</label>
                <input
                  type="text"
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Indiranagar / Durbar Marg"
                  className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            {/* Address Line 1 & Landmark */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Street Address / House No.</label>
              <input
                type="text"
                required
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                placeholder="Flat 402, 10th Main Road"
                className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Landmark</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="Near Metro Station"
                  className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Postal Code</label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="560038"
                  className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full h-12 rounded-2xl text-xs font-bold shadow-xl">
              Save Doorstep Location
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
