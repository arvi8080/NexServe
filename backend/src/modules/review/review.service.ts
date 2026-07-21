import { NotificationType } from "@prisma/client";
import { AppError } from "../../common/errors/AppError";
import { ReviewRepository } from "./review.repository";
import { NotificationService } from "../notification/notification.service";

export class ReviewService {

  private repository =
    new ReviewRepository();

  private notificationService =
    new NotificationService();

  async createReview(
    userId: string,
    data: {
      bookingId: string;
      rating: number;
      comment?: string;
    }
  ) {

    const booking =
      await this.repository.findBookingById(
        data.bookingId
      );

    if (!booking) {
      throw new AppError(
        "Booking not found",
        404
      );
    }

    // Only booking owner can review
    if (booking.customerId !== userId) {
      throw new AppError(
        "Unauthorized",
        403
      );
    }

    // Booking must be completed
    if (booking.status !== "COMPLETED") {
      throw new AppError(
        "Review can only be added after service completion",
        400
      );
    }

    // Only one review per booking
    const existingReview =
      await this.repository.findReviewByBooking(
        booking.id
      );

    if (existingReview) {
      throw new AppError(
        "Review already submitted",
        400
      );
    }

    // Create review
    const review =
      await this.repository.createReview({
        bookingId: booking.id,
        customerId: userId,
        vendorId: booking.vendorId,
        rating: data.rating,
        comment: data.comment,
      });

    // Recalculate vendor rating
    const stats =
      await this.repository.getVendorAverage(
        booking.vendorId
      );

    await this.repository.updateVendorRating(
      booking.vendorId,
      stats._avg.rating ?? 0,
      stats._count.rating
    );

    await this.notificationService.createNotification({
      userId: booking.vendor.userId,
      title: "New Review",
      message: "You received a new review.",
      type: NotificationType.REVIEW,
    });

    return review;
  }

  async getVendorReviews(
    vendorId: string
  ) {

    return this.repository.getVendorReviews(
      vendorId
    );

  }

}