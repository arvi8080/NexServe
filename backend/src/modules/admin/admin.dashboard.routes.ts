import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { adminDashboardController } from "./admin.dashboard.controller";

/**
 * @openapi
 * /api/v1/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics returned successfully
 */
const router = Router();

router.get("/dashboard", authenticate, adminDashboardController.getStats);

export default router;
