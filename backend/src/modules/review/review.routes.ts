import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { validate } from "../../common/middleware/validate";
import { reviewController } from "./review.controller";
import { createReviewSchema } from "./review.validation";

/**
 * @openapi
 * /api/v1/review:
 *   post:
 *     summary: Create a review
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Review created successfully
 * /api/v1/review/vendor/{vendorId}:
 *   get:
 *     summary: Get reviews for a vendor
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: Vendor reviews retrieved successfully
 */
const router = Router();

// Customer adds review
router.post(
  "/",
  authenticate,
  validate(createReviewSchema),
  reviewController.create
);

// Public: Get vendor reviews
router.get(
  "/vendor/:vendorId",
  reviewController.getVendorReviews
);

export default router;