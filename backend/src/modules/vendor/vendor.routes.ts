import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { validate } from "../../common/middleware/validate";
import { vendorController } from "./vendor.controller";
import { 
  vendorRegisterSchema,
  updateVendorSchema
} from "./vendor.validation";
import { asyncHandler } from "../../common/utils/asyncHandler";


/**
 * @openapi
 * /api/v1/vendor/register:
 *   post:
 *     summary: Register as a vendor
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - businessName
 *               - phone
 *               - address
 *               - city
 *               - state
 *               - country
 *             properties:
 *               businessName:
 *                 type: string
 *                 minLength: 3
 *                 example: Glow Beauty Salon
 *               description:
 *                 type: string
 *                 example: Professional beauty services
 *               phone:
 *                 type: string
 *                 minLength: 10
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 minLength: 5
 *                 example: MG Road
 *               city:
 *                 type: string
 *                 minLength: 2
 *                 example: Mumbai
 *               state:
 *                 type: string
 *                 minLength: 2
 *                 example: Maharashtra
 *               country:
 *                 type: string
 *                 minLength: 2
 *                 example: India
 *     responses:
 *       201:
 *         description: Vendor registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid request payload
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Vendor already registered
 * /api/v1/vendor/profile:
 *   get:
 *     summary: Get vendor profile
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vendor profile returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *   put:
 *     summary: Update vendor profile
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessName:
 *                 type: string
 *                 minLength: 3
 *               description:
 *                 type: string
 *               phone:
 *                 type: string
 *                 minLength: 10
 *               address:
 *                 type: string
 *                 minLength: 5
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vendor profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 */
const router = Router();

router.post(
  "/register",
  authenticate,
  validate(vendorRegisterSchema),
  asyncHandler(vendorController.register)
);

router.get(
  "/profile",
  authenticate,
  asyncHandler(vendorController.getVendorProfile)
);


router.put(
  "/profile",
  authenticate,
  validate(updateVendorSchema),
  asyncHandler(vendorController.updateProfile)
);

export default router;