import React, { useState } from 'react';
import { Camera, Sparkles, CheckCircle2, RefreshCw, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { formatCurrency } from '@/utils/formatters';
import { useNavigate } from 'react-router-dom';

export const AISkinAnalysis: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  );

  const [diagnosticResult, setDiagnosticResult] = useState<{
    score: number;
    concerns: { name: string; severity: string; score: number }[];
    recommendedTreatment: string;
    price: number;
  }>({
    score: 84,
    concerns: [
      { name: 'Hydration Deficit / Dryness', severity: 'Moderate', score: 62 },
      { name: 'Pore Congestion & T-Zone Oil', severity: 'Mild', score: 78 },
      { name: 'Pigmentation / UV Exposure', severity: 'Mild', score: 85 },
      { name: 'Fine Lines & Collagen Elasticity', severity: 'Good', score: 91 },
    ],
    recommendedTreatment: 'Diamond Hydra-Glow Facial & Collagen Infusion',
    price: 1499,
  });

  const handleStartScan = () => {
    setIsScanning(true);
    setScanComplete(false);

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      showToast('AI Skin Analysis Complete!', '5 skin parameters analyzed.', 'success');
    }, 2000);
  };

  return (
    <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-pink-50 text-[#FF2E7E]">
            <Camera size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#111827]">AI Selfie Skin Scanner</h3>
            <p className="text-xs text-[#64748B]">Instant computer vision skin health analysis & treatment matching</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
          ✨ Vision AI v4.0
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Selfie Preview Container */}
        <div className="relative aspect-square max-w-sm mx-auto w-full rounded-3xl overflow-hidden bg-slate-100 border-2 border-pink-200 shadow-md group">
          <img src={selectedPhoto} alt="Skin Scanner Preview" className="w-full h-full object-cover" />

          {isScanning && (
            <div className="absolute inset-0 bg-pink-500/20 backdrop-blur-xs flex flex-col items-center justify-center space-y-3">
              <div className="w-16 h-16 rounded-full border-4 border-white border-t-transparent animate-spin" />
              <span className="px-4 py-1.5 rounded-full bg-white text-[#FF2E7E] text-xs font-extrabold shadow-md">
                Analyzing 5 Skin Layers...
              </span>
            </div>
          )}

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <button
              onClick={handleStartScan}
              disabled={isScanning}
              className="gradient-btn w-full h-11 text-xs font-bold rounded-2xl cursor-pointer"
            >
              {isScanning ? 'Scanning...' : 'Scan Selfie Now'}
            </button>
          </div>
        </div>

        {/* Right: Diagnostic Results & Treatment Recommendation */}
        <div className="space-y-5">
          {!scanComplete ? (
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center space-y-3">
              <Sparkles size={36} className="text-[#FF2E7E] mx-auto" />
              <h4 className="text-base font-bold text-[#111827]">Ready for AI Diagnostic Scan</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Click "Scan Selfie Now" to run computer-vision analysis on dryness, pore congestion, pigmentation, and collagen elasticity.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Skin Health Score</span>
                  <span className="text-4xl font-extrabold text-[#111827]">{diagnosticResult.score} / 100</span>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  ✓ Healthy Radiance
                </span>
              </div>

              {/* Concern Breakdown Progress Bars */}
              <div className="space-y-3">
                {diagnosticResult.concerns.map((c, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>{c.name}</span>
                      <span className="text-[#FF2E7E]">{c.score}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8]" style={{ width: `${c.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommended Treatment Card */}
              <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200 space-y-2">
                <span className="text-[10px] text-[#FF2E7E] font-extrabold uppercase tracking-wider block">AI Recommended Treatment</span>
                <h4 className="text-sm font-bold text-[#111827]">{diagnosticResult.recommendedTreatment}</h4>
                <div className="flex items-center justify-between pt-2 border-t border-pink-200/60">
                  <span className="text-base font-extrabold text-[#111827]">{formatCurrency(diagnosticResult.price)}</span>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => navigate('/customer/book/s1')}
                    rightIcon={<ArrowRight size={14} />}
                  >
                    Book Recommended Session
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
