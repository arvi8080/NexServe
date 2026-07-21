import { Request, Response } from "express";
import { BookingService } from "./booking.service";


const bookingService = new BookingService();

export class BookingController {

  async create(
    req: Request,
    res: Response
  ) {

    const booking =
      await bookingService.createBooking(
        req.user!.id,
        req.body
      );

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });

  }

  async getMyBookings(
  req: Request,
  res: Response
) {

  const bookings =
    await bookingService.getMyBookings(
      req.user!.id
    );

  return res.status(200).json({
    success: true,
    data: bookings,
  });

}

async getVendorBookings(
  req: Request,
  res: Response
) {

  const bookings =
    await bookingService.getVendorBookings(
      req.user!.id
    );

  return res.status(200).json({
    success: true,
    data: bookings,
  });

}


async updateStatus(
  req: Request<{ id: string }>,
  res: Response
) {

  const booking =
    await bookingService.updateBookingStatus(
      req.user!.id,
      req.params.id,
      req.body.status
    );

  return res.status(200).json({
    success: true,
    message: "Booking status updated",
    data: booking,
  });

}


async cancelBooking(req: Request<{ id: string }>, res: Response) {

    const booking =
        await bookingService.cancelBooking(
            req.user!.id,
            req.params.id
        );

    return res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
        data: booking,
    });

}

async reschedule(
  req: Request<{ id: string }>,
  res: Response
) {

  const booking =
    await bookingService.rescheduleBooking(
      req.user!.id,
      req.params.id,
      req.body.bookingDate
    );

  res.json({
    success: true,
    data: booking
  });

}

}

export const bookingController =
  new BookingController();