import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { validate } from "../../common/middleware/validate";
import { bookingController } from "./booking.controller";
import {
  createBookingSchema,
  updateBookingStatusSchema,
} from "./booking.validation";

const router = Router();

// Create Booking
router.post(
  "/",
  authenticate,
  validate(createBookingSchema),
  bookingController.create
);

// Customer Bookings
router.get(
  "/my",
  authenticate,
  bookingController.getMyBookings
);

// Vendor Bookings
router.get(
  "/vendor",
  authenticate,
  bookingController.getVendorBookings
);

// Update Booking Status
router.patch(
  "/:id/status",
  authenticate,
  validate(updateBookingStatusSchema),
  bookingController.updateStatus
);



router.patch(
    "/:id/cancel",
    authenticate,
    bookingController.cancelBooking
);

// Get Booking By Id (Later)
// router.get(
//   "/:id",
//   authenticate,
//   bookingController.getBookingById
// );

export default router;