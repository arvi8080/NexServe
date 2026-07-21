import { Request, Response } from "express";
import { AdminDashboardService } from "./admin.dashboard.service";

const dashboardService = new AdminDashboardService();

export class AdminDashboardController {
  async getStats(_req: Request, res: Response) {
    const stats = await dashboardService.getDashboardStats();

    return res.status(200).json({
      success: true,
      data: stats,
    });
  }
}

export const adminDashboardController = new AdminDashboardController();