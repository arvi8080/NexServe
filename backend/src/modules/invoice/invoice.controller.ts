import { Request, Response } from "express";
import { InvoiceService } from "./invoice.service";

const invoiceService = new InvoiceService();

export class InvoiceController {
  async createInvoice(req: Request, res: Response) {
    const invoice = await invoiceService.createInvoice(
      String(req.params.bookingId)
    );

    return res.status(201).json({
      success: true,
      message: "Invoice generated successfully",
      data: invoice,
    });
  }

  async getInvoice(req: Request, res: Response) {
    const invoice = await invoiceService.getInvoice(
      String(req.params.bookingId)
    );

    return res.status(200).json({
      success: true,
      data: invoice,
    });
  }

  async getAllInvoices(req: Request, res: Response) {
    const { page, limit } = req.query as any;
    const invoices = await invoiceService.getAllInvoices({ page, limit });

    return res.status(200).json({
      success: true,
      data: invoices,
    });
  }
}

export const invoiceController = new InvoiceController();