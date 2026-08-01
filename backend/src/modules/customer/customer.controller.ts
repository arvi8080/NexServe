import { Request, Response } from "express";
import { CustomerService } from "./customer.service";

const customerService = new CustomerService();

export class CustomerController {
  async getDashboardStats(req: Request, res: Response) {
    const stats = await customerService.getDashboardStats(req.user!.id);
    return res.status(200).json({
      success: true,
      data: stats,
    });
  }

  async getWishlist(req: Request, res: Response) {
    const wishlist = await customerService.getWishlist(req.user!.id);
    return res.status(200).json({
      success: true,
      data: wishlist,
    });
  }
}

export const customerController = new CustomerController();

