import React, { useState } from 'react';
import { MapPin, Navigation, Home, Briefcase, Plus, X, Check, Save } from 'lucide-react';
import { CustomerAddress } from '@/types';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

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
  const [isDetectingGps, setIsDetectingGps] = useState(false);

  // Form State
  const [label, setLabel] = useState<'Home' | 'Office' | 'Other'>('Home');
  const [fullName, setFullName] = useState('Arvind Kumar');
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [postalCode, setPostalCode] = useState('560038');

  if (!isOpen) return null;

  const handleDetectCurrentLocation = () => {
    setIsDetectingGps(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsDetectingGps(false);
          setAddressLine1(`GPS Pin (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`);
          setAddressLine2('10th Main Road, Indiranagar');
          setCity('Bengaluru');
          setPostalCode('560038');
          showToast('GPS Detected!', 'Current location pinned via browser Geolocation API.', 'success');
        },
        () => {
          setIsDetectingGps(false);
          setAddressLine1('Indiranagar 10th Main Road');
          setCity('Bengaluru');
          setPostalCode('560038');
          showToast('Location Set', 'Using default Bengaluru Indiranagar coordinates.', 'info');
        }
      );
    } else {
      setIsDetectingGps(false);
    }
  };

  const handleSubmitNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress: Partial<CustomerAddress> = {
      label,
      fullName,
      phoneNumber,
      addressLine1,
      addressLine2,
      landmark,
      city,
      state: 'Karnataka',
      country: 'India',
      postalCode,
      latitude: 12.971598,
      longitude: 77.641151,
      isDefault: savedAddresses.length === 0,
    };
    onAddNewAddress(newAddress);
    setIsAddingNew(false);
    showToast('Address Saved!', `New ${label} address added to address book.`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="max-w-xl w-full p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
          <div className="flex items-center gap-2.5">
            <MapPin className="text-[#FF2E7E]" size={22} />
            <h3 className="text-xl font-extrabold text-[#111827]">Doorstep Service Address</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        {!isAddingNew ? (
          <div className="space-y-6">
            {/* GPS Detection Bar */}
            <button
              type="button"
              onClick={handleDetectCurrentLocation}
              disabled={isDetectingGps}
              className="w-full p-4 rounded-2xl bg-pink-50/80 hover:bg-pink-100/80 border border-pink-200 text-[#FF2E7E] text-xs font-extrabold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Navigation size={16} className={isDetectingGps ? 'animate-spin' : ''} />
              <span>{isDetectingGps ? 'Detecting GPS Satellite Coordinates...' : 'Use Current Live GPS Location'}</span>
            </button>

            {/* Saved Address List */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Saved Address Book:</span>
              {savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => {
                    onSelectAddress(addr);
                    onClose();
                  }}
                  className="p-5 rounded-2xl bg-slate-50 border border-[#ECECEC] hover:border-[#FF2E7E] hover:bg-white transition-all cursor-pointer flex items-start justify-between gap-4 group"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-white border border-[#ECECEC] text-[#FF2E7E] shrink-0">
                      {addr.label === 'Home' ? <Home size={18} /> : <Briefcase size={18} />}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#111827]">{addr.label} Address</span>
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200">
                            DEFAULT
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-700 font-medium">
                        {addr.addressLine1}, {addr.addressLine2 ? `${addr.addressLine2}, ` : ''}{addr.city} - {addr.postalCode}
                      </p>
                      <span className="text-[11px] text-slate-400 font-semibold block">{addr.fullName} • {addr.phoneNumber}</span>
                    </div>
                  </div>

                  <Button variant="secondary" size="sm" className="h-9 px-4 text-xs font-bold shrink-0 opacity-80 group-hover:opacity-100">
                    Select
                  </Button>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => setIsAddingNew(true)}
              leftIcon={<Plus size={16} />}
              className="w-full h-12 rounded-2xl text-xs font-bold"
            >
              Add New Address
            </Button>
          </div>
        ) : (
          /* Add New Address Form */
          <form onSubmit={handleSubmitNewAddress} className="space-y-4">
            {/* Label Chips */}
            <div>
              <label className="text-xs font-bold text-[#111827] block mb-1">Save Address As</label>
              <div className="flex items-center gap-2">
                {(['Home', 'Office', 'Other'] as const).map((lbl) => (
                  <button
                    key={lbl}
                    type="button"
                    onClick={() => setLabel(lbl)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      label === lbl
                        ? 'bg-[#FF2E7E] text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#111827] block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-medium"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#111827] block mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#111827] block mb-1">House / Flat / Building No. & Street</label>
              <input
                type="text"
                required
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                placeholder="Flat 402, Royal Palms, 10th Main Road"
                className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#111827] block mb-1">Landmark (Optional)</label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="Behind Corner House Ice Cream"
                className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#111827] block mb-1">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-medium"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#111827] block mb-1">Pincode / Postal Code</label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-[#ECECEC] text-xs font-medium"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <Button type="button" variant="outline" onClick={() => setIsAddingNew(false)} className="w-1/2 h-11 rounded-2xl text-xs font-bold">
                Cancel
              </Button>
              <Button type="submit" variant="primary" leftIcon={<Save size={16} />} className="w-1/2 h-11 rounded-2xl text-xs font-bold">
                Save & Use Address
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
