import React, { useState } from 'react';
import { Building, Users, DollarSign, FileText, Percent, ShieldCheck, Download, Plus, Star, MapPin, CheckCircle2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { formatCurrency } from '@/utils/formatters';

export const EnterpriseSalonChain: React.FC = () => {
  const { showToast } = useToast();
  const [selectedBranch, setSelectedBranch] = useState('all');

  const branches = [
    { id: 'b1', name: 'Indiranagar Flagship Studio', city: 'Bengaluru', revenue: '₹3,45,000', staff: 12, rating: 4.9 },
    { id: 'b2', name: 'Koramangala Doorstep Branch', city: 'Bengaluru', revenue: '₹2,85,000', staff: 8, rating: 4.8 },
    { id: 'b3', name: 'HSR Layout Luxury Express', city: 'Bengaluru', revenue: '₹1,95,000', staff: 6, rating: 4.9 },
  ];

  const staffRoster = [
    { id: 's1', name: 'Pooja Verma', role: 'Senior Aesthetician', branch: 'Indiranagar Flagship', salary: 35000, commission: '30%', rating: 4.9 },
    { id: 's2', name: 'Megha Nair', role: 'Hair Specialist', branch: 'Koramangala Branch', salary: 30000, commission: '25%', rating: 4.8 },
    { id: 's3', name: 'Sneha K.', role: 'Makeup Artist', branch: 'HSR Layout Express', salary: 32000, commission: '30%', rating: 5.0 },
  ];

  const handleExportGST = () => {
    showToast('GST Report Exported!', 'GSTR-1 & GSTR-3B tax compliance ledger downloaded.', 'success');
  };

  const handleDisbursePayroll = () => {
    showToast('Payroll Disbursed!', 'Monthly salaries & commissions processed for 26 staff members.', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 bg-[#FFFDFE] text-[#111827] relative">
      {/* Header Banner */}
      <div className="p-8 md:p-12 rounded-[32px] bg-gradient-to-br from-purple-50 via-pink-50 to-white border border-pink-200 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-purple-200 text-purple-700 text-xs font-bold shadow-xs">
            <Building size={16} />
            <span>Enterprise Franchise & Salon Chain Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mt-3">
            Multi-Location Enterprise Suite
          </h1>
          <p className="text-xs text-[#64748B] font-semibold mt-1">
            Manage salon chains, staff payroll, commission splits, enterprise CRM, and GST tax compliance
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button variant="secondary" onClick={handleExportGST} leftIcon={<Download size={16} />} className="h-11 px-5 rounded-2xl text-xs font-bold">
            GST Tax Report
          </Button>
          <Button variant="primary" onClick={handleDisbursePayroll} leftIcon={<DollarSign size={16} />} className="h-11 px-5 rounded-2xl text-xs font-bold">
            Process Payroll
          </Button>
        </div>
      </div>

      {/* Multi-Location Branch Performance Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#111827]">Branch Locations & Franchise Performance</h3>
          <button className="text-xs font-bold text-[#FF2E7E] hover:underline flex items-center gap-1 cursor-pointer">
            <Plus size={16} /> Add New Franchise Branch
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map((b) => (
            <div key={b.id} className="p-6 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-pink-50 text-[#FF2E7E] text-[10px] font-extrabold border border-pink-200">
                  {b.city}
                </span>
                <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                  <Star size={14} className="fill-amber-400" /> {b.rating}★
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#111827]">{b.name}</h4>
                <p className="text-xs text-[#64748B]">{b.staff} Certified Beauticians Assigned</p>
              </div>

              <div className="pt-3 border-t border-[#ECECEC] flex items-center justify-between">
                <span className="text-xs text-[#64748B] font-semibold">Monthly Revenue</span>
                <span className="text-xl font-extrabold text-[#111827]">{b.revenue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Payroll & Commission Manager */}
      <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
          <h3 className="text-lg font-bold text-[#111827] flex items-center gap-2">
            <Users className="text-[#FF2E7E]" size={20} />
            <span>Staff Roster, Payroll & Commission Manager</span>
          </h3>
          <span className="text-xs font-bold text-emerald-600">26 Active Beauticians</span>
        </div>

        <div className="space-y-3">
          {staffRoster.map((s) => (
            <div key={s.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-[#111827]">{s.name}</h4>
                  <span className="text-[10px] font-bold text-[#FF2E7E] bg-pink-50 px-2 py-0.5 rounded-full">{s.role}</span>
                </div>
                <p className="text-[11px] text-[#64748B]">{s.branch} • {s.rating}★ Score</p>
              </div>

              <div className="flex items-center gap-6 text-xs font-bold text-slate-700">
                <div>
                  <span className="text-[10px] text-slate-400 block font-normal">Base Salary</span>
                  <span>{formatCurrency(s.salary)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-normal">Commission Split</span>
                  <span className="text-emerald-600">{s.commission}</span>
                </div>
                <button
                  onClick={() => showToast('Payout Processed', `Salary disbursed to ${s.name}.`, 'success')}
                  className="px-4 py-2 rounded-xl bg-[#FF2E7E] text-white text-xs font-bold cursor-pointer"
                >
                  Pay Staff
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise CRM & GST Compliance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
          <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
            <FileText className="text-blue-500" size={18} />
            <span>GST Tax Compliance Ledger</span>
          </h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Automated monthly GSTR-1 and GSTR-3B tax calculations with 18% GST audit breakdowns for enterprise accounting.
          </p>
          <Button variant="secondary" onClick={handleExportGST} className="w-full h-11 text-xs font-bold rounded-2xl">
            Export GST File (CSV / PDF)
          </Button>
        </div>

        <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-4">
          <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
            <TrendingUp className="text-emerald-500" size={18} />
            <span>Enterprise CRM & Customer LTV</span>
          </h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Track high-value client retention, automated birthday gift vouchers, and re-engagement campaigns across all salon branches.
          </p>
          <Button variant="primary" onClick={() => showToast('CRM Campaign Sent', 'Re-engagement offer sent to 450 clients.', 'success')} className="w-full h-11 text-xs font-bold rounded-2xl">
            Launch Client Re-Engagement Campaign
          </Button>
        </div>
      </div>
    </div>
  );
};
