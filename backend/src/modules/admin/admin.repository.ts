import prisma from "../../config/prisma";


export class AdminRepository {


  async getPendingVendors(options?: {
    page?: number;
    limit?: number;
    search?: string;
  }) {

    const where: any = {
      status: "PENDING",
    };

    if (options?.search) {
      where.OR = [
        {
          businessName: {
            contains: options.search,
            mode: "insensitive",
          },
        },
        {
          user: {
            OR: [
              { firstName: { contains: options.search, mode: "insensitive" } },
              { lastName: { contains: options.search, mode: "insensitive" } },
              { email: { contains: options.search, mode: "insensitive" } },
            ],
          },
        },
      ];
    }

    const take = options?.limit || 50;
    const skip = options?.page ? (options.page - 1) * take : 0;

    return prisma.vendor.findMany({
      where,
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
      take,
      skip,
    });

  }



  async updateVendorStatus(
    vendorId: string,
    status: "APPROVED" | "REJECTED"
  ) {

    return prisma.vendor.update({
      where: {
        id: vendorId,
      },
      data: {
        status,
      },
    });

  }


}