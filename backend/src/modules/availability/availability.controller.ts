import { Request, Response } from "express";
import { AppError } from "../../common/errors/AppError";
import prisma from "../../config/prisma";

class AvailabilityController {
  async upsert(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { dayOfWeek, startTime, endTime, isAvailable } = req.body;

      // Lookup vendor by userId
      const vendor = await prisma.vendor.findUnique({
        where: { userId }
      });

      if (!vendor) {
        throw new AppError("Vendor profile not found", 404);
      }

      // Check if availability already exists for this vendor + dayOfWeek
      const existing = await prisma.availability.findFirst({
        where: {
          vendorId: vendor.id,
          dayOfWeek,
        },
      });

      let availability;
      if (existing) {
        availability = await prisma.availability.update({
          where: { id: existing.id },
          data: {
            startTime,
            endTime,
            isAvailable: isAvailable ?? true,
          },
        });
      } else {
        availability = await prisma.availability.create({
          data: {
            vendorId: vendor.id,
            dayOfWeek,
            startTime,
            endTime,
            isAvailable: isAvailable ?? true,
          },
        });
      }

      return res.status(200).json({ success: true, data: availability });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ success: false, message: error.message });
      }
      return res.status(500).json({ success: false, message: "Failed to save availability" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const availability = await prisma.availability.findMany({
        orderBy: [{ vendorId: "asc" }, { dayOfWeek: "asc" }, { startTime: "asc" }],
      });

      return res.status(200).json({ success: true, data: availability });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Failed to fetch availability" });
    }
  }

  async getByVendor(req: Request, res: Response) {
    try {
      const vendorId = req.params.vendorId as string;
      const availability = await prisma.availability.findMany({
        where: { vendorId },
        orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
      });

      return res.status(200).json({ success: true, data: availability });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Failed to fetch vendor availability" });
    }
  }
}

export const availabilityController = new AvailabilityController();
