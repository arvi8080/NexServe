import { useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

/**
 * Automatically logs out user after 15 minutes of inactivity.
 */
export function useInactivityLogout(inactivityTimeoutMs: number = 15 * 60 * 1000) {
  const { isAuthenticated, logout } = useAuth();
  const { showToast } = useToast();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isAuthenticated) {
      timerRef.current = setTimeout(() => {
        logout();
        showToast('Session Expired', 'You were logged out due to 15 minutes of inactivity for security.', 'info');
      }, inactivityTimeoutMs);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const events = ['mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach((evt) => window.addEventListener(evt, resetTimer));

    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((evt) => window.removeEventListener(evt, resetTimer));
    };
  }, [isAuthenticated]);
}
