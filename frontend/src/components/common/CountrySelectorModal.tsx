import React, { useState } from 'react';
import { Globe, Check, ChevronDown, Sparkles } from 'lucide-react';
import { useCountry } from '@/context/CountryContext';
import { Modal } from '@/components/ui/Modal';

export const CountrySelectorModal: React.FC = () => {
  const { countries, selectedCountry, selectCountry } = useCountry();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/90 border border-[#ECECEC] hover:border-[#FF2E7E]/40 hover:bg-pink-50/50 text-[#111827] text-xs font-bold transition-all cursor-pointer focus:outline-none"
        aria-label="Select Country and Currency"
      >
        <span className="text-base leading-none">{selectedCountry.flag}</span>
        <span className="hidden sm:inline font-bold">{selectedCountry.code}</span>
        <span className="text-slate-400 font-mono">({selectedCountry.currencySymbol})</span>
        <ChevronDown size={14} className="text-slate-400" />
      </button>

      {/* Country Selection Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Select Country & Region Marketplace">
        <div className="space-y-6 pt-2">
          <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-200 text-xs font-medium text-slate-700 leading-relaxed flex items-start gap-3">
            <Globe className="text-[#FF2E7E] w-5 h-5 shrink-0 mt-0.5" />
            <span>
              GlowHome dynamically loads local currency pricing, city coverage, tax rules, and local payment methods (Razorpay in India vs eSewa/Khalti in Nepal) based on your selected region.
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {countries.map((country) => {
              const isSelected = selectedCountry.code === country.code;
              return (
                <div
                  key={country.code}
                  onClick={() => {
                    selectCountry(country.code);
                    setIsOpen(false);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-white border-[#FF2E7E] shadow-xl ring-2 ring-[#FF2E7E]/20'
                      : 'bg-slate-50 border-[#ECECEC] hover:bg-white hover:border-pink-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{country.flag}</span>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-[#111827]">{country.name}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-mono font-bold">
                          {country.code}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        Currency: <span className="font-bold text-[#FF2E7E]">{country.currency} ({country.currencySymbol})</span> • Tax: {country.taxName} ({country.taxRate}%)
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-8 h-8 rounded-full bg-[#FF2E7E] text-white flex items-center justify-center font-bold text-xs shadow-md">
                      <Check size={16} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};
