import { axiosInstance } from './axiosInstance';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { ChatMessage } from '@/types';
import { MOCK_CHAT_MESSAGES, MOCK_USERS } from '@/services/mockDataService';

export const chatApi = {
  getMessages: async (bookingId: string): Promise<ChatMessage[]> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.CHAT.MESSAGES(bookingId));
      return response.data;
    } catch {
      return MOCK_CHAT_MESSAGES[bookingId] || [];
    }
  },

  sendMessage: async (bookingId: string, content: string, senderId: string): Promise<ChatMessage> => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.CHAT.MESSAGES(bookingId), { content });
      return response.data;
    } catch {
      const newMsg: ChatMessage = {
        id: `chat_${Date.now()}`,
        bookingId,
        senderId,
        content,
        sender: MOCK_USERS.find((u) => u.id === senderId) || MOCK_USERS[0],
        createdAt: new Date().toISOString(),
      };
      if (!MOCK_CHAT_MESSAGES[bookingId]) {
        MOCK_CHAT_MESSAGES[bookingId] = [];
      }
      MOCK_CHAT_MESSAGES[bookingId].push(newMsg);
      return newMsg;
    }
  },
};
