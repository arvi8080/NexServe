import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { validate, validateQuery } from "../../common/middleware/validate";
import { bookingController } from "./booking.controller";
import {
  createBookingSchema,
  updateBookingStatusSchema,
  rescheduleBookingSchema,
  bookingQuerySchema,
} from "./booking.validation";
import { asyncHandler } from "../../common/utils/asyncHandler";

/**
 * @openapi
 * /api/v1/booking:
 *   post:
 *     summary: Create a booking
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceId
 *               - bookingDate
 *               - address
 *             properties:
 *               serviceId:
 *                 type: string
 *               bookingDate:
 *                 type: string
 *                 format: date-time
 *               address:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 * /api/v1/booking/my:
 *   get:
 *     summary: Get my bookings
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, ACCEPTED, ONGOING, COMPLETED, CANCELLED]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: My bookings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 * /api/v1/booking/vendor:
 *   get:
 *     summary: Get vendor bookings
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, ACCEPTED, ONGOING, COMPLETED, CANCELLED]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vendor bookings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 * /api/v1/booking/{id}/status:
 *   patch:
 *     summary: Update booking status
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [ACCEPTED, ONGOING, COMPLETED, CANCELLED]
 *     responses:
 *       200:
 *         description: Booking status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 * /api/v1/booking/{id}/cancel:
 *   patch:
 *     summary: Cancel a booking
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 * /api/v1/booking/{id}/reschedule:
 *   patch:
 *     summary: Reschedule a booking
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookingDate
 *             properties:
 *               bookingDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Booking rescheduled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
const router = Router();

// Create Booking
router.post(
  "/",
  authenticate,
  validate(createBookingSchema),
  asyncHandler(bookingController.create)
);

// Customer Bookings
router.get(
  "/my",
  authenticate,
  validateQuery(bookingQuerySchema),
  asyncHandler(bookingController.getMyBookings)
);

// Vendor Bookings
router.get(
  "/vendor",
  authenticate,
  validateQuery(bookingQuerySchema),
  asyncHandler(bookingController.getVendorBookings)
);

// Update Booking Status
router.patch(
  "/:id/status",
  authenticate,
  validate(updateBookingStatusSchema),
  asyncHandler(bookingController.updateStatus)
);



router.patch(
    "/:id/cancel",
    authenticate,
    asyncHandler(bookingController.cancelBooking)
);


router.patch(
  "/:id/reschedule",
  authenticate,
  validate(rescheduleBookingSchema),
  asyncHandler(bookingController.reschedule)
);

// Get Booking By Id (Later)
// router.get(
//   "/:id",
//   authenticate,
//   bookingController.getBookingById
// );

export default router;
