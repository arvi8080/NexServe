import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { validate } from "../../common/middleware/validate";
import { reviewController } from "./review.controller";
import { createReviewSchema } from "./review.validation";
import { asyncHandler } from "../../common/utils/asyncHandler";

/**
 * @openapi
 * /api/v1/review:
 *   post:
 *     summary: Create a review
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vendorId
 *               - rating
 *               - comment
 *             properties:
 *               vendorId:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 * /api/v1/review/vendor/{vendorId}:
 *   get:
 *     summary: Get reviews for a vendor
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vendor reviews retrieved successfully
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
 */
const router = Router();

// Customer adds review
router.post(
  "/",
  authenticate,
  validate(createReviewSchema),
  asyncHandler(reviewController.create)
);

// Public: Get vendor reviews
router.get(
  "/vendor/:vendorId",
  asyncHandler(reviewController.getVendorReviews)
);

export default router;

