import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/ui/Button';
import { User, Mail, Phone, MapPin, Save, ShieldCheck } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      showToast('Profile Updated', 'Your personal account details have been updated.', 'success');
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 bg-[#FFFDFE] text-[#111827]">
      <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-pink-100 border-2 border-[#FF2E7E] flex items-center justify-center text-[#FF2E7E] text-2xl font-bold overflow-hidden shrink-0">
          {user?.profileImage ? (
            <img src={user.profileImage} alt={firstName} className="w-full h-full object-cover" />
          ) : (
            <span>{firstName[0] || 'U'}</span>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[#111827]">{firstName} {lastName}</h2>
          <p className="text-xs text-slate-500 font-medium">{user?.email}</p>
          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
            Verified Customer
          </span>
        </div>
      </div>

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
              value={user?.email || ''}
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
