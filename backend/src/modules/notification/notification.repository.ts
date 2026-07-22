import prisma from "../../config/prisma";
import { NotificationType } from "@prisma/client";

export class NotificationRepository {

  async createNotification(data: {
    userId: string;
    title: string;
    message: string;
    type: NotificationType;
  }) {
    return prisma.notification.create({
      data,
    });
  }

  async getUserNotifications(
    userId: string,
    options?: {
      limit?: number;
      offset?: number;
    }
  ) {
    return prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
    });
  }

  async getUnreadCount(userId: string) {
    return prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }

  async findNotificationById(id: string) {
    return prisma.notification.findUnique({
      where: {
        id,
      },
    });
  }

  async markAsRead(id: string) {
    return prisma.notification.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    });
  }

  async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  }

  async deleteNotification(id: string) {
    return prisma.notification.delete({
      where: {
        id,
      },
    });
  }

  async deleteAllNotifications(userId: string) {
    return prisma.notification.deleteMany({
      where: {
        userId,
      },
    });
  }

}