import { Router } from "express";
import { vendorController } from "./vendor.controller";
import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/authorize.middleware";
import { validate } from "../../common/middleware/validate";
import { vendorRegisterSchema, updateVendorSchema } from "./vendor.validation";
import { asyncHandler } from "../../common/utils/asyncHandler";

/**
 * @openapi
 * /api/v1/vendor/register:
 *   get:
 *     summary: Vendor registration info endpoint
 *     tags: [Vendor]
 *     responses:
 *       200:
 *         description: Vendor registration instructions and requirements
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
 *               - zipCode
 *             properties:
 *               businessName:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vendor registered successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Vendor already registered
 */
const router = Router();

// GET info handler for GET /api/v1/vendor/register in browser/Swagger
router.get("/register", (_req, res) => {
  res.json({
    success: true,
    message: "GlowHome Vendor Business Registration API Endpoint",
    methodRequired: "POST",
    endpoint: "/api/v1/vendor/register",
    requiresAuth: "Bearer <JWT>",
    requiredFields: [
      "businessName",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
      "description"
    ],
    documentation: "/api-docs"
  });
});

// POST handler for actual vendor registration
router.post(
  "/register",
  authenticate,
  authorize("CUSTOMER", "SUPER_ADMIN"),
  validate(vendorRegisterSchema),
  asyncHandler(vendorController.register)
);

router.get(
  "/profile",
  authenticate,
  authorize("VENDOR", "SUPER_ADMIN"),
  asyncHandler(vendorController.getVendorProfile)
);

router.put(
  "/profile",
  authenticate,
  authorize("VENDOR", "SUPER_ADMIN"),
  validate(updateVendorSchema),
  asyncHandler(vendorController.updateProfile)
);

export default router;