import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Bot, X, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AIBeautyAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<
    { sender: 'ai' | 'user'; text: string; recommendation?: { title: string; path: string } }[]
  >([
    {
      sender: 'ai',
      text: 'Hello! I am your AI Beauty Concierge. Ask me anything like "What facial should I choose for dry skin?" or "Recommend a hair spa".',
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setQuery('');

    // Simulate AI Concierge Analysis Response
    setTimeout(() => {
      let aiResponse = 'Based on your query, I recommend our signature Diamond Hydra-Glow Facial for deep hydration and radiance.';
      let rec = { title: 'Diamond Hydra-Glow Facial', path: '/services/s1' };

      if (userText.toLowerCase().includes('hair') || userText.toLowerCase().includes('dandruff')) {
        aiResponse = 'For hair nourishment and scalp detox, I recommend our Herbal Organic Keratin Hair Spa.';
        rec = { title: 'Herbal Keratin Hair Spa', path: '/services/s2' };
      } else if (userText.toLowerCase().includes('bridal') || userText.toLowerCase().includes('wedding')) {
        aiResponse = 'For bridal transformations, our HD Airbrush Bridal Makeover Package is top rated!';
        rec = { title: 'HD Airbrush Bridal Package', path: '/services/s3' };
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: aiResponse,
          recommendation: rec,
        },
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating AI Trigger Button (Bottom-Left) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 to-[#FF2E7E] text-white text-xs font-bold shadow-2xl flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
      >
        <Sparkles size={16} className="animate-spin" />
        <span>AI Beauty Assistant</span>
      </button>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
          >
            <div className="w-full max-w-lg bg-white/98 backdrop-blur-2xl border border-[#ECECEC] rounded-3xl shadow-2xl p-6 space-y-4 flex flex-col max-h-[85vh]">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#ECECEC]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#111827]">AI Beauty Assistant</h3>
                    <p className="text-[11px] text-[#64748B]">Personalized treatment & skin recommendations</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 overflow-y-auto space-y-3 p-2">
                {messages.map((m, i) => (
                  <div key={i} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                        m.sender === 'user'
                          ? 'bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white font-medium'
                          : 'bg-slate-100 text-[#111827] font-medium'
                      }`}
                    >
                      {m.text}
                    </div>

                    {m.recommendation && (
                      <div className="mt-2 p-3 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-between gap-3 text-xs w-full max-w-[85%]">
                        <span className="font-bold text-[#111827]">{m.recommendation.title}</span>
                        <Link
                          to={m.recommendation.path}
                          onClick={() => setIsOpen(false)}
                          className="px-3 py-1.5 rounded-xl bg-white text-[#FF2E7E] font-bold border border-pink-200 shadow-xs flex items-center gap-1 hover:bg-slate-50"
                        >
                          <span>Book</span>
                          <ArrowRight size={12} />
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="flex items-center gap-2 pt-2 border-t border-[#ECECEC]">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask e.g. What facial for dry skin?"
                  className="flex-1 h-12 px-4 rounded-2xl bg-white border border-[#ECECEC] text-xs text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
                />
                <button
                  type="submit"
                  className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white flex items-center justify-center shadow-md shrink-0 cursor-pointer"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
