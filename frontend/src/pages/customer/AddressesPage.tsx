import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Edit2, Trash2, CheckCircle2, Home, Building, Globe } from 'lucide-react';
import { customerApi } from '@/api/customer.api';
import { CustomerAddress } from '@/types';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { Loader } from '@/components/common/Loader';
import { useCountry } from '@/context/CountryContext';

export const AddressesPage: React.FC = () => {
  const { showToast } = useToast();
  const { selectedCountry } = useCountry();
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Add Address Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [label, setLabel] = useState<'Home' | 'Office' | 'Other'>('Home');
  const [fullName, setFullName] = useState('Aarav Sharma');
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [postalCode, setPostalCode] = useState('560038');

  useEffect(() => {
    customerApi.getAddresses()
      .then((data) => setAddresses(data))
      .finally(() => setIsLoading(false));
  }, []);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressLine1.trim()) {
      showToast('Validation Error', 'Please enter Address Line 1.', 'error');
      return;
    }

    const newAddr = await customerApi.createAddress({
      label,
      fullName,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      state,
      country: selectedCountry.name,
      postalCode,
      isDefault: addresses.length === 0,
    });

    setAddresses((prev) => [...prev, newAddr]);
    setIsModalOpen(false);
    setAddressLine1('');
    setAddressLine2('');
    showToast('Address Saved!', 'New delivery address added to your address book.', 'success');
  };

  const handleDeleteAddress = async (id: string) => {
    await customerApi.deleteAddress(id);
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('Address Removed', 'Selected address deleted.', 'info');
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
    showToast('Default Address Set', 'Selected address set as default for doorstep bookings.', 'success');
  };

  if (isLoading) return <Loader message="Hydrating customer address book..." />;

  return (
    <div className="space-y-8 pb-20 bg-[#FFFDFE] text-[#111827]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-[#FF2E7E] text-xs font-extrabold border border-pink-200 mb-2">
            <MapPin size={14} />
            <span>Doorstep Service Locations</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Saved Address Book</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage your Home, Office, and Custom addresses for seamless doorstep appointment dispatch.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus size={16} />}
          className="h-11 px-5 rounded-2xl text-xs font-bold shadow-lg"
        >
          + Add New Address
        </Button>
      </div>

      {/* Addresses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-8 rounded-[36px] bg-white border transition-all space-y-4 ${
              addr.isDefault
                ? 'border-[#FF2E7E] shadow-2xl shadow-[#FF2E7E]/10 ring-2 ring-[#FF2E7E]/20'
                : 'border-[#ECECEC] shadow-xl hover:border-pink-300'
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-pink-50 text-[#FF2E7E]">
                  {addr.label === 'Home' ? <Home size={20} /> : <Building size={20} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#111827]">{addr.label}</h3>
                    {addr.isDefault && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200">
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{addr.fullName} • {addr.phoneNumber}</span>
                </div>
              </div>

              <button
                onClick={() => handleDeleteAddress(addr.id)}
                className="p-2 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              {addr.addressLine1}, {addr.addressLine2 ? `${addr.addressLine2}, ` : ''}
              {addr.landmark ? `Landmark: ${addr.landmark}, ` : ''}
              {addr.city}, {addr.state} - {addr.postalCode}, {addr.country}
            </p>

            {!addr.isDefault && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSetDefault(addr.id)}
                className="h-9 px-4 text-xs font-bold rounded-xl"
              >
                Set as Default Address
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Service Address">
          <form onSubmit={handleAddAddress} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Address Label</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Home', 'Office', 'Other'] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLabel(l)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      label === l ? 'bg-[#FF2E7E] text-white border-transparent' : 'bg-slate-50 border-[#ECECEC] text-slate-700'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Flat / House / Building Address Line 1</label>
              <input
                type="text"
                required
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                placeholder="e.g. Flat 402, Sterling Residency"
                className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Postal Code</label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full h-12 rounded-2xl text-xs font-bold shadow-xl">
              Save Address
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
};
