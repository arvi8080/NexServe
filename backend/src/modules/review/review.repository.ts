import prisma from "../../config/prisma";

export class ReviewRepository {

  async findBookingById(id: string) {
    return prisma.booking.findUnique({
      where: {
        id,
      },
      include: {
        vendor: true,
      },
    });
  }

  async findReviewByBooking(bookingId: string) {
    return prisma.review.findUnique({
      where: {
        bookingId,
      },
    });
  }

  async createReview(data: {
    bookingId: string;
    customerId: string;
    vendorId: string;
    rating: number;
    comment?: string;
  }) {
    return prisma.review.create({
      data,
    });
  }

  async getVendorReviews(vendorId: string) {
    return prisma.review.findMany({
      where: {
        vendorId,
      },
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getVendorAverage(vendorId: string) {
    const result = await prisma.review.aggregate({
      where: {
        vendorId,
      },
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
    });

    return result;
  }

  async updateVendorRating(
    vendorId: string,
    averageRating: number,
    totalReviews: number
  ) {
    return prisma.vendor.update({
      where: {
        id: vendorId,
      },
      data: {
        averageRating,
        totalReviews,
      },
    });
  }
}