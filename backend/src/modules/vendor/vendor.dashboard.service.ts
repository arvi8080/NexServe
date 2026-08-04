import prisma from "../../config/prisma";
import { AppError } from "../../common/errors/AppError";
import bcrypt from "bcrypt";
import { BookingStatus } from "@prisma/client";

export class VendorDashboardService {
  async getDashboardStats(userId: string) {
    const vendor = await prisma.vendor.findUnique({
      where: { userId },
      include: { user: true },
    });
    if (!vendor) throw new AppError("Vendor not found", 404);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const activeBookingStatuses = [
      "PENDING",
      "ACCEPTED",
      "ON_THE_WAY",
      "SERVICE_STARTED",
      "ONGOING",
    ] as BookingStatus[];

    const completedBookingStatuses = ["COMPLETED", "PAYMENT_CONFIRMED"] as BookingStatus[];

    const [
      todayBookings,
      upcomingBookings,
      completedJobs,
      monthlyEarnings,
      walletBalance,
      pendingRequests,
      averageRating,
      totalReviews,
      recentActivity,
      upcomingSchedule,
      bookingTrend,
      earningsGraph,
    ] = await Promise.all([
      prisma.booking.count({ where: { vendorId: vendor.id, bookingDate: { gte: today, lt: tomorrow } } }),
      prisma.booking.count({ where: { vendorId: vendor.id, bookingDate: { gte: today }, status: { in: activeBookingStatuses } } }),
      prisma.booking.count({ where: { vendorId: vendor.id, status: { in: completedBookingStatuses } } }),
      prisma.payment.aggregate({
        _sum: { amount: true },
        where: { booking: { vendorId: vendor.id }, status: "SUCCESS", createdAt: { gte: new Date(today.getFullYear(), today.getMonth(), 1) } },
      }),
      prisma.payment.aggregate({
        _sum: { amount: true },
        where: { booking: { vendorId: vendor.id }, status: "SUCCESS" },
      }),
      prisma.booking.count({ where: { vendorId: vendor.id, status: "PENDING" } }),
      prisma.review.aggregate({ _avg: { rating: true }, where: { vendorId: vendor.id } }),
      prisma.review.count({ where: { vendorId: vendor.id } }),
      prisma.booking.findMany({
        where: { vendorId: vendor.id },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { customer: { select: { id: true, firstName: true, lastName: true, profileImage: true } }, service: { select: { id: true, title: true, category: true } } },
      }),
      prisma.booking.findMany({
        where: { vendorId: vendor.id, bookingDate: { gte: today }, status: { in: activeBookingStatuses } },
        orderBy: { bookingDate: "asc" },
        take: 5,
        include: { customer: { select: { id: true, firstName: true, lastName: true, profileImage: true } }, service: { select: { id: true, title: true, duration: true } } },
      }),
      this.getBookingTrend(vendor.id),
      this.getEarningsGraph(vendor.id),
    ]);

    return {
      vendorName: vendor.businessName,
      profileImage: vendor.profileImage || vendor.user?.profileImage,
      isVerified: vendor.status === "APPROVED",
      status: vendor.status,
      stats: {
        todayBookings,
        upcomingBookings,
        completedJobs,
        monthlyEarnings: monthlyEarnings._sum.amount || 0,
        walletBalance: walletBalance._sum.amount || 0,
        pendingRequests,
        averageRating: averageRating._avg.rating || 0,
        totalReviews,
      },
      bookingTrend,
      earningsGraph,
      recentActivity,
      upcomingSchedule,
    };
  }

  private async getBookingTrend(vendorId: string) {
    const trend: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));
      const count = await prisma.booking.count({ where: { vendorId, bookingDate: { gte: dayStart, lte: dayEnd } } });
      trend.push({ date: dayStart.toISOString().split("T")[0], count });
    }
    return trend;
  }

  private async getEarningsGraph(vendorId: string) {
    const graph: { month: string; amount: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      const monthStart = new Date(date.getFullYear(), date.getMonth() - i, 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() - i + 1, 0);
      const result = await prisma.payment.aggregate({
        _sum: { amount: true },
        where: { booking: { vendorId }, status: "SUCCESS", createdAt: { gte: monthStart, lte: monthEnd } },
      });
      graph.push({
        month: monthStart.toLocaleString("default", { month: "short", year: "numeric" }),
        amount: result._sum.amount || 0,
      });
    }
    return graph;
  }

  async getEarnings(userId: string, period?: string) {
    const vendor = await prisma.vendor.findUnique({ where: { userId } });
    if (!vendor) throw new AppError("Vendor not found", 404);

    const now = new Date();
    let startDate: Date;
    switch (period) {
      case "weekly": startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7); break;
      case "monthly": startDate = new Date(now.getFullYear(), now.getMonth(), 1); break;
      case "yearly": startDate = new Date(now.getFullYear(), 0, 1); break;
      default: startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    const payments = await prisma.payment.findMany({
      where: { booking: { vendorId: vendor.id }, status: "SUCCESS", createdAt: { gte: startDate } },
      include: {
        booking: { include: { service: { select: { id: true, title: true, category: true } }, customer: { select: { id: true, firstName: true, lastName: true } } } },
      },
      orderBy: { createdAt: "desc" },
    });

    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const todayEarnings = payments.filter((p) => p.createdAt! >= todayStart && p.createdAt! < todayEnd).reduce((s, p) => s + p.amount, 0);
    const weekEarnings = payments.filter((p) => p.createdAt! >= weekStart).reduce((s, p) => s + p.amount, 0);
    const monthEarnings = payments.filter((p) => p.createdAt! >= monthStart).reduce((s, p) => s + p.amount, 0);
    const totalEarnings = payments.reduce((s, p) => s + p.amount, 0);

    const serviceRevenue: Record<string, number> = {};
    payments.forEach((p) => {
      const title = p.booking?.service?.title || "Unknown";
      serviceRevenue[title] = (serviceRevenue[title] || 0) + p.amount;
    });

    return {
      todayEarnings,
      weekEarnings,
      monthEarnings,
      totalEarnings,
      serviceRevenue: Object.entries(serviceRevenue).map(([service, amount]) => ({ service, amount })),
      transactionHistory: payments.map((p) => ({
        id: p.id,
        amount: p.amount,
        status: p.status,
        bookingId: p.bookingId,
        customerName: p.booking?.customer ? `${p.booking.customer.firstName} ${p.booking.customer.lastName}`.trim() : "Unknown",
        serviceName: p.booking?.service?.title || "Unknown",
        date: p.createdAt,
      })),
    };
  }

  async getWallet(userId: string) {
    const vendor = await prisma.vendor.findUnique({ where: { userId } });
    if (!vendor) throw new AppError("Vendor not found", 404);

    const [successPayments, pendingPayments] = await Promise.all([
      prisma.payment.aggregate({ _sum: { amount: true }, where: { booking: { vendorId: vendor.id }, status: "SUCCESS" } }),
      prisma.payment.aggregate({ _sum: { amount: true }, where: { booking: { vendorId: vendor.id }, status: "PENDING" } }),
    ]);

    return {
      currentBalance: successPayments._sum.amount || 0,
      pendingBalance: pendingPayments._sum.amount || 0,
      lifetimeEarnings: successPayments._sum.amount || 0,
    };
  }

  async getWithdrawalHistory(userId: string) {
    return [];
  }

  async requestWithdrawal(userId: string, amount: number | string, method: string) {
    return {
      id: `wd_${Date.now()}`,
      userId,
      amount,
      method,
      status: "PENDING",
      createdAt: new Date(),
    };
  }

  async getPaymentHistory(userId: string, page: number, limit: number) {
    return {
      payments: [],
      pagination: { page, limit, total: 0, totalPages: 0 },
    };
  }

  async getNotificationPreferences(userId: string) {
    return {
      email: true,
      push: true,
      sms: false,
    };
  }

  async updateNotificationPreferences(userId: string, data: Record<string, unknown>) {
    return {
      userId,
      ...data,
    };
  }

  async uploadDocument(userId: string, documentType: string, documentUrl: string) {
    return {
      id: `doc_${Date.now()}`,
      userId,
      documentType,
      documentUrl,
      uploadedAt: new Date(),
    };
  }

  async getSupportTickets(userId: string) {
    return [];
  }

  async createSupportTicket(userId: string, data: Record<string, unknown>) {
    return {
      id: `ticket_${Date.now()}`,
      userId,
      ...data,
      status: "OPEN",
      createdAt: new Date(),
    };
  }

  async getFaqs() {
    return [];
  }

  async getTransactionHistory(userId: string, page: number, limit: number) {
    const vendor = await prisma.vendor.findUnique({ where: { userId } });
    if (!vendor) throw new AppError("Vendor not found", 404);
    const skip = (page - 1) * limit;
    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where: { booking: { vendorId: vendor.id } },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: { booking: { include: { service: { select: { title: true } } } } },
      }),
      prisma.payment.count({ where: { booking: { vendorId: vendor.id } } }),
    ]);
    return {
      transactions: payments.map((p) => ({
        id: p.id,
        amount: p.amount,
        status: p.status,
        serviceName: p.booking?.service?.title || "Unknown",
        date: p.createdAt,
        bookingId: p.bookingId,
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError("User not found", 404);
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) throw new AppError("Current password is incorrect", 400);
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { id: userId }, data: { password: hashedPassword } });
  }

  async getSecuritySettings(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, isEmailVerified: true, isPhoneVerified: true },
    });
    if (!user) throw new AppError("User not found", 404);
    return { email: user.email, isEmailVerified: user.isEmailVerified, isPhoneVerified: user.isPhoneVerified, twoFactorEnabled: false, preferredLanguage: "en" };
  }

  async updateSecuritySettings(userId: string, data: { twoFactorEnabled?: boolean; preferredLanguage?: string }) {
    return prisma.user.update({
      where: { id: userId },
      data: { ...(data.preferredLanguage && { preferredLanguage: data.preferredLanguage as any }) },
      select: { id: true, email: true, isEmailVerified: true, isPhoneVerified: true },
    });
  }

  async getVerificationStatus(userId: string) {
    const vendor = await prisma.vendor.findUnique({ where: { userId } });
    if (!vendor) throw new AppError("Vendor not found", 404);
    return {
      status: vendor.status,
      documents: [
        { type: "Government ID", status: "NOT_SUBMITTED" },
        { type: "Business License", status: "NOT_SUBMITTED" },
        { type: "Certificates", status: "NOT_SUBMITTED" },
        { type: "PAN Card", status: "NOT_SUBMITTED" },
        { type: "Tax Documents", status: "NOT_SUBMITTED" },
      ],
    };
  }
}
