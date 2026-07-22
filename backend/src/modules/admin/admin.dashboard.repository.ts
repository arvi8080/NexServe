import prisma from "../../config/prisma";

export class AdminDashboardRepository {
  async getDashboardStats() {
    const totalUsers = await prisma.user.count();
    const totalVendors = await prisma.vendor.count();
    const totalBookings = await prisma.booking.count();
    const revenueResult = await prisma.booking.aggregate({
      _sum: {
        totalAmount: true,
      },
    });
    const activeServices = await prisma.service.count({
      where: {
        isActive: true,
      },
    });

    const recentBookings = await prisma.booking.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        vendor: {
          select: {
            id: true,
            businessName: true,
          },
        },
        service: {
          select: {
            id: true,
            title: true,
            category: true,
          },
        },
      },
    });

    const pendingVendorsCount = await prisma.vendor.count({
      where: {
        status: "PENDING",
      },
    });

    const pendingVendors = await prisma.vendor.findMany({
      where: {
        status: "PENDING",
      },
      select: {
        id: true,
        businessName: true,
        city: true,
        state: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      totalUsers,
      totalVendors,
      totalBookings,
      totalRevenue: revenueResult._sum.totalAmount ?? 0,
      activeServices,
      recentBookings,
      pendingVendors,
    };
  }
}
