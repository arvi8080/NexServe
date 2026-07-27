import React, { useState } from 'react';
import { Store, MapPin, Phone, Mail, Award, ShieldCheck, Camera, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export const VendorProfile: React.FC = () => {
  const { showToast } = useToast();

  const [businessName, setBusinessName] = useState('Glow & Grace Luxury Studio');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [city, setCity] = useState('Bengaluru');
  const [address, setAddress] = useState('100 Feet Road, Indiranagar, Bengaluru');
  const [description, setDescription] = useState('Certified luxury doorstep beauty salon specializing in diamond hydra-facials, organic hair spa, and airbrush party makeovers.');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile Saved!', 'Your studio details and verified partner profile have been updated.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-[#FFFDFE] text-[#111827] pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Vendor Studio Profile</h1>
          <p className="text-xs text-[#64748B] font-medium mt-1">Manage public business details, studio photos, trade credentials, and contact info</p>
        </div>
        <Button variant="primary" onClick={handleSave} leftIcon={<Save size={16} />} className="h-11 px-5 rounded-2xl text-xs font-bold">
          Save Profile
        </Button>
      </div>

      {/* Main Studio Card Header */}
      <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=300&q=80"
            alt="Studio Profile"
            className="w-24 h-24 rounded-3xl object-cover border-2 border-pink-200 shadow-md"
          />
          <button className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-[#FF2E7E] text-white shadow-md cursor-pointer">
            <Camera size={14} />
          </button>
        </div>

        <div className="space-y-1 text-center md:text-left flex-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <h2 className="text-2xl font-bold text-[#111827]">{businessName}</h2>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              ✓ Verified Partner
            </span>
          </div>
          <p className="text-xs text-[#64748B] font-medium">{address}</p>
          <span className="text-[11px] font-bold text-[#FF2E7E] block pt-1">8+ Years Experience • 450+ Completed Doorstep Sessions</span>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-5">
        <h3 className="text-base font-bold text-[#111827] border-b border-[#ECECEC] pb-3">Business Profile Details</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Business / Studio Name</label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-white border border-[#ECECEC] text-xs text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#111827] block mb-1">Contact Phone</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-white border border-[#ECECEC] text-xs text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Operating City</label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-white border border-[#ECECEC] text-xs text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Studio Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-white border border-[#ECECEC] text-xs text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Studio Biography / Description</label>
          <textarea
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white border border-[#ECECEC] text-xs text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
          />
        </div>
      </form>
    </div>
  );
};
