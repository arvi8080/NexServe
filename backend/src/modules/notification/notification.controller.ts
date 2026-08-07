import { Request, Response, NextFunction } from "express";
import { NotificationService } from "./notification.service";

class NotificationController {
  private service = new NotificationService();

  async getMyNotifications(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access"
        });
      }

      const { limit, offset } = req.query as any;

      const notifications = await this.service.getMyNotifications(
        userId,
        { limit, offset }
      );

      return res.status(200).json({
        success: true,
        data: notifications
      });
    } catch (error) {
      next(error);
    }
  }

  async getUnreadCount(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(200).json({
          success: true,
          data: { unread: 0 }
        });
      }

      const count = await this.service.getUnreadCount(userId);

      return res.status(200).json({
        success: true,
        data: { unread: count }
      });
    } catch (error) {
      return res.status(200).json({
        success: true,
        data: { unread: 0 }
      });
    }
  }

  async markAsRead(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access"
        });
      }

      const notificationId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const notification = await this.service.markAsRead(
        userId,
        notificationId
      );

      return res.status(200).json({
        success: true,
        message: "Notification marked as read",
        data: notification
      });
    } catch (error) {
      next(error);
    }
  }

  async markAllAsRead(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access"
        });
      }

      await this.service.markAllAsRead(userId);

      return res.status(200).json({
        success: true,
        message: "All notifications marked as read"
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access"
        });
      }

      const notificationId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      await this.service.deleteNotification(
        userId,
        notificationId
      );

      return res.status(200).json({
        success: true,
        message: "Notification deleted"
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteAllNotifications(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access"
        });
      }

      await this.service.deleteAllNotifications(userId);

      return res.status(200).json({
        success: true,
        message: "All notifications deleted"
      });
    } catch (error) {
      next(error);
    }
  }
}

export const notificationController = new NotificationController();