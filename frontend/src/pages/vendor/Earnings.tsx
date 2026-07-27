import React from 'react';
import { DollarSign, Wallet, TrendingUp, Calendar, ArrowUpRight, ShieldCheck, CreditCard } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export const Earnings: React.FC = () => {
  const { showToast } = useToast();

  const transactions = [
    { id: 't1', service: 'Diamond Hydra-Glow Facial', date: 'Jul 26, 2026', amount: 1499, status: 'COMPLETED' },
    { id: 't2', service: 'Herbal Keratin Hair Spa', date: 'Jul 24, 2026', amount: 1299, status: 'COMPLETED' },
    { id: 't3', service: 'HD Airbrush Bridal Makeup', date: 'Jul 21, 2026', amount: 4999, status: 'COMPLETED' },
  ];

  const handleWithdraw = () => {
    showToast('Payout Initiated!', '₹12,400 will be deposited into your bank account within 24 hours.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-[#FFFDFE] text-[#111827] pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Earnings & Bank Payouts</h1>
          <p className="text-xs text-[#64748B] font-medium mt-1">Track net treatment revenue, weekly automatic bank transfers, and payouts</p>
        </div>
        <Button variant="primary" onClick={handleWithdraw} leftIcon={<ArrowUpRight size={18} />} className="h-11 px-5 rounded-2xl text-xs font-bold">
          Withdraw Payout
        </Button>
      </div>

      {/* 3 Main Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-2">
          <div className="p-3 rounded-2xl bg-pink-50 text-[#FF2E7E] w-fit"><Wallet size={24} /></div>
          <span className="text-xs text-[#64748B] font-semibold block">Available Payout Balance</span>
          <h3 className="text-3xl font-extrabold text-[#111827]">₹12,400.00</h3>
          <span className="text-[11px] font-bold text-emerald-600 block">✓ Next Transfer: Monday</span>
        </div>

        <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-2">
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 w-fit"><TrendingUp size={24} /></div>
          <span className="text-xs text-[#64748B] font-semibold block">Net Monthly Earnings</span>
          <h3 className="text-3xl font-extrabold text-[#111827]">₹85,000.00</h3>
          <span className="text-[11px] font-bold text-[#FF2E7E] block">+24% vs last month</span>
        </div>

        <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-2">
          <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 w-fit"><CreditCard size={24} /></div>
          <span className="text-xs text-[#64748B] font-semibold block">Platform Fee Commission</span>
          <h3 className="text-3xl font-extrabold text-[#111827]">15%</h3>
          <span className="text-[11px] font-bold text-slate-500 block">85% Revenue Retained</span>
        </div>
      </div>

      {/* Recent Payout Transactions */}
      <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-5">
        <h3 className="text-base font-bold text-[#111827] border-b border-[#ECECEC] pb-3">
          Completed Treatment Transactions
        </h3>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#111827]">{tx.service}</h4>
                <p className="text-[11px] text-[#64748B]">{tx.date} • Direct Payout</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-extrabold text-emerald-600 block">+{formatCurrency(tx.amount * 0.85)}</span>
                <span className="text-[10px] text-slate-400 font-medium">Fee: {formatCurrency(tx.amount * 0.15)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
