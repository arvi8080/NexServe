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

  async getAllInvoices(_req: Request, res: Response) {
    const invoices = await invoiceService.getAllInvoices();

    return res.status(200).json({
      success: true,
      data: invoices,
    });
  }
}

export const invoiceController = new InvoiceController();