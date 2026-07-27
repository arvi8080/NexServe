import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Info, Sparkles, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  message?: string;
  type: ToastType;
}

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, description?: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, title, description, message: description, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Bottom-Right Floating Glass Toast Notification Stack */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto p-4 rounded-2xl bg-white/98 backdrop-blur-2xl border border-pink-200 shadow-2xl shadow-[#FF2E7E]/15 flex items-start gap-3 relative overflow-hidden"
            >
              {/* Icon */}
              <div className="p-2 rounded-xl bg-pink-50 text-[#FF2E7E] shrink-0 mt-0.5">
                {t.type === 'success' ? (
                  <Sparkles size={18} />
                ) : t.type === 'error' ? (
                  <XCircle size={18} className="text-rose-500" />
                ) : t.type === 'warning' ? (
                  <AlertTriangle size={18} className="text-amber-500" />
                ) : (
                  <Info size={18} className="text-blue-500" />
                )}
              </div>

              {/* Message Content */}
              <div className="space-y-0.5 flex-1 pr-4">
                <h4 className="text-xs font-bold text-[#111827] flex items-center gap-1.5">
                  <span>🩷 {t.title}</span>
                </h4>
                {(t.description || t.message) && (
                  <p className="text-[11px] text-[#64748B] font-medium leading-relaxed">{t.description || t.message}</p>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => removeToast(t.id)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X size={14} />
              </button>

              {/* Bottom Pink Glow Accent Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8]" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
