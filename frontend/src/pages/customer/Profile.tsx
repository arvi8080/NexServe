import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { User, Mail, Phone, Lock, Save, Trash2, Key, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const [firstName, setFirstName] = useState(user?.firstName || 'Arvind');
  const [lastName, setLastName] = useState(user?.lastName || 'Kumar');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [isUpdating, setIsUpdating] = useState(false);

  // Change Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      showToast('Profile Updated!', 'Your account details have been saved.', 'success');
    }, 600);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('Password Error', 'New passwords do not match.', 'error');
      return;
    }
    setIsChangingPassword(true);
    setTimeout(() => {
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Password Changed!', 'Your password has been securely updated.', 'success');
    }, 600);
  };

  const handleDeleteAccount = () => {
    setDeleteModalOpen(false);
    logout();
    showToast('Account Erased', 'Your profile data has been removed.', 'info');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 bg-[#FFFDFE] text-[#111827]">
      <div>
        <h1 className="text-3xl font-extrabold text-[#111827]">Account & Profile Settings</h1>
        <p className="text-xs text-[#64748B] font-semibold mt-1">Manage personal contact details, security credentials, and preferences</p>
      </div>

      {/* Personal Details Form Card */}
      <form onSubmit={handleUpdateProfile} className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
        <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider border-b border-[#ECECEC] pb-3 flex items-center gap-2">
          <User size={18} className="text-[#FF2E7E]" />
          <span>Personal Contact Information</span>
        </h3>

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

        <Button type="submit" variant="primary" className="w-full h-12 rounded-2xl text-xs font-bold" isLoading={isUpdating} leftIcon={<Save size={16} />}>
          Save Contact Changes
        </Button>
      </form>

      {/* Change Password Card */}
      <form onSubmit={handleChangePassword} className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
        <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider border-b border-[#ECECEC] pb-3 flex items-center gap-2">
          <Key size={18} className="text-amber-600" />
          <span>Security & Change Password</span>
        </h3>

        <div>
          <label className="text-xs font-bold text-[#111827] block mb-1">Current Password</label>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full h-11 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-[#111827] block mb-1">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#111827] block mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
            />
          </div>
        </div>

        <Button type="submit" variant="secondary" className="w-full h-12 rounded-2xl text-xs font-bold" isLoading={isChangingPassword} leftIcon={<ShieldCheck size={16} />}>
          Update Password
        </Button>
      </form>

      {/* Danger Zone */}
      <div className="p-8 rounded-[32px] bg-rose-50/60 border border-rose-200 space-y-4">
        <h3 className="text-sm font-bold text-rose-800 uppercase tracking-wider">Danger Zone</h3>
        <p className="text-xs text-rose-700">Permanently delete your GlowHome profile and associated booking logs.</p>
        <Button variant="danger" onClick={() => setDeleteModalOpen(true)} leftIcon={<Trash2 size={16} />} className="h-11 px-5 rounded-2xl text-xs font-bold">
          Delete Account
        </Button>
      </div>

      <ConfirmDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account?"
        message="Are you sure you want to permanently erase your GlowHome account? This action cannot be undone."
        confirmText="Yes, Erase Profile"
        isDanger
      />
    </div>
  );
};
