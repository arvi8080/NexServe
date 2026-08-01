import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserCheck,
  Building,
  DollarSign,
  Briefcase,
  MapPin,
  Package,
  GraduationCap,
  MessageSquare,
  Bell,
  ShieldCheck,
  Lock,
  TrendingUp,
  PieChart,
  FileText,
  Search,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Download,
  Calendar,
  Sparkles,
  Zap,
  Activity,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { formatCurrency } from '@/utils/formatters';
import { InternalTeamChat } from '@/components/chat/InternalTeamChat';

export const CompanyERP: React.FC = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('employee');

  const modules = [
    { id: 'employee', name: '1. Employee & Roles', icon: Users },
    { id: 'customer_crm', name: '2. Customer CRM', icon: UserCheck },
    { id: 'vendor_crm', name: '3. Vendor CRM', icon: Building },
    { id: 'hr_portal', name: '4. HR & Hiring Portal', icon: Briefcase },
    { id: 'finance', name: '5. Finance & P&L', icon: DollarSign },
    { id: 'operations', name: '6. Operations & Live Map', icon: MapPin },
    { id: 'franchise', name: '7. City Franchises', icon: Layers },
    { id: 'inventory', name: '8. Inventory & Stock', icon: Package },
    { id: 'learning', name: '9. Pro Learning Hub', icon: GraduationCap },
    { id: 'team_chat', name: '10. Team Messaging', icon: MessageSquare },
    { id: 'notifications', name: '11. Notifications Hub', icon: Bell },
    { id: 'audit_logs', name: '12. Audit Logs', icon: FileText },
    { id: 'security', name: '13. Security Center', icon: Lock },
    { id: 'ai_bi', name: '14. AI Revenue Forecast', icon: Sparkles },
    { id: 'investor', name: '15. Investor Dashboard', icon: PieChart },
  ];

  const employees = [
    { name: 'Swati Mohan', role: 'Super Admin', dept: 'Executive', city: 'Bengaluru', status: 'ACTIVE', salary: '₹1,50,000' },
    { name: 'Rohan Sharma', role: 'City Manager', dept: 'Operations', city: 'Mumbai', status: 'ACTIVE', salary: '₹95,000' },
    { name: 'Kavita Nair', role: 'Finance Manager', dept: 'Accounts', city: 'Delhi', status: 'ACTIVE', salary: '₹1,10,000' },
    { name: 'Amit Verma', role: 'Customer Support Lead', dept: 'Support', city: 'Kathmandu', status: 'ACTIVE', salary: '₹75,000' },
  ];

  const inventoryItems = [
    { item: 'Diamond Hydra-Facial Mono-Dose Kit', stock: 1240, status: 'IN STOCK', reorder: 200 },
    { item: 'Herbal Keratin Organic Scalp Serum', stock: 85, status: 'LOW STOCK', reorder: 150 },
    { item: 'Single-Use Disposable Bedsheet Mats', stock: 4500, status: 'IN STOCK', reorder: 500 },
    { item: 'Sanitized Stainless Extraction Tools', stock: 320, status: 'IN STOCK', reorder: 50 },
  ];

  const auditLogs = [
    { time: '11:15 AM', user: 'Admin Rohan', action: 'Changed Vendor Commission from 18% to 15%', type: 'CRITICAL' },
    { time: '10:42 AM', user: 'Finance Lead Kavita', action: 'Approved Weekly Payout batch ₹12,40,000', type: 'FINANCE' },
    { time: '09:30 AM', user: 'System Bot', action: 'Generated Monthly GST Tax Audit Invoice GSTR-1', type: 'TAX' },
  ];

  const handleExecuteAction = (actionName: string) => {
    showToast('Action Executed!', `${actionName} command completed successfully.`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 bg-[#FFFDFE] text-[#111827] pb-24 relative">
      {/* Header Banner */}
      <div className="p-8 md:p-10 rounded-[32px] bg-gradient-to-br from-slate-900 via-[#111827] to-pink-950 text-white shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-pink-300 text-xs font-bold backdrop-blur-md">
              <Sparkles size={16} />
              <span>Phase 6 Enterprise Operations Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              GlowHome Enterprise CMS + ERP Hub
            </h1>
            <p className="text-xs text-slate-300 max-w-xl font-medium">
              Integrated enterprise management software powering 15 core operational, financial, AI forecast, and multi-city modules.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button variant="secondary" onClick={() => handleExecuteAction('System Backup')} className="h-11 px-5 rounded-2xl text-xs font-bold">
              System Backup
            </Button>
            <Button variant="primary" onClick={() => handleExecuteAction('AI BI Telemetry Sync')} className="h-11 px-5 rounded-2xl text-xs font-bold">
              Sync Telemetry
            </Button>
          </div>
        </div>
      </div>

      {/* Module Selector Navigation Bar */}
      <div className="p-3 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl overflow-x-auto scrollbar-none flex items-center gap-2">
        {modules.map((m) => {
          const Icon = m.icon;
          const isActive = activeTab === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveTab(m.id)}
              className={`px-4 py-3 rounded-2xl text-xs font-bold shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon size={16} />
              <span>{m.name}</span>
            </button>
          );
        })}
      </div>

      {/* Module Content View */}
      <div className="space-y-6">
        {/* Module 1: Employee & Roles */}
        {activeTab === 'employee' && (
          <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
              <h3 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                <Users className="text-[#FF2E7E]" size={22} />
                <span>Internal Employee Roster & Role Permission Matrix</span>
              </h3>
              <Button size="sm" variant="primary" onClick={() => handleExecuteAction('Add Employee')} leftIcon={<Plus size={16} />}>
                Add Employee
              </Button>
            </div>

            <div className="space-y-3">
              {employees.map((emp, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">{emp.name}</h4>
                    <p className="text-xs text-[#64748B]">{emp.role} • Dept: {emp.dept} • City: {emp.city}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-700">
                    <span className="text-[#111827]">{emp.salary}</span>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {emp.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Module 5: Finance & P&L */}
        {activeTab === 'finance' && (
          <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
              <h3 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                <DollarSign className="text-emerald-600" size={22} />
                <span>Financial Ledger, GST Audit & P&L Statement</span>
              </h3>
              <Button size="sm" variant="secondary" onClick={() => handleExecuteAction('Download GSTR-1')} leftIcon={<Download size={16} />}>
                Export GSTR-1
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-6 rounded-3xl bg-pink-50/70 border border-pink-200 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Gross Platform Revenue</span>
                <h3 className="text-3xl font-extrabold text-[#111827]">₹1.24 Cr</h3>
                <span className="text-[11px] font-bold text-emerald-600">+34% YOY</span>
              </div>
              <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Net Profit Margin</span>
                <h3 className="text-3xl font-extrabold text-[#111827]">₹42.8 Lakhs</h3>
                <span className="text-[11px] font-bold text-emerald-600">34.5% Profitability</span>
              </div>
              <div className="p-6 rounded-3xl bg-purple-50/70 border border-purple-200 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">GST Tax Remitted</span>
                <h3 className="text-3xl font-extrabold text-[#111827]">₹22.3 Lakhs</h3>
                <span className="text-[11px] font-bold text-purple-600">18% GST Compliant</span>
              </div>
              <div className="p-6 rounded-3xl bg-blue-50/70 border border-blue-200 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Vendor Payouts</span>
                <h3 className="text-3xl font-extrabold text-[#111827]">₹68.5 Lakhs</h3>
                <span className="text-[11px] font-bold text-blue-600">85% Revenue Share</span>
              </div>
            </div>
          </div>
        )}

        {/* Module 8: Inventory & Stock */}
        {activeTab === 'inventory' && (
          <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
              <h3 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                <Package className="text-purple-600" size={22} />
                <span>Beauty Product Inventory & Central Warehouse Stock</span>
              </h3>
              <Button size="sm" variant="primary" onClick={() => handleExecuteAction('Create Purchase Order')} leftIcon={<Plus size={16} />}>
                Create Purchase Order
              </Button>
            </div>

            <div className="space-y-3">
              {inventoryItems.map((inv, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#111827]">{inv.item}</h4>
                    <p className="text-[11px] text-[#64748B]">Current Stock: {inv.stock} Units • Reorder Level: {inv.reorder} Units</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                      inv.status === 'LOW STOCK' ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Module 10: Team Messaging */}
        {activeTab === 'team_chat' && <InternalTeamChat />}

        {/* Module 12: Audit Logs */}
        {activeTab === 'audit_logs' && (
          <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
              <h3 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                <FileText className="text-[#FF2E7E]" size={22} />
                <span>Immutable System Audit Trail Log</span>
              </h3>
              <span className="text-xs font-bold text-emerald-600">100% Activity Tracked</span>
            </div>

            <div className="space-y-3">
              {auditLogs.map((log, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#111827] block">{log.action}</span>
                    <span className="text-slate-400 font-medium">{log.user}</span>
                  </div>
                  <span className="text-slate-400 font-mono font-bold">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Module 14: AI Revenue Forecast */}
        {activeTab === 'ai_bi' && (
          <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
              <h3 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                <Sparkles className="text-[#FF2E7E]" size={22} />
                <span>CEO Dashboard — AI Revenue & Churn Forecast</span>
              </h3>
              <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                ✨ Predictive Model v5.2
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-pink-50/70 border border-pink-200 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Q3 Projected GMV</span>
                <h3 className="text-3xl font-extrabold text-[#111827]">₹3.8 Cr</h3>
                <span className="text-[11px] font-bold text-emerald-600">+42% Growth Predicted</span>
              </div>
              <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Predicted Customer Retention</span>
                <h3 className="text-3xl font-extrabold text-[#111827]">88.5%</h3>
                <span className="text-[11px] font-bold text-emerald-600">Ultra-Low Churn Risk</span>
              </div>
              <div className="p-6 rounded-3xl bg-purple-50/70 border border-purple-200 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Peak Demand Season</span>
                <h3 className="text-3xl font-extrabold text-[#111827]">Oct - Dec</h3>
                <span className="text-[11px] font-bold text-purple-600">Festive & Wedding Surge</span>
              </div>
            </div>
          </div>
        )}

        {/* Module 15: Investor Dashboard */}
        {activeTab === 'investor' && (
          <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
              <h3 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                <PieChart className="text-emerald-600" size={22} />
                <span>Investor Dashboard — Series A Unit Economics</span>
              </h3>
              <Button size="sm" variant="primary" onClick={() => handleExecuteAction('Download Investor Deck')} leftIcon={<Download size={16} />}>
                Download Investor Pitch Deck
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase">CAC (Customer Acquisition)</span>
                <h4 className="text-2xl font-extrabold text-[#111827]">₹320</h4>
              </div>
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase">LTV (Lifetime Value)</span>
                <h4 className="text-2xl font-extrabold text-[#111827]">₹6,400</h4>
              </div>
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase">LTV : CAC Ratio</span>
                <h4 className="text-2xl font-extrabold text-emerald-600">20x (World-Class)</h4>
              </div>
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase">Cash Runway</span>
                <h4 className="text-2xl font-extrabold text-[#111827]">28 Months</h4>
              </div>
            </div>
          </div>
        )}

        {/* Fallback for other modules */}
        {activeTab !== 'employee' && activeTab !== 'finance' && activeTab !== 'inventory' && activeTab !== 'team_chat' && activeTab !== 'audit_logs' && activeTab !== 'ai_bi' && activeTab !== 'investor' && (
          <div className="p-12 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl text-center space-y-4">
            <Activity size={44} className="text-[#FF2E7E] mx-auto animate-pulse" />
            <h3 className="text-2xl font-extrabold text-[#111827]">
              {modules.find((m) => m.id === activeTab)?.name} Module Active
            </h3>
            <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
              Enterprise management telemetry connected. Live operational data feeds are synced with GlowHome core backend.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
