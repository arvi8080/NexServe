import apiClient from './client';

export interface ChatMessageItem {
  id: string;
  sender: string;
  role: string;
  avatar: string;
  text: string;
  timestamp: string;
  isSelf?: boolean;
}

export const chatApi = {
  getMessages: async (bookingId: string): Promise<ChatMessageItem[]> => {
    try {
      const response = await apiClient.get<ChatMessageItem[]>(`/chat/messages/${bookingId}`);
      return response.data;
    } catch {
      return [
        {
          id: 'm1',
          sender: 'Swati Mohan',
          role: 'BEAUTICIAN',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
          text: 'Hello Arvind! I am on my way to your doorstep. ETA is 12 minutes.',
          timestamp: '10:02 AM',
        },
      ];
    }
  },

  sendMessage: async (bookingId: string, text: string): Promise<ChatMessageItem> => {
    try {
      const response = await apiClient.post<ChatMessageItem>('/chat/messages', { bookingId, text });
      return response.data;
    } catch {
      return {
        id: `msg_${Date.now()}`,
        sender: 'Arvind Kumar',
        role: 'CUSTOMER',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: true,
      };
    }
  },
};
