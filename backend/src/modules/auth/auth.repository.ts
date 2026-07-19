import prisma from "../../config/prisma";

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
  }) {
    return prisma.user.create({
      data,
    });
  }

  async createSession(data: {
    userId: string;
    refreshToken: string;
    expiresAt: Date;
  }) {
    return prisma.session.create({
      data,
    });
  }

  async updateLastLogin(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        lastLogin: new Date(),
      },
    });
  }
}