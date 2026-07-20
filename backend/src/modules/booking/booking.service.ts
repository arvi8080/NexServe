import { AppError } from "../../common/errors/AppError";
import { BookingRepository } from "./booking.repository";
import {
 sendBookingRequest,
 sendBookingStatusUpdate
} from "../../socket/socket.events";


export class BookingService {

  private repository =
    new BookingRepository();


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


    const booking =
      await this.repository.createBooking({

        customerId,

        vendorId: service.vendorId,

        serviceId: service.id,

        bookingDate:
          new Date(data.bookingDate),

        address:
          data.address,

        notes:
          data.notes,

        totalAmount:
          service.price,

      });



    // Send real-time booking request
    sendBookingRequest(
      service.vendorId,
      booking
    );


    return booking;

  }



  async getMyBookings(customerId: string) {

    return this.repository.getCustomerBookings(
      customerId
    );

  }



  async getVendorBookings(userId: string) {

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
      vendor.id
    );

  }




  async updateBookingStatus(
  userId: string,
  bookingId: string,
  status: any
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

  // Update professional availability
  if (status === "ACCEPTED") {
    await this.repository.updateProfessionalStatus(
      vendor.id,
      "BUSY"
    );
  }

  if (
    status === "COMPLETED" ||
    status === "CANCELLED"
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


}