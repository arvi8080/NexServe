import React, { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/ui/Button';
import { User, Mail, Phone, MapPin, Save, ShieldCheck, Camera, Upload, Check } from 'lucide-react';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
];

export const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState(user?.firstName || 'Customer');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '+977 98012 34567');
  const [profileImage, setProfileImage] = useState<string>(
    user?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  );
  const [isSaving, setIsSaving] = useState(false);

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
        updateUser({ profileImage: result });
        showToast('Profile Photo Updated!', 'Your new avatar image has been saved.', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const selectPresetAvatar = (url: string) => {
    setProfileImage(url);
    updateUser({ profileImage: url });
    showToast('Avatar Selected', 'Updated profile image with chosen avatar.', 'success');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    updateUser({ firstName, lastName, phone, profileImage });
    setTimeout(() => {
      showToast('Profile Updated', 'Your account details have been saved.', 'success');
      setIsSaving(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 bg-[#FFFDFE] text-[#111827]">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />

      {/* Header Profile Banner */}
      <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          {/* Avatar Circle with Camera Overlay */}
          <div className="relative group shrink-0">
            <div className="w-24 h-24 rounded-full bg-pink-100 border-4 border-[#FF2E7E] flex items-center justify-center text-[#FF2E7E] text-2xl font-bold overflow-hidden shadow-lg">
              {profileImage ? (
                <img src={profileImage} alt={firstName} className="w-full h-full object-cover" />
              ) : (
                <span>{firstName[0] || 'U'}</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-2.5 rounded-full bg-[#FF2E7E] text-white shadow-lg hover:scale-110 transition-transform cursor-pointer border-2 border-white"
              title="Upload New Profile Photo"
            >
              <Camera size={16} />
            </button>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-[#111827]">{firstName} {lastName}</h2>
            <p className="text-xs text-slate-500 font-medium">{user?.email || 'customer@glowhome.com'}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
              ✓ Verified Customer • Nepal
            </span>
          </div>
        </div>

        {/* Change Photo Trigger */}
        <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            leftIcon={<Upload size={16} />}
            className="h-11 px-5 rounded-2xl text-xs font-bold border-pink-200 text-[#FF2E7E] hover:bg-pink-50"
          >
            Change Profile Photo
          </Button>
        </div>
      </div>

      {/* Preset Avatars Selector */}
      <div className="p-6 rounded-[28px] bg-white border border-[#ECECEC] shadow-lg space-y-3">
        <label className="text-xs font-bold text-[#111827] block">Or Select a Quick Avatar:</label>
        <div className="flex items-center gap-4">
          {PRESET_AVATARS.map((url, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => selectPresetAvatar(url)}
              className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                profileImage === url ? 'border-[#FF2E7E] scale-110 shadow-md ring-2 ring-pink-200' : 'border-slate-200 hover:border-pink-300'
              }`}
            >
              <img src={url} alt={`Avatar ${idx + 1}`} className="w-full h-full object-cover" />
              {profileImage === url && (
                <div className="absolute inset-0 bg-[#FF2E7E]/40 flex items-center justify-center text-white">
                  <Check size={16} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Personal Info Form */}
      <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
        <h3 className="text-lg font-bold text-[#111827]">Personal Information</h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#111827] block mb-1">First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full h-11 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#111827] block mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full h-11 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#111827] block mb-1">Email Address</label>
            <input
              type="email"
              disabled
              value={user?.email || 'customer@glowhome.com'}
              className="w-full h-11 px-4 rounded-2xl bg-slate-100 border border-[#ECECEC] text-xs text-slate-400 cursor-not-allowed font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#111827] block mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-11 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={isSaving}
            leftIcon={<Save size={16} />}
            className="h-11 px-6 rounded-2xl text-xs font-bold shadow-md shadow-[#FF2E7E]/20"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};
