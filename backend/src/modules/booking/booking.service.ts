import { BookingStatus, NotificationType } from "@prisma/client";
import { AppError } from "../../common/errors/AppError";
import { BookingRepository } from "./booking.repository";
import {
  sendBookingRequest,
  sendBookingStatusUpdate
} from "../../socket/socket.events";
import { NotificationService } from "../notification/notification.service";

export class BookingService {

  private repository =
    new BookingRepository();

  private notificationService =
    new NotificationService();



    


 async createBooking(
  customerId: string,
  data: {
    serviceId: string;
    bookingDate: string;
    address: string;
    notes?: string;
  }
) {

  const service =
    await this.repository.findServiceById(
      data.serviceId
    );

  if (!service) {
    throw new AppError(
      "Service not found",
      404
    );
  }

  if (!service.isActive) {
    throw new AppError(
      "Service is inactive",
      400
    );
  }

  if (service.vendor.status !== "APPROVED") {
    throw new AppError(
      "Vendor is not approved",
      400
    );
  }

  if (!service.vendor.location) {
    throw new AppError(
      "Professional location not found",
      400
    );
  }

  if (service.vendor.location.status !== "ONLINE") {
    throw new AppError(
      "Professional is currently unavailable",
      400
    );
  }
  

  // ✅ CHECK SLOT CONFLICT HERE
 const bookingTime = new Date(data.bookingDate);

if (bookingTime < new Date()) {
  throw new AppError(
    "Booking date cannot be in the past",
    400
  );
}

const activeBookings =
  await this.repository.getVendorActiveBookings(
    service.vendorId
  );

const requestedStart =
  bookingTime.getTime();

const requestedEnd =
  requestedStart +
  service.duration * 60000;

for (const existing of activeBookings) {

  const existingStart =
    existing.bookingDate.getTime();

  const existingEnd =
    existingStart +
    existing.service.duration * 60000;

  const overlaps =
    requestedStart < existingEnd &&
    requestedEnd > existingStart;

  if (overlaps) {
    throw new AppError(
      "Selected time slot overlaps with another booking",
      400
    );
  }

}

const booking =
  await this.repository.createBooking({
    customerId,
    vendorId: service.vendorId,
    serviceId: service.id,
    bookingDate: bookingTime,
    address: data.address,
    notes: data.notes,
    totalAmount: service.price,
  });

await this.notificationService.createNotification({
  userId: service.vendor.userId,
  title: "New Booking",
  message: "You have received a new booking.",
  type: NotificationType.BOOKING,
});

sendBookingRequest(
  service.vendorId,
  booking
);

return booking;

}



  async getMyBookings(
    customerId: string,
    options?: {
      status?: string;
      page?: number;
      limit?: number;
    }
  ) {

    return this.repository.getCustomerBookings(
      customerId,
      options
    );

  }



  async getVendorBookings(
    userId: string,
    options?: {
      status?: string;
      page?: number;
      limit?: number;
    }
  ) {

    const vendor =
      await this.repository.findVendorByUserId(
        userId
      );


    if (!vendor) {
      throw new AppError(
        "Vendor not found",
        404
      );
    }


    return this.repository.getVendorBookings(
      vendor.id,
      options
    );

  }




  async updateBookingStatus(
  userId: string,
  bookingId: string,
  status: BookingStatus
) {

  const vendor =
    await this.repository.findVendorByUserId(
      userId
    );

  if (!vendor) {
    throw new AppError(
      "Vendor not found",
      404
    );
  }

  const booking =
    await this.repository.getBookingById(
      bookingId
    );

  if (!booking) {
    throw new AppError(
      "Booking not found",
      404
    );
  }

  if (booking.vendorId !== vendor.id) {
    throw new AppError(
      "Unauthorized",
      403
    );
  }

  // Update booking status
  const updatedBooking =
    await this.repository.updateBookingStatus(
      bookingId,
      status
    );

  if (status === BookingStatus.ACCEPTED && booking.status !== BookingStatus.ACCEPTED) {
    await this.notificationService.createNotification({
      userId: booking.customerId,
      title: "Booking Accepted",
      message: "Your booking has been accepted.",
      type: NotificationType.BOOKING,
    });
  }

  if (status === BookingStatus.COMPLETED && booking.status !== BookingStatus.COMPLETED) {
    await this.notificationService.createNotification({
      userId: booking.customerId,
      title: "Service Completed",
      message: "Your service has been completed.",
      type: NotificationType.BOOKING,
    });
  }

  // Update professional availability
  if (status === BookingStatus.ACCEPTED) {
    await this.repository.updateProfessionalStatus(
      vendor.id,
      "BUSY"
    );
  }

  if (
    status === BookingStatus.COMPLETED ||
status === BookingStatus.CANCELLED
  ) {
    await this.repository.updateProfessionalStatus(
      vendor.id,
      "ONLINE"
    );
  }

  // Notify customer
  sendBookingStatusUpdate(
    booking.customerId,
    updatedBooking
  );

  return updatedBooking;

}



async cancelBooking(
  userId: string,
  bookingId: string
) {

  const booking =
    await this.repository.getBookingById(
      bookingId
    );

  if (!booking) {
    throw new AppError(
      "Booking not found",
      404
    );
  }

  if (booking.customerId !== userId) {
    throw new AppError(
      "Unauthorized",
      403
    );
  }

  if (
    booking.status === BookingStatus.COMPLETED ||
    booking.status === BookingStatus.CANCELLED
  ) {
    throw new AppError(
      "Booking cannot be cancelled",
      400
    );
  }

  const updatedBooking =
    await this.repository.updateBookingStatus(
      bookingId,
      BookingStatus.CANCELLED
    );

  // Professional becomes available again
  await this.repository.updateProfessionalStatus(
    booking.vendorId,
    "ONLINE"
  );

  // Notify customer
  sendBookingStatusUpdate(
    booking.customerId,
    updatedBooking
  );

  return updatedBooking;
}

async rescheduleBooking(
  userId: string,
  bookingId: string,
  bookingDate: string
) {

  const booking =
    await this.repository.getBookingById(
      bookingId
    );

  if (!booking) {
    throw new AppError(
      "Booking not found",
      404
    );
  }

  if (booking.customerId !== userId) {
    throw new AppError(
      "Unauthorized",
      403
    );
  }

  if (
    booking.status === "COMPLETED" ||
    booking.status === "CANCELLED"
  ) {
    throw new AppError(
      "Cannot reschedule this booking",
      400
    );
  }

  const newTime =
    new Date(bookingDate);

const activeBookings =
  await this.repository.getVendorActiveBookings(
    booking.vendorId
  );

const requestedStart =
  newTime.getTime();

const requestedEnd =
  requestedStart +
  booking.service.duration * 60000;

for (const existing of activeBookings) {

  if (existing.id === booking.id)
    continue;

  const existingStart =
    existing.bookingDate.getTime();

  const existingEnd =
    existingStart +
    existing.service.duration * 60000;

  const overlaps =
    requestedStart < existingEnd &&
    requestedEnd > existingStart;

  if (overlaps) {
    throw new AppError(
      "Selected time slot overlaps with another booking",
      400
    );
  }

}

return this.repository.rescheduleBooking(
  bookingId,
  newTime
);

  }
}