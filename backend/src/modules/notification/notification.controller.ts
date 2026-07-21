import { Request, Response, NextFunction } from "express";
import { NotificationService } from "./notification.service";

class NotificationController {

  private service =
    new NotificationService();

  async getMyNotifications(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const userId =
        req.user!.id;

      const notifications =
        await this.service.getMyNotifications(
          userId
        );

      res.status(200).json({
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

      const userId =
        req.user!.id;

      const count =
        await this.service.getUnreadCount(
          userId
        );

      res.status(200).json({
        success: true,
        data: {
          unread: count
        }
      });

    } catch (error) {
      next(error);
    }

  }

  async markAsRead(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const userId =
        req.user!.id;

      const notificationId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const notification =
        await this.service.markAsRead(
          userId,
          notificationId
        );

      res.status(200).json({
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

      const userId =
        req.user!.id;

      await this.service.markAllAsRead(
        userId
      );

      res.status(200).json({
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

      const userId =
        req.user!.id;

      const notificationId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      await this.service.deleteNotification(
        userId,
        notificationId
      );

      res.status(200).json({
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

      const userId =
        req.user!.id;

      await this.service.deleteAllNotifications(
        userId
      );

      res.status(200).json({
        success: true,
        message: "All notifications deleted"
      });

    } catch (error) {
      next(error);
    }

  }

}

export const notificationController =
  new NotificationController();