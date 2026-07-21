import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { validate } from "../../common/middleware/validate";
import { availabilityController } from "./availability.controller";
import { createAvailabilitySchema, updateAvailabilitySchema } from "./availability.validation";

/**
 * @openapi
 * /api/v1/availability:
 *   patch:
 *     summary: Create or update vendor availability
 *     tags: [Availability]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Availability saved successfully
 *   get:
 *     summary: Get all availability records
 *     tags: [Availability]
 *     responses:
 *       200:
 *         description: Availability records retrieved successfully
 * /api/v1/availability/{vendorId}:
 *   get:
 *     summary: Get availability by vendor ID
 *     tags: [Availability]
 *     responses:
 *       200:
 *         description: Vendor availability retrieved successfully
 */
const router = Router();

router.patch(
  "/",
  authenticate,
  validate(createAvailabilitySchema),
  availabilityController.upsert
);

router.get("/", availabilityController.getAll);
router.get("/:vendorId", availabilityController.getByVendor);

export default router;
