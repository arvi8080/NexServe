import apiClient from './client';

export interface AvailabilitySlot {
  slotTime: string;
  isBooked: boolean;
}

export interface VendorScheduleDay {
  day: string;
  active: boolean;
  start: string;
  end: string;
}

export const availabilityApi = {
  getSlots: async (serviceId: string, date: string): Promise<AvailabilitySlot[]> => {
    try {
      const response = await apiClient.get<AvailabilitySlot[]>('/availability/slots', {
        params: { serviceId, date },
      });
      return response.data;
    } catch {
      return [
        { slotTime: '10:00 AM', isBooked: false },
        { slotTime: '12:30 PM', isBooked: true },
        { slotTime: '02:00 PM', isBooked: false },
        { slotTime: '04:30 PM', isBooked: false },
        { slotTime: '06:00 PM', isBooked: false },
      ];
    }
  },

  updateSchedule: async (weeklySchedule: VendorScheduleDay[], serviceRadiusKm: number): Promise<boolean> => {
    await apiClient.post('/availability', { weeklySchedule, serviceRadiusKm });
    return true;
  },

  toggleHolidayMode: async (isVacationMode: boolean, vacationReason?: string): Promise<boolean> => {
    await apiClient.post('/availability/holiday-mode', { isVacationMode, vacationReason });
    return true;
  },
};
