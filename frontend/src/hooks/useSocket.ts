import { useEffect } from 'react';
import { socketService } from '@/services/socketService';
import { useAuth } from '@/context/AuthContext';

export const useSocket = () => {
  const { token } = useAuth();

  useEffect(() => {
    socketService.connect(token || undefined);
    return () => {
      // Keep socket alive during page transitions
    };
  }, [token]);

  return socketService;
};
