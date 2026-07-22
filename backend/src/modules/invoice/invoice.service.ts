import { AppError } from "../../common/errors/AppError";
import { InvoiceRepository } from "./invoice.repository";
import { BookingRepository } from "../booking/booking.repository";

export class InvoiceService {
  private repository = new InvoiceRepository();
  private bookingRepository = new BookingRepository();

  async createInvoice(bookingId: string) {
    const booking = await this.bookingRepository.getBookingById(bookingId);

    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    if (booking.status !== "COMPLETED") {
      throw new AppError(
        "Invoice can only be generated for completed bookings",
        400
      );
    }

    const existing = await this.repository.findInvoiceByBookingId(
      bookingId
    );

    if (existing) {
      return existing;
    }

    const subtotal = booking.totalAmount;
    const tax = Number((subtotal * 0.05).toFixed(2));
    const total = Number((subtotal + tax).toFixed(2));
    const invoiceNumber = `INV-${Date.now()}`;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    return this.repository.createInvoice({
      bookingId,
      invoiceNumber,
      dueDate,
      subtotal,
      tax,
      total,
      details: `Invoice for booking ${booking.id}`,
    });
  }

  async getInvoice(bookingId: string) {
    const invoice = await this.repository.findInvoiceByBookingId(
      bookingId
    );

    if (!invoice) {
      throw new AppError("Invoice not found", 404);
    }

    return invoice;
  }

  async getAllInvoices(options?: {
    page?: number;
    limit?: number;
  }) {
    return this.repository.getInvoices(options);
  }
}
