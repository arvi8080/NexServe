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

  // 100% Nepal Default Form State (Country -> State -> City -> Area)
  const [country, setCountry] = useState('Nepal');
  const [state, setState] = useState('Bagmati Province');
  const [city, setCity] = useState('Kathmandu');
  const [area, setArea] = useState('Durbar Marg');
  const [label, setLabel] = useState<'Home' | 'Office' | 'Other'>('Home');
  const [fullName, setFullName] = useState('Aarav Sharma');
  const [phoneNumber, setPhoneNumber] = useState('+977 98012 34567');
  const [addressLine1, setAddressLine1] = useState('Building 42, Durbar Marg');
  const [landmark, setLandmark] = useState('Near Annapurna Hotel');
  const [postalCode, setPostalCode] = useState('44600');

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
      latitude: 27.7172,
      longitude: 85.324,
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
                  <option value="Nepal">🇳🇵 Nepal</option>
                  <option value="India">🇮🇳 India</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">State / Province</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900"
                >
                  <option value="Bagmati Province">Bagmati Province</option>
                  <option value="Gandaki Province">Gandaki Province</option>
                  <option value="Koshi Province">Koshi Province</option>
                  <option value="Lumbini Province">Lumbini Province</option>
                  <option value="Karnataka">Karnataka</option>
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
                  <option value="Kathmandu">Kathmandu</option>
                  <option value="Pokhara">Pokhara</option>
                  <option value="Lalitpur (Patan)">Lalitpur (Patan)</option>
                  <option value="Bhaktapur">Bhaktapur</option>
                  <option value="Biratnagar">Biratnagar</option>
                  <option value="Butwal">Butwal</option>
                  <option value="Bengaluru">Bengaluru</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Area / Locality</label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900"
                >
                  <option value="Durbar Marg">Durbar Marg</option>
                  <option value="Thamel">Thamel</option>
                  <option value="New Baneshwor">New Baneshwor</option>
                  <option value="Jhamsikhel">Jhamsikhel</option>
                  <option value="Lazimpat">Lazimpat</option>
                  <option value="Maharajgunj">Maharajgunj</option>
                  <option value="Bhatbhateni">Bhatbhateni</option>
                  <option value="Koteshwor">Koteshwor</option>
                  <option value="Lakeside Pokhara">Lakeside Pokhara</option>
                </select>
              </div>
            </div>

            {/* Full Name & Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Phone Number</label>
                <input
                  type="text"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            {/* House / Building Address & Landmark */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Flat / House / Street Address</label>
              <input
                type="text"
                required
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                placeholder="e.g. House 14, Durbar Marg"
                className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full h-12 rounded-2xl text-xs font-bold shadow-xl">
              Save Doorstep Address
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
