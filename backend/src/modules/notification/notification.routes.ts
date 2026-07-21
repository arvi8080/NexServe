import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { validate } from "../../common/middleware/validate";
import { notificationController } from "./notification.controller";
import { notificationIdSchema } from "./notification.validation";

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