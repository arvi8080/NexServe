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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dayOfWeek
 *               - startTime
 *               - endTime
 *             properties:
 *               dayOfWeek:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 6
 *                 description: 0=Sunday, 6=Saturday
 *               startTime:
 *                 type: string
 *                 format: time
 *               endTime:
 *                 type: string
 *                 format: time
 *               isAvailable:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Availability saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *   get:
 *     summary: Get all availability records
 *     tags: [Availability]
 *     responses:
 *       200:
 *         description: Availability records retrieved successfully
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
 * /api/v1/availability/{vendorId}:
 *   get:
 *     summary: Get availability by vendor ID
 *     tags: [Availability]
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vendor availability retrieved successfully
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

router.patch(
  "/",
  authenticate,
  validate(createAvailabilitySchema),
  availabilityController.upsert
);

router.get("/", availabilityController.getAll);
router.get("/:vendorId", availabilityController.getByVendor);

export default router;
