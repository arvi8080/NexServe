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


    const updatedBooking =
 await this.repository.updateBookingStatus(
   bookingId,
   status
 );


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
      booking.status === "ONGOING" ||
      booking.status === "COMPLETED"
    ) {

      throw new AppError(
        "Booking cannot be cancelled",
        400
      );

    }



    if (booking.status === "CANCELLED") {

      throw new AppError(
        "Booking already cancelled",
        400
      );

    }



    return this.repository.updateBookingStatus(
      bookingId,
      "CANCELLED"
    );

  }


}