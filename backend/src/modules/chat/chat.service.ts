import { AppError } from "../../common/errors/AppError";
import { ChatRepository } from "./chat.repository";
import { BookingRepository } from "../booking/booking.repository";

export class ChatService {
  private chatRepository = new ChatRepository();
  private bookingRepository = new BookingRepository();

  async sendMessage(
    userId: string,
    bookingId: string,
    content: string
  ) {
    const booking = await this.bookingRepository.getBookingById(
      bookingId
    );

    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    if (
      booking.customerId !== userId &&
      booking.vendor.userId !== userId
    ) {
      throw new AppError("Unauthorized", 403);
    }

    return this.chatRepository.createMessage({
      bookingId,
      senderId: userId,
      content,
    });
  }

  async getMessages(userId: string, bookingId: string) {
    const booking = await this.bookingRepository.getBookingById(
      bookingId
    );

    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    if (
      booking.customerId !== userId &&
      booking.vendor.userId !== userId
    ) {
      throw new AppError("Unauthorized", 403);
    }

    return this.chatRepository.getBookingMessages(bookingId);
  }
}
