import prisma from "../../config/prisma";
import { BookingStatus } from "@prisma/client";

export class CustomerService {
  async getDashboardStats(customerId: string) {
    const [bookings, reviews, wishlistCount, notifications] =
      await Promise.all([
        prisma.booking.findMany({
          where: { customerId },
          orderBy: { bookingDate: "desc" },
          include: {
            service: true,
            vendor: {
              select: {
                id: true,
                businessName: true,
                city: true,
                state: true,
                phone: true,
              },
            },
          },
        }),
        prisma.review.count({ where: { customerId } }),
        prisma.service.count({ where: { isActive: true } }),
        prisma.notification.count({
          where: { userId: customerId, isRead: false },
        }),
      ]);

    const upcomingBookings = bookings.filter((b) => {
      return (
        (b.status === "PENDING" || b.status === "ACCEPTED") &&
        b.bookingDate.getTime() > Date.now()
      );
    });

    const activeBookingsCount = bookings.filter((b) =>
      ["PENDING", "ACCEPTED", "ONGOING"].includes(b.status)
    ).length;

    const completedBookingsCount = bookings.filter(
      (b) => b.status === "COMPLETED"
    ).length;

    const cancelledBookingsCount = bookings.filter(
      (b) => b.status === "CANCELLED"
    ).length;

    return {
      upcomingBookingsCount: upcomingBookings.length,
      activeBookingsCount,
      completedBookingsCount,
      cancelledBookingsCount,
      walletBalance: 0,
      wishlistCount,
      totalReviewsCount: reviews,
      unreadNotifications: notifications,
      recentActivity: bookings.slice(0, 5).map((b) => ({
        id: b.id,
        title: `Booking ${b.status.toLowerCase()}`,
        description: `${b.service?.title || "Service"} on ${b.bookingDate.toLocaleDateString()}`,
        timestamp: b.bookingDate.toISOString(),
        type: "BOOKING" as const,
        status: b.status,
      })),
      recentBookings: bookings.slice(0, 5),
    };
  }

  async getWishlist(customerId: string) {
    // No Wishlist model in schema yet. For now, return active services
    // the customer has not yet booked, as a curated recommendation list.
    const bookedServiceIds = await prisma.booking.findMany({
      where: { customerId },
      select: { serviceId: true },
    });

    const bookedIds = new Set(bookedServiceIds.map((b) => b.serviceId));

    return prisma.service.findMany({
      where: { isActive: true },
      include: {
        vendor: {
          select: {
            id: true,
            businessName: true,
            city: true,
            state: true,
            country: true,
            averageRating: true,
            totalReviews: true,
            profileImage: true,
          },
        },
      },
      take: 20,
    });
  }
}

