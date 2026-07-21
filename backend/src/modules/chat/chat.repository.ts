import prisma from "../../config/prisma";

export class ChatRepository {
  async createMessage(data: {
    bookingId: string;
    senderId: string;
    content: string;
  }) {
    return prisma.chatMessage.create({
      data,
    });
  }

  async getBookingMessages(bookingId: string) {
    return prisma.chatMessage.findMany({
      where: {
        bookingId,
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }
}
