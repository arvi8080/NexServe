import prisma from "../../config/prisma";

export class UserRepository {
  async findById(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        profileImage: true,
        isEmailVerified: true,
        isPhoneVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateProfile(
  userId: string,
  data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    profileImage?: string;
  }
) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      role: true,
      profileImage: true,
      updatedAt: true,
    },
  });
}

async updatePassword(
  userId: string,
  password: string
) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password,
    },
  });
}

async findUserWithPassword(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

async deleteAccount(userId: string) {
  return prisma.user.delete({
    where: {
      id: userId,
    },
  });
}
}