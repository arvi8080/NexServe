import { NotificationType } from "@prisma/client";
import { AppError } from "../../common/errors/AppError";
import { NotificationRepository } from "./notification.repository";
import prisma from "../../config/prisma";
import { getIO } from "../../socket/socket";

export class NotificationService {

  private repository =
    new NotificationRepository();

  async createNotification(data: {
    userId: string;
    title: string;
    message: string;
    type: NotificationType;
  }) {

    const user =
      await prisma.user.findUnique({
        where: {
          id: data.userId
        }
      });

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    const notification =
      await this.repository.createNotification(data);

    // Real-time notification
    const io = getIO();
    io.to(data.userId).emit(
      "NEW_NOTIFICATION",
      notification
    );

    return notification;
  }

  async getMyNotifications(
    userId: string,
    options?: {
      limit?: number;
      offset?: number;
    }
  ) {

    return this.repository.getUserNotifications(
      userId,
      options
    );

  }

  async getUnreadCount(
    userId: string
  ) {

    return this.repository.getUnreadCount(
      userId
    );

  }

  async markAsRead(
    userId: string,
    notificationId: string
  ) {

    const notification =
      await this.repository.findNotificationById(
        notificationId
      );

    if (!notification) {
      throw new AppError(
        "Notification not found",
        404
      );
    }

    if (notification.userId !== userId) {
      throw new AppError(
        "Unauthorized",
        403
      );
    }

    return this.repository.markAsRead(
      notificationId
    );

  }

  async markAllAsRead(
    userId: string
  ) {

    return this.repository.markAllAsRead(
      userId
    );

  }

  async deleteNotification(
    userId: string,
    notificationId: string
  ) {

    const notification =
      await this.repository.findNotificationById(
        notificationId
      );

    if (!notification) {
      throw new AppError(
        "Notification not found",
        404
      );
    }

    if (notification.userId !== userId) {
      throw new AppError(
        "Unauthorized",
        403
      );
    }

    return this.repository.deleteNotification(
      notificationId
    );

  }

  async deleteAllNotifications(
    userId: string
  ) {

    return this.repository.deleteAllNotifications(
      userId
    );

  }

}