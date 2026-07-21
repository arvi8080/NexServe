import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { validate } from "../../common/middleware/validate";
import { vendorController } from "./vendor.controller";
import { 
  vendorRegisterSchema,
  updateVendorSchema
} from "./vendor.validation";


/**
 * @openapi
 * /api/v1/vendor/register:
 *   post:
 *     summary: Register as a vendor
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Vendor registered successfully
 * /api/v1/vendor/profile:
 *   get:
 *     summary: Get vendor profile
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vendor profile returned successfully
 *   put:
 *     summary: Update vendor profile
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vendor profile updated successfully
 */
const router = Router();

router.post(
  "/register",
  authenticate,
  validate(vendorRegisterSchema),
  vendorController.register
);

router.get(
  "/profile",
  authenticate,
  vendorController.getVendorProfile
);


router.put(
  "/profile",
  authenticate,
  validate(updateVendorSchema),
  vendorController.updateProfile
);

export default router;