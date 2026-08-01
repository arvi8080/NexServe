import React, { useState, useEffect } from 'react';
import { HelpCircle, Mail, Phone, MessageSquare, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, Plus, Clock } from 'lucide-react';
import { customerApi, SupportTicket } from '@/api/customer.api';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { Loader } from '@/components/common/Loader';

export const Support: React.FC = () => {
  const { showToast } = useToast();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // New Ticket Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'BOOKING' | 'PAYMENT' | 'VENDOR' | 'TECHNICAL' | 'OTHER'>('BOOKING');
  const [description, setDescription] = useState('');

  const faqs = [
    {
      q: 'How does GlowHome guarantee 100% sealed hygiene & safety?',
      a: 'Every beautician arrives with single-use, 100% sealed mono-dose product kits that are opened right in front of you. All tools undergo double UV sterilization before dispatch.',
    },
    {
      q: 'What is the doorstep payment mechanism?',
      a: 'During the launch phase, platform payments are disabled. You pay your certified vendor directly upon job completion using Cash, PhonePe, Google Pay, Paytm, eSewa, or Khalti.',
    },
    {
      q: 'Can I reschedule or cancel my appointment?',
      a: 'Yes! You can reschedule or cancel your appointment free of charge up to 2 hours prior to the scheduled slot via the My Bookings portal.',
    },
    {
      q: 'What if I am unsatisfied with a service experience?',
      a: 'We offer a 100% Satisfaction Guarantee. Raise a ticket on this portal or call support, and we will send a senior supervisor for a free touch-up or resolution.',
    },
  ];

  useEffect(() => {
    customerApi.getSupportTickets()
      .then((data) => setTickets(data))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      showToast('Validation Error', 'Please complete all ticket details.', 'error');
      return;
    }

    const newTkt = await customerApi.createSupportTicket({ subject, category, description });
    setTickets((prev) => [newTkt, ...prev]);
    setIsModalOpen(false);
    setSubject('');
    setDescription('');
    showToast('Support Ticket Raised!', `Ticket #${newTkt.ticketNumber} created. Our team will respond within 15 minutes.`, 'success');
  };

  if (isLoading) return <Loader message="Connecting to GlowHome Priority Help Desk..." />;

  return (
    <div className="space-y-8 pb-20 bg-[#FFFDFE] text-[#111827]">
      {/* Header Banner */}
      <div className="p-8 md:p-10 rounded-[36px] bg-gradient-to-br from-slate-900 via-[#111827] to-blue-950 text-white shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-extrabold font-mono uppercase tracking-wider">
              24/7 CUSTOMER SUPPORT & SAFETY DESK
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">How Can We Help You Today?</h1>
            <p className="text-xs text-slate-300 font-medium max-w-xl">
              Our dedicated customer concierge team is available 24/7 to assist with doorstep appointments, payments, and safety.
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            leftIcon={<Plus size={16} />}
            className="h-12 px-6 rounded-2xl text-xs font-bold shadow-xl shrink-0"
          >
            + Raise Support Ticket
          </Button>
        </div>

        {/* Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs font-bold">
          <div className="p-4 rounded-2xl bg-white/10 flex items-center gap-3 backdrop-blur-md">
            <Mail size={18} className="text-pink-400" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Email Desk</span>
              <span>glowhome.help@gmail.com</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 flex items-center gap-3 backdrop-blur-md">
            <Phone size={18} className="text-emerald-400" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Hotline Support</span>
              <span>+91 1800 200 8899</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 flex items-center gap-3 backdrop-blur-md">
            <MessageSquare size={18} className="text-amber-400" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Live Chat Concierge</span>
              <span>Active 24/7 Response</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket History */}
      <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
        <h3 className="text-base font-extrabold text-[#111827] border-b border-[#ECECEC] pb-4">
          My Support Complaints & Tickets
        </h3>

        {tickets.length === 0 ? (
          <div className="text-center py-8 space-y-2">
            <CheckCircle2 size={32} className="text-emerald-500 mx-auto" />
            <h4 className="text-sm font-bold text-[#111827]">No Open Complaint Tickets</h4>
            <p className="text-xs text-slate-500 font-medium">All your previous tickets have been resolved smoothly.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((tkt) => (
              <div key={tkt.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-extrabold font-mono">
                      {tkt.ticketNumber}
                    </span>
                    <h4 className="text-sm font-bold text-[#111827]">{tkt.subject}</h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200">
                    {tkt.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{tkt.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAQ Accordion */}
      <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
        <h3 className="text-base font-extrabold text-[#111827] border-b border-[#ECECEC] pb-4">
          Frequently Asked Questions (FAQ)
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left text-xs font-bold text-[#111827] flex items-center justify-between cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={16} className="text-[#FF2E7E]" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-200/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Raise Ticket Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Raise Priority Support Ticket">
          <form onSubmit={handleCreateTicket} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Ticket Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of your enquiry..."
                className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Issue Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
              >
                <option value="BOOKING">Booking Appointment</option>
                <option value="PAYMENT">Direct Vendor Payment</option>
                <option value="VENDOR">Vendor Conduct / Hygiene</option>
                <option value="TECHNICAL">App / Portal Issue</option>
                <option value="OTHER">Other Enquiry</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Detailed Description</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what happened..."
                className="w-full p-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-medium text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full h-12 rounded-2xl text-xs font-bold shadow-xl">
              Submit Ticket
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
};
