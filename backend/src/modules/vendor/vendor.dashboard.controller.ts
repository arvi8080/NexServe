import { Request, Response } from "express";
import { VendorDashboardService } from "./vendor.dashboard.service";

const vendorDashboardService = new VendorDashboardService();

export class VendorDashboardController {
  async getDashboardStats(req: Request, res: Response) {
    const stats = await vendorDashboardService.getDashboardStats(req.user!.id);
    return res.status(200).json({
      success: true,
      data: stats,
    });
  }

  async getEarnings(req: Request, res: Response) {
    const { period } = req.query;
    const earnings = await vendorDashboardService.getEarnings(req.user!.id, period as string);
    return res.status(200).json({
      success: true,
      data: earnings,
    });
  }

  async getWallet(req: Request, res: Response) {
    const wallet = await vendorDashboardService.getWallet(req.user!.id);
    return res.status(200).json({
      success: true,
      data: wallet,
    });
  }

  async getWithdrawalHistory(req: Request, res: Response) {
    const history = await vendorDashboardService.getWithdrawalHistory(req.user!.id);
    return res.status(200).json({
      success: true,
      data: history,
    });
  }

  async requestWithdrawal(req: Request, res: Response) {
    const { amount, method } = req.body;
    const withdrawal = await vendorDashboardService.requestWithdrawal(req.user!.id, amount, method);
    return res.status(201).json({
      success: true,
      message: "Withdrawal request submitted",
      data: withdrawal,
    });
  }

  async getTransactionHistory(req: Request, res: Response) {
    const { page, limit } = req.query;
    const transactions = await vendorDashboardService.getTransactionHistory(
      req.user!.id,
      Number(page) || 1,
      Number(limit) || 20
    );
    return res.status(200).json({
      success: true,
      data: transactions,
    });
  }

  async getPaymentHistory(req: Request, res: Response) {
    const { page, limit } = req.query;
    const payments = await vendorDashboardService.getPaymentHistory(
      req.user!.id,
      Number(page) || 1,
      Number(limit) || 20
    );
    return res.status(200).json({
      success: true,
      data: payments,
    });
  }

  // Notification preferences
  async getNotificationPreferences(req: Request, res: Response) {
    const prefs = await vendorDashboardService.getNotificationPreferences(req.user!.id);
    return res.status(200).json({
      success: true,
      data: prefs,
    });
  }

  async updateNotificationPreferences(req: Request, res: Response) {
    const prefs = await vendorDashboardService.updateNotificationPreferences(req.user!.id, req.body);
    return res.status(200).json({
      success: true,
      message: "Notification preferences updated",
      data: prefs,
    });
  }

  // Documents & Verification
  async getVerificationStatus(req: Request, res: Response) {
    const status = await vendorDashboardService.getVerificationStatus(req.user!.id);
    return res.status(200).json({
      success: true,
      data: status,
    });
  }

  async uploadDocument(req: Request, res: Response) {
    const { documentType, documentUrl } = req.body;
    const doc = await vendorDashboardService.uploadDocument(req.user!.id, documentType, documentUrl);
    return res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      data: doc,
    });
  }

  // Settings
  async changePassword(req: Request, res: Response) {
    const { currentPassword, newPassword } = req.body;
    await vendorDashboardService.changePassword(req.user!.id, currentPassword, newPassword);
    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  }

  async getSecuritySettings(req: Request, res: Response) {
    const settings = await vendorDashboardService.getSecuritySettings(req.user!.id);
    return res.status(200).json({
      success: true,
      data: settings,
    });
  }

  async updateSecuritySettings(req: Request, res: Response) {
    const settings = await vendorDashboardService.updateSecuritySettings(req.user!.id, req.body);
    return res.status(200).json({
      success: true,
      message: "Security settings updated",
      data: settings,
    });
  }

  // Support Tickets
  async getSupportTickets(req: Request, res: Response) {
    const tickets = await vendorDashboardService.getSupportTickets(req.user!.id);
    return res.status(200).json({
      success: true,
      data: tickets,
    });
  }

  async createSupportTicket(req: Request, res: Response) {
    const ticket = await vendorDashboardService.createSupportTicket(req.user!.id, req.body);
    return res.status(201).json({
      success: true,
      message: "Support ticket created",
      data: ticket,
    });
  }

  async getFaqs(req: Request, res: Response) {
    const faqs = await vendorDashboardService.getFaqs();
    return res.status(200).json({
      success: true,
      data: faqs,
    });
  }
}

export const vendorDashboardController = new VendorDashboardController();

