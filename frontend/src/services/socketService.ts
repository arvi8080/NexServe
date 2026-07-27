import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;

  connect(token?: string) {
    if (this.socket && this.socket.connected) return;

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log('[Socket] Connected with ID:', this.socket?.id);
    });

    this.socket.on('disconnect', () => {
      console.log('[Socket] Disconnected from server');
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinBookingRoom(bookingId: string) {
    if (this.socket) {
      this.socket.emit('join_room', { bookingId });
    }
  }

  leaveBookingRoom(bookingId: string) {
    if (this.socket) {
      this.socket.emit('leave_room', { bookingId });
    }
  }

  joinCustomer(customerId: string) {
    if (this.socket) {
      this.socket.emit('joinCustomer', customerId);
    }
  }

  joinVendor(vendorId: string) {
    if (this.socket) {
      this.socket.emit('joinVendor', vendorId);
    }
  }

  onNewBooking(callback: (booking: any) => void) {
    this.socket?.on('new_booking', callback);
  }

  onBookingStatusUpdate(callback: (booking: any) => void) {
    this.socket?.on('booking_status_update', callback);
  }

  onReceiveMessage(callback: (data: any) => void) {
    this.socket?.on('receive_message', callback);
  }

  sendChatMessage(bookingId: string, message: string) {
    this.socket?.emit('send_message', { bookingId, message });
  }

  onLocationUpdate(callback: (data: { latitude: number; longitude: number; vendorId: string }) => void) {
    this.socket?.on('location_updated', callback);
  }

  emitLocationUpdate(vendorId: string, latitude: number, longitude: number) {
    this.socket?.emit('update_location', { vendorId, latitude, longitude });
  }

  getSocket() {
    return this.socket;
  }
}

export const socketService = new SocketService();
