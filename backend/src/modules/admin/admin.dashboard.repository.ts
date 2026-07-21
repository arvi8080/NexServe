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

    return {
      totalUsers,
      totalVendors,
      totalBookings,
      revenue: revenueResult._sum.totalAmount ?? 0,
      activeServices,
    };
  }
}
