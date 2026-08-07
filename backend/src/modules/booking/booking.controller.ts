import { Request, Response } from "express";
import { BookingService } from "./booking.service";

const bookingService = new BookingService();

export class BookingController {
  async create(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in first.",
      });
    }

    const booking = await bookingService.createBooking(userId, req.body);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  }

  async getMyBookings(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(200).json({
          success: true,
          data: [],
        });
      }

      const { status, page, limit } = req.query as any;

      const bookings = await bookingService.getMyBookings(userId, {
        status,
        page,
        limit,
      });

      return res.status(200).json({
        success: true,
        data: bookings || [],
      });
    } catch (error) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }
  }

  async getVendorBookings(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(200).json({
          success: true,
          data: [],
        });
      }

      const { status, page, limit } = req.query as any;

      const bookings = await bookingService.getVendorBookings(userId, {
        status,
        page,
        limit,
      });

      return res.status(200).json({
        success: true,
        data: bookings || [],
      });
    } catch (error) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }
  }

  async updateStatus(req: Request<{ id: string }>, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const booking = await bookingService.updateBookingStatus(
      userId,
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
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const booking = await bookingService.cancelBooking(userId, req.params.id);

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });
  }

  async reschedule(req: Request<{ id: string }>, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const booking = await bookingService.rescheduleBooking(
      userId,
      req.params.id,
      req.body.bookingDate
    );

    return res.json({
      success: true,
      data: booking,
    });
  }
}

export const bookingController = new BookingController();