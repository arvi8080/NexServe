import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { validate } from "../../common/middleware/validate";
import { notificationController } from "./notification.controller";
import { notificationIdSchema } from "./notification.validation";

/**
 * @openapi
 * /api/v1/notification:
 *   get:
 *     summary: Get my notifications
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
 *   delete:
 *     summary: Delete all notifications
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications deleted successfully
 * /api/v1/notification/unread-count:
 *   get:
 *     summary: Get unread notification count
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Unread count returned successfully
 * /api/v1/notification/{id}/read:
 *   patch:
 *     summary: Mark a notification as read
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notification marked as read
 * /api/v1/notification/read-all:
 *   patch:
 *     summary: Mark all notifications as read
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read
 * /api/v1/notification/{id}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 */
const router = Router();

router.get(
  "/",
  authenticate,
  notificationController.getMyNotifications
);

router.get(
  "/unread-count",
  authenticate,
  notificationController.getUnreadCount
);

router.patch(
  "/:id/read",
  authenticate,
  validate(notificationIdSchema),
  notificationController.markAsRead
);

router.patch(
  "/read-all",
  authenticate,
  notificationController.markAllAsRead
);

router.delete(
  "/:id",
  authenticate,
  validate(notificationIdSchema),
  notificationController.deleteNotification
);

router.delete(
  "/",
  authenticate,
  notificationController.deleteAllNotifications
);

export default router;