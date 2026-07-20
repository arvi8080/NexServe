import prisma from "../../config/prisma";


export class AdminRepository {


  async getPendingVendors() {

    return prisma.vendor.findMany({
      where: {
        status: "PENDING",
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