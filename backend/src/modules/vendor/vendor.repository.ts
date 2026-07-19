import prisma from "../../config/prisma";

export class VendorRepository {

  async createVendor(data: {
    userId: string;
    businessName: string;
    description?: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
  }) {

    return prisma.vendor.create({
      data,
    });

  }


  async findByUserId(userId: string) {

    return prisma.vendor.findUnique({
      where: {
        userId,
      },
    });

  }

  async getVendorProfile(userId: string) {

  return prisma.vendor.findUnique({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });

}


async updateVendorProfile(
  userId: string,
  data: {
    businessName?: string;
    description?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
  }
) {

  return prisma.vendor.update({
    where: {
      userId,
    },
    data,
  });

}

}