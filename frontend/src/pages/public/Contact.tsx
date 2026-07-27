import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      showToast('Message Sent!', 'Our 24/7 concierge team will respond shortly.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="space-y-12 pb-16 bg-[#FFF8FB] text-[#111827]">
      <div className="p-8 md:p-12 rounded-[32px] bg-gradient-to-br from-[#FFF5F8] via-pink-50/50 to-white border border-[#ECECEC] shadow-xl text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-extrabold text-[#111827]">24/7 Support Concierge</h1>
        <p className="text-sm text-[#6B7280]">Have questions about your booking or doorstep service? We are here to help.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-[#111827]">Direct Contact</h3>

            <div className="space-y-4 text-xs font-semibold text-[#6B7280]">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-pink-50 text-[#FF2E7A]"><Phone size={18} /></div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Call Toll-Free</span>
                  <span className="text-sm font-bold text-[#111827]">+91 1800 200 8899</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-pink-50 text-[#FF2E7A]"><Mail size={18} /></div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Email Support</span>
                  <span className="text-sm font-bold text-[#111827]">support@nexserve.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 rounded-2xl bg-pink-50 text-[#FF2E7A] mt-0.5"><MapPin size={18} /></div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Headquarters</span>
                  <span className="text-sm font-bold text-[#111827]">100 Feet Road, Indiranagar, Bengaluru</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7">
          <div className="p-8 md:p-10 rounded-[32px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-[#111827]">Send a Direct Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-12 px-4 rounded-2xl bg-white border border-[#ECECEC] text-xs text-[#111827] focus:outline-none focus:border-[#FF2E7A]"
                    placeholder="Ananya Rao"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-12 px-4 rounded-2xl bg-white border border-[#ECECEC] text-xs text-[#111827] focus:outline-none focus:border-[#FF2E7A]"
                    placeholder="ananya@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full h-12 px-4 rounded-2xl bg-white border border-[#ECECEC] text-xs text-[#111827] focus:outline-none focus:border-[#FF2E7A]"
                  placeholder="Query regarding Hydra-Facial booking"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 rounded-2xl bg-white border border-[#ECECEC] text-xs text-[#111827] focus:outline-none focus:border-[#FF2E7A]"
                  placeholder="How can we assist you?"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full h-12 rounded-2xl text-xs font-bold shadow-md shadow-[#FF2E7A]/20"
                isLoading={isSubmitting}
                leftIcon={<Send size={16} />}
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
