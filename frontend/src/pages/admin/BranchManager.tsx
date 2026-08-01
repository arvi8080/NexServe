import React, { useState, useEffect } from 'react';
import { Building2, Network, Plus, CheckCircle2, TrendingUp, DollarSign, Users, Award, ShieldCheck, Mail, Phone, MapPin, ChevronRight, Globe, Layers } from 'lucide-react';
import { branchApi, RegionalRevenueReport } from '@/api/branch.api';
import { Branch, FranchisePartner } from '@/types';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { Loader } from '@/components/common/Loader';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency } from '@/utils/formatters';

export const BranchManager: React.FC = () => {
  const { showToast } = useToast();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [franchises, setFranchises] = useState<FranchisePartner[]>([]);
  const [revenueReports, setRevenueReports] = useState<RegionalRevenueReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // New Branch Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [branchName, setBranchName] = useState('');
  const [branchType, setBranchType] = useState<'COMPANY_OWNED' | 'FRANCHISE' | 'CORPORATE'>('COMPANY_OWNED');
  const [managerName, setManagerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      branchApi.getBranches(),
      branchApi.getFranchises(),
      branchApi.getRegionalRevenueReports(),
    ])
      .then(([bData, fData, rData]) => {
        setBranches(bData);
        setFranchises(fData);
        setRevenueReports(rData);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreateBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchName.trim()) return;

    try {
      const created = await branchApi.createBranch({
        branchName,
        branchType,
        managerName,
        email,
        phone,
      });

      setBranches((prev) => [...prev, created]);
      setIsModalOpen(false);
      setBranchName('');
      setManagerName('');
      setEmail('');
      setPhone('');
      showToast('Branch Onboarded!', `Successfully created ${branchType.replace('_', ' ')}: ${created.branchName}`, 'success');
    } catch {
      showToast('Error', 'Could not register new branch.', 'error');
    }
  };

  if (isLoading) return <Loader message="Hydrating organizational hierarchy & branch telemetry..." />;

  return (
    <div className="space-y-8 pb-20 bg-[#FFFDFE] text-[#111827]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-[#FF2E7E] text-xs font-extrabold border border-pink-200 mb-2">
            <Network size={14} />
            <span>Multi-Country Franchise & Organizational Hierarchy</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Branches & Franchise Command Center</h1>
          <p className="text-xs text-[#64748B] font-semibold mt-1">
            Super Admin Governance across Company-Owned Flagships, Franchise Partners, and City Managers.
          </p>
        </div>

        <Button variant="primary" onClick={() => setIsModalOpen(true)} leftIcon={<Plus size={16} />} className="h-11 px-5 rounded-2xl text-xs font-bold shadow-lg">
          + Add New Branch / Franchise
        </Button>
      </div>

      {/* Regional Revenue Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {revenueReports.map((report) => (
          <div key={report.countryId} className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{report.countryId === 'cnt_in' ? '🇮🇳' : '🇳🇵'}</span>
                <h3 className="text-lg font-bold text-[#111827]">{report.countryName} Regional Revenue</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-pink-50 text-[#FF2E7E] text-xs font-mono font-extrabold border border-pink-200">
                {report.currencySymbol} GMV Report
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Company Flagships</span>
                <span className="text-lg font-extrabold text-[#111827]">
                  {formatCurrency(report.companyRevenue, report.currencySymbol)}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Franchise Royalty (15%)</span>
                <span className="text-lg font-extrabold text-emerald-600">
                  {formatCurrency(report.franchiseRevenue, report.currencySymbol)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-600 pt-1">
              <span>{report.branchesCount} Active Branches</span>
              <span>•</span>
              <span>{report.activeVendorsCount} Certified Salons</span>
              <span>•</span>
              <span className="text-[#FF2E7E] font-extrabold">Total GMV: {formatCurrency(report.totalGMV, report.currencySymbol)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Organizational Hierarchy Tree Diagram */}
      <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
        <h3 className="text-base font-extrabold text-[#111827] flex items-center gap-2 border-b border-[#ECECEC] pb-3">
          <Layers size={18} className="text-[#FF2E7E]" />
          <span>Active Organizational Branch Network</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <div key={branch.id} className="p-6 rounded-[28px] bg-slate-50 border border-slate-200 space-y-4 relative">
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                    branch.branchType === 'COMPANY_OWNED'
                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {branch.branchType.replace('_', ' ')}
                </span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 size={14} /> ACTIVE
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#111827]">{branch.branchName}</h4>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <MapPin size={12} className="text-[#FF2E7E]" /> Manager: <span className="font-bold text-[#111827]">{branch.managerName}</span>
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 space-y-1 text-xs text-slate-600 font-semibold">
                <div className="flex items-center gap-2"><Mail size={14} className="text-slate-400" /> <span className="truncate">{branch.email}</span></div>
                <div className="flex items-center gap-2"><Phone size={14} className="text-slate-400" /> <span>{branch.phone}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Franchise Partners Table */}
      <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
        <h3 className="text-base font-extrabold text-[#111827] flex items-center gap-2 border-b border-[#ECECEC] pb-3">
          <Award size={18} className="text-[#FF2E7E]" />
          <span>Active Franchise Partner Agreements</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-[#ECECEC]">
              <tr>
                <th className="p-4 rounded-l-2xl">Company & Owner</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Agreement Term</th>
                <th className="p-4">Royalty Rate</th>
                <th className="p-4 rounded-r-2xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {franchises.map((fra) => (
                <tr key={fra.id} className="hover:bg-slate-50/60">
                  <td className="p-4">
                    <div className="space-y-0.5">
                      <span className="font-bold text-[#111827] block text-sm">{fra.companyName}</span>
                      <span className="text-slate-500 text-xs font-medium">Owner: {fra.ownerName}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-0.5 font-mono text-xs">
                      <span>{fra.email}</span>
                      <span className="block text-slate-400">{fra.phone}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-800">{fra.agreementStart} to {fra.agreementEnd}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200">
                      {fra.commissionPercentage}% Platform Royalty
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                      {fra.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Branch Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Regional Branch / Franchise">
        <form onSubmit={handleCreateBranch} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Branch Name</label>
            <input
              type="text"
              required
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="e.g. Koramangala Partner Franchise"
              className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Branch Type</label>
            <select
              value={branchType}
              onChange={(e) => setBranchType(e.target.value as any)}
              className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
            >
              <option value="COMPANY_OWNED">Company-Owned Flagship</option>
              <option value="FRANCHISE">Franchise Partner</option>
              <option value="CORPORATE">Corporate Regional Office</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Branch Manager Name</label>
            <input
              type="text"
              required
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              placeholder="Ananya Sharma"
              className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="manager@glowhome.com"
                className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Phone</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full h-12 rounded-2xl text-xs font-bold shadow-xl pt-2">
            Onboard Branch
          </Button>
        </form>
      </Modal>
    </div>
  );
};
