import React, { useState } from 'react';
import { Send, Paperclip, Hash, Lock, Users, Sparkles, CheckCheck, Smile, ShieldCheck, Phone, Video } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

interface ChatMessage {
  id: string;
  sender: string;
  role: string;
  avatar: string;
  text: string;
  timestamp: string;
  attachment?: string;
  isSelf?: boolean;
}

export const InternalTeamChat: React.FC = () => {
  const { showToast } = useToast();
  const [activeChannel, setActiveChannel] = useState<string>('general-ops');
  const [inputText, setInputText] = useState('');

  const channels = [
    { id: 'general-ops', name: 'general-ops', desc: 'Operations & City Managers', unread: 2 },
    { id: 'finance-payouts', name: 'finance-payouts', desc: 'Weekly Partner Payout Approvals', unread: 0 },
    { id: 'support-escalations', name: 'support-escalations', desc: 'Priority 24/7 Customer Complaints', unread: 1 },
    { id: 'city-managers-mumbai', name: 'city-mumbai', desc: 'Mumbai Branch Operations', unread: 0 },
    { id: 'executive-lounge', name: 'executive-lounge', desc: 'Super Admin & C-Suite', private: true, unread: 0 },
  ];

  const teamRoster = [
    { name: 'Swati Mohan', role: 'Super Admin', status: 'online', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80' },
    { name: 'Rohan Sharma', role: 'City Manager (Mumbai)', status: 'online', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80' },
    { name: 'Kavita Nair', role: 'Finance Lead', status: 'online', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80' },
    { name: 'Amit Verma', role: 'Support Lead', status: 'away', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'Kavita Nair',
      role: 'FINANCE LEAD',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      text: 'Weekly partner payout batch of ₹12,40,000 processed for 128 verified salons. All GSTR-1 ledgers synced.',
      timestamp: '11:14 AM',
    },
    {
      id: 'm2',
      sender: 'Rohan Sharma',
      role: 'CITY MANAGER',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
      text: 'Awesome! Mumbai Indiranagar branch completed 42 doorstep sessions today with 100% single-use sachet compliance.',
      timestamp: '11:18 AM',
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'Swati Mohan',
      role: 'SUPER ADMIN',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    showToast('Message Sent!', `Broadcast to #${activeChannel}`, 'success');
  };

  return (
    <div className="p-8 rounded-[32px] bg-white border border-[#ECECEC] shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-pink-50 text-[#FF2E7E]">
            <Users size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#111827]">Internal Team Chat & Broadcast Hub</h3>
            <p className="text-xs text-[#64748B]">Slack / Linear standard real-time communication engine</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>4 TEAM LEADS ONLINE</span>
          </span>
        </div>
      </div>

      {/* Main Chat Layout: Channels (3 Cols), Message Stream (6 Cols), Team Roster (3 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[520px]">
        {/* Left Sidebar: Channels List (3 Cols) */}
        <div className="lg:col-span-3 p-4 rounded-3xl bg-slate-50 border border-slate-100 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block px-2">Team Channels</span>
            {channels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(ch.id)}
                className={`w-full p-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                  activeChannel === ch.id
                    ? 'bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {ch.private ? <Lock size={14} /> : <Hash size={14} />}
                  <span className="truncate">{ch.name}</span>
                </div>
                {ch.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-white text-[#FF2E7E] text-[10px] font-extrabold flex items-center justify-center">
                    {ch.unread}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-white border border-[#ECECEC] text-[11px] text-[#64748B]">
            <span className="font-bold text-[#111827] block">Channel Focus:</span>
            <p className="truncate">{channels.find((c) => c.id === activeChannel)?.desc}</p>
          </div>
        </div>

        {/* Center: Real-time Message Stream (6 Cols) */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div className="flex items-center gap-2">
              <Hash size={18} className="text-[#FF2E7E]" />
              <h4 className="text-sm font-bold text-[#111827]">#{activeChannel}</h4>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <button className="p-1 hover:text-slate-700"><Phone size={16} /></button>
              <button className="p-1 hover:text-slate-700"><Video size={16} /></button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {messages.map((m) => (
              <div key={m.id} className={`flex items-start gap-3 ${m.isSelf ? 'flex-row-reverse' : ''}`}>
                <img src={m.avatar} alt={m.sender} className="w-9 h-9 rounded-full object-cover border border-pink-200 shrink-0" />
                <div className={`space-y-1 max-w-[80%] ${m.isSelf ? 'text-right' : ''}`}>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                    <span>{m.sender}</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-pink-100 text-[#FF2E7E] text-[9px] font-extrabold">
                      {m.role}
                    </span>
                    <span>{m.timestamp}</span>
                  </div>
                  <div
                    className={`p-3.5 rounded-2xl text-xs font-medium leading-relaxed shadow-xs ${
                      m.isSelf
                        ? 'bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white rounded-tr-xs'
                        : 'bg-white text-[#111827] border border-[#ECECEC] rounded-tl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-slate-200/80">
            <button type="button" className="p-2.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200">
              <Paperclip size={18} />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message #${activeChannel}...`}
              className="flex-1 h-11 px-4 rounded-2xl bg-white border border-[#ECECEC] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#FF2E7E]"
            />
            <button type="submit" className="gradient-btn h-11 px-5 rounded-2xl text-xs font-bold shrink-0 cursor-pointer">
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* Right Sidebar: Online Team Roster (3 Cols) */}
        <div className="lg:col-span-3 p-4 rounded-3xl bg-slate-50 border border-slate-100 space-y-4">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block px-2">Online Team Roster</span>
          <div className="space-y-3">
            {teamRoster.map((t, i) => (
              <div key={i} className="p-2.5 rounded-2xl bg-white border border-[#ECECEC] flex items-center gap-3">
                <div className="relative">
                  <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover border border-pink-200" />
                  <span
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-white ${
                      t.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                </div>
                <div className="truncate">
                  <h5 className="text-xs font-bold text-[#111827] truncate">{t.name}</h5>
                  <span className="text-[10px] text-slate-400 block truncate">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
