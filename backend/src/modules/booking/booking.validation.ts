import { z } from "zod";

export const createBookingSchema = z.object({
  serviceId: z.string().min(1),

  bookingDate: z.string().datetime(),

  address: z.string().min(5),

  notes: z.string().optional(),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum([
    "ACCEPTED",
    "ONGOING",
    "COMPLETED",
    "CANCELLED",
  ]),
});

export const rescheduleBookingSchema = z.object({
  bookingDate: z.string().datetime()
});