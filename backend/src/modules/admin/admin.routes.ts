import { Router } from "express";
import { adminController } from "./admin.controller";
import { authenticate } from "../../common/middleware/auth.middleware";

import { validate, validateQuery } from "../../common/middleware/validate";
import { updateVendorStatusSchema, pendingVendorsQuerySchema } from "./admin.validation";
import { asyncHandler } from "../../common/utils/asyncHandler";

/**
 * @openapi
 * /api/v1/admin/vendors/pending:
 *   get:
 *     summary: Get pending vendors
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pending vendors retrieved successfully
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
 * /api/v1/admin/vendors/{vendorId}/status:
 *   patch:
 *     summary: Update vendor status
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vendorId
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
 *                 enum: [PENDING, APPROVED, REJECTED, BLOCKED]
 *               rejectionReason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vendor status updated successfully
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



router.get(
"/vendors/pending",
authenticate,
validateQuery(pendingVendorsQuerySchema),
asyncHandler(adminController.getPendingVendors)
);



router.patch(
  "/vendors/:vendorId/status",
  authenticate,
  validate(updateVendorStatusSchema),
  asyncHandler(adminController.updateVendorStatus)
);



export default router;
