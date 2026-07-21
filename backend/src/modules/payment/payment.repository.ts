import { PrismaClient, PaymentStatus } from "@prisma/client";

const prisma = new PrismaClient();

export class PaymentRepository {

  async createPayment(data: {
    bookingId: string;
    amount: number;
    razorpayOrderId: string;
  }) {

    return prisma.payment.create({
      data: {
        bookingId: data.bookingId,
        amount: data.amount,
        razorpayOrderId: data.razorpayOrderId,
        status: PaymentStatus.PENDING,
      },
    });

  }

  async findPaymentByBookingId(
    bookingId: string
  ) {

    return prisma.payment.findUnique({
      where: {
        bookingId,
      },
      include: {
        booking: true,
      },
    });

  }

  async findPaymentByOrderId(
    razorpayOrderId: string
  ) {

    return prisma.payment.findFirst({
      where: {
        razorpayOrderId,
      },
    });

  }

  async findPaymentByPaymentId(
    razorpayPaymentId: string
  ) {

    return prisma.payment.findFirst({
      where: {
        razorpayPaymentId,
      },
    });

  }

  async updatePaymentSuccess(
    paymentId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ) {

    return prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        razorpayPaymentId,
        razorpaySignature,
        status: PaymentStatus.SUCCESS,
      },
    });

  }

  async updatePaymentFailed(
    paymentId: string
  ) {

    return prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        status: PaymentStatus.FAILED,
      },
    });

  }

  async refundPayment(
    paymentId: string
  ) {

    return prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        status: PaymentStatus.REFUNDED,
      },
    });

  }

  async getPaymentById(
    paymentId: string
  ) {

    return prisma.payment.findUnique({
      where: {
        id: paymentId,
      },
      include: {
        booking: true,
      },
    });

  }

}