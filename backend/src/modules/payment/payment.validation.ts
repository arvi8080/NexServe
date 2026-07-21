import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    bookingId: z.string().cuid("Invalid booking id"),
  }),
});

export const verifyPaymentSchema = z.object({
  body: z.object({
    razorpay_order_id: z.string().min(1),
    razorpay_payment_id: z.string().min(1),
    razorpay_signature: z.string().min(1),
  }),
});

export const refundPaymentSchema = z.object({
  body: z.object({
    paymentId: z.string().cuid("Invalid payment id"),
  }),
});

export const getPaymentSchema = z.object({
  params: z.object({
    bookingId: z.string().cuid("Invalid booking id"),
  }),
});