import React, { useState, useRef } from 'react';
import { Store, MapPin, Phone, Mail, Award, ShieldCheck, Camera, Upload, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export const VendorProfile: React.FC = () => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [businessName, setBusinessName] = useState('Glow & Grace Kathmandu Luxury Salon');
  const [phone, setPhone] = useState('+977 98123 45678');
  const [city, setCity] = useState('Kathmandu');
  const [address, setAddress] = useState('Durbar Marg, Ward 1, Kathmandu, Nepal');
  const [description, setDescription] = useState('Certified luxury doorstep beauty salon in Kathmandu specializing in diamond hydra-facials, organic hair spa, and airbrush party makeovers.');
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=300&q=80');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('File Too Large', 'Please select an image smaller than 5MB.', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImage(result);
        showToast('Studio Logo/Photo Updated!', 'New vendor profile image loaded.', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile Saved!', 'Your studio details and verified partner profile have been updated.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-[#FFFDFE] text-[#111827] pb-16">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />

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
        <div className="relative group shrink-0">
          <img
            src={profileImage}
            alt="Studio Profile"
            className="w-24 h-24 rounded-3xl object-cover border-2 border-pink-200 shadow-md"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-2 -right-2 p-2.5 rounded-2xl bg-[#FF2E7E] text-white shadow-lg hover:scale-110 transition-transform cursor-pointer border-2 border-white"
            title="Change Studio Profile Photo"
          >
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

        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          leftIcon={<Upload size={16} />}
          className="h-10 px-4 rounded-2xl text-xs font-bold border-pink-200 text-[#FF2E7E] hover:bg-pink-50"
        >
          Upload Studio Logo
        </Button>
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
