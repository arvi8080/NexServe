import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, AlertTriangle, Key, Users, RefreshCw, Activity, Terminal, CheckCircle2, ShieldAlert } from 'lucide-react';
import { securityApi, SecurityMatrixMetrics } from '@/api/security.api';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { Loader } from '@/components/common/Loader';

export const SecurityMatrix: React.FC = () => {
  const { showToast } = useToast();
  const [metrics, setMetrics] = useState<SecurityMatrixMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSecurityData = () => {
    setIsLoading(true);
    securityApi
      .getSecurityMetrics()
      .then((data) => setMetrics(data))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchSecurityData();
  }, []);

  if (isLoading || !metrics) return <Loader message="Loading Security Telemetry Matrix..." />;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 bg-[#FFFDFE] text-[#111827]">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF2E7E]/10 text-[#FF2E7E] text-xs font-bold mb-2">
            <ShieldCheck size={14} /> OWASP Top 10 & PCI DSS Standard
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Enterprise Security Matrix & Audit Center</h1>
          <p className="text-xs text-[#64748B] font-semibold mt-1">Real-time threat monitoring, token revocation, audit telemetry, and vulnerability compliance</p>
        </div>

        <Button variant="outline" onClick={fetchSecurityData} leftIcon={<RefreshCw size={16} />} className="h-11 px-5 rounded-2xl text-xs font-bold">
          Refresh Telemetry
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">OWASP Compliance</span>
            <ShieldCheck className="text-emerald-500" size={20} />
          </div>
          <h3 className="text-3xl font-extrabold text-emerald-600">{metrics.owaspComplianceScore}/100</h3>
          <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">100% Compliant</span>
        </div>

        <div className="p-6 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">PCI DSS Payment Security</span>
            <Lock className="text-[#FF2E7E]" size={20} />
          </div>
          <h3 className="text-3xl font-extrabold text-[#FF2E7E]">{metrics.pciDssComplianceScore}/100</h3>
          <span className="text-[11px] text-pink-700 font-bold bg-pink-50 px-2 py-0.5 rounded-full inline-block">HMAC Verified</span>
        </div>

        <div className="p-6 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Attacks Blocked (24h)</span>
            <ShieldAlert className="text-purple-600" size={20} />
          </div>
          <h3 className="text-3xl font-extrabold text-purple-600">{metrics.blockedAttacks24h}</h3>
          <span className="text-[11px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-full inline-block">Auto Rate-Limited</span>
        </div>

        <div className="p-6 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Active JWT Sessions</span>
            <Users className="text-blue-600" size={20} />
          </div>
          <h3 className="text-3xl font-extrabold text-blue-600">{metrics.activeSessions}</h3>
          <span className="text-[11px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-full inline-block">HttpOnly Cookie Monitored</span>
        </div>
      </div>

      {/* Live Audit Log Stream */}
      <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
          <div className="flex items-center gap-2.5">
            <Terminal className="text-[#FF2E7E]" size={20} />
            <h3 className="text-lg font-bold text-[#111827]">Live Security Audit Stream</h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
            Real-Time Log Ingestion
          </span>
        </div>

        <div className="space-y-3">
          {metrics.recentAuditLogs.map((log) => (
            <div key={log.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                    log.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {log.status}
                  </span>
                  <span className="font-bold text-[#111827]">{log.action}</span>
                </div>
                <p className="text-slate-500">{log.userEmail} • IP: {log.ipAddress} • {log.userAgent}</p>
              </div>

              <span className="text-[11px] text-slate-400 font-semibold shrink-0">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
