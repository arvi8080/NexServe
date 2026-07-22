import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { adminDashboardController } from "./admin.dashboard.controller";
import { asyncHandler } from "../../common/utils/asyncHandler";

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalUsers:
 *                       type: integer
 *                     totalVendors:
 *                       type: integer
 *                     totalBookings:
 *                       type: integer
 *                     totalRevenue:
 *                       type: number
 *                     activeServices:
 *                       type: integer
 *                     recentBookings:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           bookingDate:
 *                             type: string
 *                             format: date-time
 *                           status:
 *                             type: string
 *                           totalAmount:
 *                             type: number
 *                           customer:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                               firstName:
 *                                 type: string
 *                               lastName:
 *                                 type: string
 *                               email:
 *                                 type: string
 *                           vendor:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                               businessName:
 *                                 type: string
 *                           service:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                               title:
 *                                 type: string
 *                               category:
 *                                 type: string
 *                     pendingVendors:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           businessName:
 *                             type: string
 *                           city:
 *                             type: string
 *                           state:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           user:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                               firstName:
 *                                 type: string
 *                               lastName:
 *                                 type: string
 *                               email:
 *                                 type: string
 */
const router = Router();

router.get("/dashboard", authenticate, asyncHandler(adminDashboardController.getStats));

export default router;
