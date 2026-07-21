import prisma from "../../config/prisma";

export class InvoiceRepository {
  async createInvoice(data: {
    bookingId: string;
    invoiceNumber: string;
    dueDate: Date;
    subtotal: number;
    tax: number;
    total: number;
    details?: string;
  }) {
    return prisma.invoice.create({
      data,
    });
  }

  async findInvoiceByBookingId(bookingId: string) {
    return prisma.invoice.findUnique({
      where: {
        bookingId,
      },
    });
  }

  async getInvoices() {
    return prisma.invoice.findMany({
      include: {
        booking: {
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
                city: true,
              },
            },
            service: true,
          },
        },
      },
      orderBy: {
        issueDate: "desc",
      },
    });
  }
}
