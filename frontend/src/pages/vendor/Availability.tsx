import React, { useState } from 'react';
import { Clock, Calendar, MapPin, CheckCircle2, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { isVendorBusinessLocked } from '@/middleware/rbacMiddleware';

export const Availability: React.FC = () => {
  const { showToast } = useToast();
  const { user } = useAuth();
  const isPendingVendor = isVendorBusinessLocked(user);
  const [radius, setRadius] = useState('10');
  const [isOnline, setIsOnline] = useState(true);

  const [weeklySchedule, setWeeklySchedule] = useState([
    { day: 'Monday', active: true, start: '09:00 AM', end: '08:00 PM' },
    { day: 'Tuesday', active: true, start: '09:00 AM', end: '08:00 PM' },
    { day: 'Wednesday', active: true, start: '09:00 AM', end: '08:00 PM' },
    { day: 'Thursday', active: true, start: '09:00 AM', end: '08:00 PM' },
    { day: 'Friday', active: true, start: '09:00 AM', end: '08:00 PM' },
    { day: 'Saturday', active: true, start: '08:00 AM', end: '09:00 PM' },
    { day: 'Sunday', active: false, start: '09:00 AM', end: '06:00 PM' },
  ]);

  const handleToggleDay = (idx: number) => {
    setWeeklySchedule((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, active: !item.active } : item))
    );
  };

  const handleSave = () => {
    if (isPendingVendor) {
      showToast('Access Restricted', 'Your account must be approved before using this feature.', 'error');
      return;
    }
    showToast('Schedule Saved!', 'Your weekly availability and service radius have been updated.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-[#FFFDFE] text-[#111827] pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Availability & Radius</h1>
          <p className="text-xs text-[#64748B] font-medium mt-1">Configure operating days, daily working hours, and city service radius</p>
        </div>
        <Button variant="primary" onClick={handleSave} leftIcon={<Save size={16} />} disabled={isPendingVendor} title={isPendingVendor ? 'Your account must be approved before using this feature.' : undefined} className="h-11 px-5 rounded-2xl text-xs font-bold">
          Save Settings
        </Button>
      </div>

      {/* Online Status Toggle Banner */}
      <div className="p-6 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl ${isOnline ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
            <Clock size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#111827]">Partner Live Status</h3>
            <p className="text-xs text-[#64748B]">{isOnline ? 'You are receiving live doorstep booking requests.' : 'You are currently offline.'}</p>
          </div>
        </div>

        <button
          onClick={() => {
            if (isPendingVendor) {
              showToast('Access Restricted', 'Your account must be approved before using this feature.', 'error');
              return;
            }
            setIsOnline(!isOnline);
          }}
          disabled={isPendingVendor}
          title={isPendingVendor ? 'Your account must be approved before using this feature.' : undefined}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${isPendingVendor ? 'bg-slate-300 text-slate-600 cursor-not-allowed' : 'cursor-pointer'} ${
            isOnline && !isPendingVendor ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-200 text-slate-700'
          }`}
        >
          {isOnline ? 'ONLINE' : 'OFFLINE'}
        </button>
      </div>

      {/* Service Radius Slider */}
      <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
            <MapPin className="text-[#FF2E7E]" size={20} />
            <span>Operating City Radius</span>
          </h3>
          <span className="text-xl font-extrabold text-[#FF2E7E]">{radius} KM Radius</span>
        </div>

        <input
          type="range"
          min="2"
          max="25"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          className="w-full h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-[#FF2E7E]"
        />
        <p className="text-xs text-[#64748B]">You will only receive customer booking leads within a {radius}km radius of your studio location.</p>
      </div>

      {/* Weekly Schedule Manager */}
      <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-5">
        <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
          <Calendar className="text-[#FF2E7E]" size={20} />
          <span>Weekly Operating Hours</span>
        </h3>

        <div className="space-y-3">
          {weeklySchedule.map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-36">
                <input
                  type="checkbox"
                  checked={item.active}
                  onChange={() => handleToggleDay(i)}
                  className="w-4 h-4 rounded text-[#FF2E7E] focus:ring-[#FF2E7E]"
                />
                <span className="text-xs font-bold text-[#111827]">{item.day}</span>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                <span>{item.active ? `${item.start} - ${item.end}` : 'OFF DAY'}</span>
              </div>

              <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${item.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                {item.active ? 'Available' : 'Closed'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
