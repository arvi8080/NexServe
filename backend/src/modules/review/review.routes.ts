import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { validate } from "../../common/middleware/validate";
import { reviewController } from "./review.controller";
import { createReviewSchema } from "./review.validation";

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