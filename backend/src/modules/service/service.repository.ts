import prisma from "../../config/prisma";

export class ServiceRepository {

  async createService(data: {
    vendorId: string;
    title: string;
    description: string;
    category: any;
    price: number;
    duration: number;
    image?: string;
  }) {
    return prisma.service.create({
      data,
    });
  }

  async findVendorByUserId(userId: string) {
    return prisma.vendor.findUnique({
      where: {
        userId,
      },
    });
  }

  async getVendorServices(vendorId: string) {
    return prisma.service.findMany({
      where: {
        vendorId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getServiceById(id: string) {
    return prisma.service.findUnique({
      where: {
        id,
      },
    });
  }

  async updateService(id: string, data: any) {
    return prisma.service.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteService(id: string) {
    return prisma.service.delete({
      where: {
        id,
      },
    });
  }

  async getAllServices() {
    return prisma.service.findMany({
      where: {
        isActive: true,
        vendor: {
          status: "APPROVED",
        },
      },
      include: {
        vendor: {
          select: {
            id: true,
            businessName: true,
            city: true,
            state: true,
            averageRating: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  async searchServices(filters: {
  search?: string;
  category?: any;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
}) {

  const {
    search,
    category,
    city,
    minPrice,
    maxPrice,
  } = filters;


  return prisma.service.findMany({

    where: {

      isActive: true,

      vendor: {
        status: "APPROVED",

        ...(city && {
          city: {
            contains: city,
            mode: "insensitive",
          },
        }),
      },


      ...(category && {
        category,
      }),


      ...(minPrice || maxPrice
        ? {
            price: {
              ...(minPrice && {
                gte: minPrice,
              }),

              ...(maxPrice && {
                lte: maxPrice,
              }),
            },
          }
        : {}),


      ...(search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),

    },


    include: {
      vendor: {
        select: {
          id: true,
          businessName: true,
          city: true,
          averageRating: true,
        },
      },
    },


    orderBy: {
      createdAt: "desc",
    },

  });

}



  
}