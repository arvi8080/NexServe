import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { chatApi } from '@/api/chat';
import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/hooks/useSocket';
import { ChatMessage } from '@/types';
import { Send } from 'lucide-react';
import { formatTime } from '@/utils/formatters';
import { Loader } from '@/components/common/Loader';

export const Chat: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { user } = useAuth();
  const socket = useSocket();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bookingId) {
      chatApi
        .getMessages(bookingId)
        .then((data) => setMessages(data))
        .finally(() => setIsLoading(false));
    }
  }, [bookingId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !bookingId || !user) return;

    const content = inputText;
    setInputText('');

    const newMsg = await chatApi.sendMessage(bookingId, content, user.id);
    setMessages((prev) => [...prev, newMsg]);
    socket.sendChatMessage(bookingId, content);
  };

  if (isLoading) return <Loader message="Opening secure chat channel..." />;

  return (
    <div className="max-w-3xl mx-auto glass-panel bg-white h-[600px] flex flex-col overflow-hidden border border-slate-200 shadow-xl p-0">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Live Concierge & Partner Chat</h3>
          <p className="text-xs text-slate-500 font-medium">Booking #{bookingId}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs text-slate-700 font-bold">Online</span>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/40">
        {messages.map((msg) => {
          const isMe = msg.senderId === user?.id;

          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div
                className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl text-xs leading-relaxed font-medium shadow-xs ${
                  isMe
                    ? 'bg-pink-500 text-white rounded-br-none'
                    : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none'
                }`}
              >
                <p>{msg.content}</p>
              </div>
              <span className="text-[10px] text-slate-400 font-medium mt-1 px-1">{formatTime(msg.createdAt)}</span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-slate-100 bg-white flex items-center gap-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 h-12 px-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500"
        />
        <button type="submit" className="gradient-btn h-12 w-12 rounded-2xl text-white shrink-0 p-0">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};
