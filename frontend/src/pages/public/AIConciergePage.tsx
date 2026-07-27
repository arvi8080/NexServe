import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Bot, ArrowRight, CheckCircle2, Star, Calendar, Clock, MapPin, DollarSign, Tag, ShieldCheck, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { bookingApi } from '@/api/booking';
import { useAuth } from '@/context/AuthContext';
import { MOCK_SERVICES, MOCK_VENDORS } from '@/services/mockDataService';
import { formatCurrency } from '@/utils/formatters';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/ui/Button';
import { AISkinAnalysis } from '@/components/ai/AISkinAnalysis';

export const AIConciergePage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();

  const [prompt, setPrompt] = useState('I have oily skin, a wedding next week, and a budget of ₹2,500.');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'scanner'>('prompt');

  const [aiRecommendation, setAiRecommendation] = useState<{
    services: typeof MOCK_SERVICES;
    vendor: typeof MOCK_VENDORS[0];
    totalOriginalPrice: number;
    discountAmount: number;
    estimatedPrice: number;
    timeSlots: string[];
    selectedSlot: string;
    analysisTags: string[];
  } | null>({
    services: [MOCK_SERVICES[0], MOCK_SERVICES[1]],
    vendor: MOCK_VENDORS[0],
    totalOriginalPrice: 2798,
    discountAmount: 699,
    estimatedPrice: 2099,
    timeSlots: ['10:00 AM', '02:00 PM', '04:30 PM', '06:00 PM'],
    selectedSlot: '02:00 PM',
    analysisTags: ['Oily Skin Detected', 'Wedding Glow Treatment', 'Budget Constraint ₹2,500 Satisfied'],
  });

  const samplePrompts = [
    'I have oily skin, a wedding next week, and a budget of ₹2,500.',
    'Herbal organic hair spa for sensitive scalp under ₹1,500.',
    'HD Bridal Party Makeover + Hydra-Facial combo under ₹5,000.',
    'Quick facial cleanup for sensitive skin this Saturday after 4 PM.',
  ];

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      let matchedServices = [MOCK_SERVICES[0], MOCK_SERVICES[1]];
      let tags = ['Skin Care Analysis Complete', 'Occasion Tailored', 'Budget Satisfied'];
      let orig = 2798;
      let disc = 699;
      let est = 2099;

      if (prompt.toLowerCase().includes('hair') || prompt.toLowerCase().includes('scalp')) {
        matchedServices = [MOCK_SERVICES[1]];
        tags = ['Hair Care Specialist', 'Sensitive Scalp Protection', 'Within ₹1,500 Limit'];
        orig = 1299;
        disc = 324;
        est = 975;
      } else if (prompt.toLowerCase().includes('bridal') || prompt.toLowerCase().includes('makeover')) {
        matchedServices = [MOCK_SERVICES[2], MOCK_SERVICES[0]];
        tags = ['HD Airbrush Makeup', 'Pre-Bridal Radiance', 'Within ₹5,000 Budget'];
        orig = 4498;
        disc = 1124;
        est = 3374;
      }

      setAiRecommendation({
        services: matchedServices,
        vendor: MOCK_VENDORS[0],
        totalOriginalPrice: orig,
        discountAmount: disc,
        estimatedPrice: est,
        timeSlots: ['10:00 AM', '02:00 PM', '04:30 PM', '06:00 PM'],
        selectedSlot: '02:00 PM',
        analysisTags: tags,
      });

      setIsAnalyzing(false);
      showToast('AI Analysis Complete!', 'Custom treatment package generated.', 'success');
    }, 1000);
  };

  const handleOneFlowBooking = async () => {
    if (!isAuthenticated) {
      showToast('Sign In Required', 'Please log in to your NexServe account to continue booking.', 'info');
      navigate('/login');
      return;
    }

    if (!aiRecommendation) return;

    try {
      const newBooking = await bookingApi.createBooking({
        serviceId: aiRecommendation.services[0].id,
        bookingDate: new Date().toISOString(),
        address: '77 10th Main, Koramangala, Bengaluru',
        notes: `AI Package: ${prompt}`,
      });

      showToast('AI Package Selected', 'Proceeding to doorstep checkout...', 'success');
      navigate(`/customer/checkout/${newBooking.id}`);
    } catch {
      showToast('Booking Error', 'Could not execute AI booking.', 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20 bg-[#FFFDFE] text-[#111827] relative">
      {/* Header Banner */}
      <div className="p-8 md:p-12 rounded-[32px] bg-gradient-to-br from-purple-50/90 via-pink-50/50 to-white border border-pink-200 shadow-2xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-purple-200 text-purple-700 text-xs font-bold shadow-xs">
          <Bot size={16} />
          <span>One-Flow AI Beauty Concierge</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
          Smart Beauty AI Suite
        </h1>
        <p className="text-sm text-[#64748B] max-w-xl mx-auto leading-relaxed">
          Describe your skin requirements or run a live computer-vision selfie diagnostic scan to generate tailored packages.
        </p>

        {/* Tab Switcher */}
        <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-white border border-pink-200 shadow-md max-w-xs mx-auto pt-1">
          <button
            onClick={() => setActiveTab('prompt')}
            className={`flex-1 py-2 px-4 text-xs font-bold rounded-full transition-all cursor-pointer ${
              activeTab === 'prompt' ? 'bg-[#FF2E7E] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            💬 Text Assistant
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex-1 py-2 px-4 text-xs font-bold rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'scanner' ? 'bg-[#FF2E7E] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera size={14} /> <span>Selfie Scanner</span>
          </button>
        </div>
      </div>

      {activeTab === 'scanner' ? (
        <AISkinAnalysis />
      ) : (
        <div className="space-y-8">
          {/* Prompt Input Form */}
          <form onSubmit={handleAnalyze} className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-5">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF2E7E]">
              <Sparkles size={16} />
              <span>Describe Skin Type, Event, or Target Budget:</span>
            </div>

            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="w-full p-5 rounded-2xl bg-slate-50 border border-[#ECECEC] text-sm text-[#111827] focus:outline-none focus:border-[#FF2E7E] font-medium leading-relaxed"
                placeholder="e.g. I have dry skin, an outdoor wedding next week, and a budget of ₹3,000..."
              />
            </div>

            {/* Quick Sample Prompts */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Try Sample Scenarios:</span>
              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((sp, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPrompt(sp)}
                    className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-pink-50 hover:text-[#FF2E7E] border border-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer text-left"
                  >
                    "{sp}"
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              isLoading={isAnalyzing}
              leftIcon={<Sparkles size={18} />}
              className="w-full h-14 rounded-2xl text-xs font-bold shadow-xl"
            >
              Generate Custom AI Treatment Package
            </Button>
          </form>

          {/* AI Recommendation Result Card */}
          {aiRecommendation && (
            <div className="p-8 md:p-10 rounded-[36px] bg-white border border-[#ECECEC] shadow-2xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECECEC] pb-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-pink-50 text-[#FF2E7E] text-xs font-extrabold border border-pink-200">
                    ✨ Tailored Package Recommendation
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#111827] mt-2">
                    Custom Radiance & Glow Sanctuary
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through block">₹{aiRecommendation.totalOriginalPrice}</span>
                  <span className="text-3xl font-extrabold text-[#FF2E7E]">
                    {formatCurrency(aiRecommendation.estimatedPrice)}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {aiRecommendation.analysisTags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* Package Services */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Included Treatments:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {aiRecommendation.services.map((serv) => (
                    <div key={serv.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                      <img src={serv.image} alt={serv.title} className="w-14 h-14 rounded-xl object-cover" />
                      <div>
                        <h4 className="text-xs font-bold text-[#111827]">{serv.title}</h4>
                        <span className="text-[11px] text-slate-500">{serv.duration} Mins Session • ₹{serv.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 1-Click Booking Button */}
              <Button
                variant="primary"
                onClick={handleOneFlowBooking}
                leftIcon={<ArrowRight size={18} />}
                className="w-full h-14 rounded-2xl text-xs font-bold shadow-xl"
              >
                Book Package Now
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
