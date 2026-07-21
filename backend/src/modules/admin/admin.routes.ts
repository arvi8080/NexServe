import { Router } from "express";
import { adminController } from "./admin.controller";
import { authenticate } from "../../common/middleware/auth.middleware";

import { validate } from "../../common/middleware/validate";
import { updateVendorStatusSchema } from "./admin.validation";

/**
 * @openapi
 * /api/v1/admin/vendors/pending:
 *   get:
 *     summary: Get pending vendors
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending vendors retrieved successfully
 * /api/v1/admin/vendors/{vendorId}/status:
 *   patch:
 *     summary: Update vendor status
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vendor status updated successfully
 */
const router = Router();



router.get(
"/vendors/pending",
authenticate,
adminController.getPendingVendors
);



router.patch(
  "/vendors/:vendorId/status",
  authenticate,
  validate(updateVendorStatusSchema),
  adminController.updateVendorStatus
);



export default router;