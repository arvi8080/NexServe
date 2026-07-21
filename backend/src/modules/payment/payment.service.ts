import Razorpay from "razorpay";
import crypto from "crypto";
import { PaymentStatus, NotificationType } from "@prisma/client";

import { AppError } from "../../common/errors/AppError";
import { PaymentRepository } from "./payment.repository";
import { BookingRepository } from "../booking/booking.repository";
import { NotificationService } from "../notification/notification.service";

import { env } from "../../config/env";

export class PaymentService {

  private repository =
    new PaymentRepository();

  private bookingRepository =
    new BookingRepository();

  private notificationService =
    new NotificationService();

  private razorpayClient?: Razorpay;

  private get razorpay() {
    if (!this.razorpayClient) {
      if (
        !env.RAZORPAY_KEY_ID ||
        !env.RAZORPAY_KEY_SECRET
      ) {
        throw new AppError(
          "Razorpay credentials are not configured.",
          500
        );
      }

      this.razorpayClient = new Razorpay({
        key_id: env.RAZORPAY_KEY_ID!,
        key_secret: env.RAZORPAY_KEY_SECRET!,
      });
    }

    return this.razorpayClient;
  }

  async createOrder(
    bookingId: string
  ) {

    const booking =
      await this.bookingRepository.getBookingById(
        bookingId
      );

    if (!booking) {
      throw new AppError(
        "Booking not found",
        404
      );
    }

    const existingPayment =
      await this.repository.findPaymentByBookingId(
        bookingId
      );

    if (
      existingPayment &&
      existingPayment.status ===
        PaymentStatus.SUCCESS
    ) {
      throw new AppError(
        "Booking already paid",
        400
      );
    }

    const order =
      await this.razorpay.orders.create({

        amount:
          Math.round(
            booking.totalAmount * 100
          ),

        currency: "INR",

        receipt:
          booking.id,

      });

    if (existingPayment) {

      return {
        order,
        payment: existingPayment,
      };

    }

    const payment =
      await this.repository.createPayment({

        bookingId,

        amount:
          booking.totalAmount,

        razorpayOrderId:
          order.id,

      });

    return {

      order,

      payment,

    };

  }



  // Part1: Verify Payment Signature

    async verifyPayment(data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) {

    const payment =
      await this.repository.findPaymentByOrderId(
        data.razorpay_order_id
      );

    if (!payment) {
      throw new AppError(
        "Payment not found",
        404
      );
    }

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          env.RAZORPAY_KEY_SECRET!
        )
        .update(
          `${data.razorpay_order_id}|${data.razorpay_payment_id}`
        )
        .digest("hex");

    if (
      generatedSignature !==
      data.razorpay_signature
    ) {

      await this.repository.updatePaymentFailed(
        payment.id
      );

      throw new AppError(
        "Invalid payment signature",
        400
      );

    }

    const updatedPayment =
      await this.repository.updatePaymentSuccess(

        payment.id,

        data.razorpay_payment_id,

        data.razorpay_signature

      );

    // Optional:
    // If you later add a payment status to Booking,
    // update it here.

    const booking =
      await this.bookingRepository.getBookingById(
        payment.bookingId
      );

    if (booking) {

      await this.notificationService.createNotification({

        userId:
          booking.customerId,

        title:
          "Payment Successful",

        message:
          "Your payment has been received successfully.",

        type:
          NotificationType.BOOKING

      });

    }

    return updatedPayment;

  }

  // final part
    async refundPayment(
    paymentId: string
  ) {

    const payment =
      await this.repository.getPaymentById(
        paymentId
      );

    if (!payment) {
      throw new AppError(
        "Payment not found",
        404
      );
    }

    if (
      payment.status !==
      PaymentStatus.SUCCESS
    ) {
      throw new AppError(
        "Only successful payments can be refunded",
        400
      );
    }

    await this.razorpay.payments.refund(
      payment.razorpayPaymentId!,
      {
        amount: Math.round(payment.amount * 100),
      }
    );

    return this.repository.refundPayment(
      payment.id
    );

  }



  async getPayment(
    bookingId: string
  ) {

    const payment =
      await this.repository.findPaymentByBookingId(
        bookingId
      );

    if (!payment) {

      throw new AppError(
        "Payment not found",
        404
      );

    }

    return payment;

  }

}