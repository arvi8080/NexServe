import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { validate } from "../../common/middleware/validate";
import { bookingController } from "./booking.controller";
import {
  createBookingSchema,
  updateBookingStatusSchema,
  rescheduleBookingSchema,
} from "./booking.validation";

/**
 * @openapi
 * /api/v1/booking:
 *   post:
 *     summary: Create a booking
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Booking created successfully
 *   get:
 *     summary: Get my bookings
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bookings retrieved successfully
 * /api/v1/booking/vendor:
 *   get:
 *     summary: Get vendor bookings
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vendor bookings retrieved successfully
 * /api/v1/booking/{id}/status:
 *   patch:
 *     summary: Update booking status
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Booking status updated successfully
 * /api/v1/booking/{id}/cancel:
 *   patch:
 *     summary: Cancel a booking
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 * /api/v1/booking/{id}/reschedule:
 *   patch:
 *     summary: Reschedule a booking
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Booking rescheduled successfully
 */
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


router.patch(
  "/:id/reschedule",
  authenticate,
  validate(rescheduleBookingSchema),
  bookingController.reschedule
);

// Get Booking By Id (Later)
// router.get(
//   "/:id",
//   authenticate,
//   bookingController.getBookingById
// );

export default router;