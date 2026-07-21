import { Request, Response } from "express";
import prisma from "../../config/prisma";

class AvailabilityController {
  async upsert(req: Request, res: Response) {
    try {
      const { vendorId, dayOfWeek, startTime, endTime, isAvailable } = req.body;

      const availability = await prisma.availability.upsert({
        where: {
          id: req.body.id ?? "__new__",
        },
        update: {
          dayOfWeek,
          startTime,
          endTime,
          isAvailable,
        },
        create: {
          vendorId,
          dayOfWeek,
          startTime,
          endTime,
          isAvailable,
        },
      });

      return res.status(200).json({ success: true, data: availability });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Failed to save availability", error });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const availability = await prisma.availability.findMany({
        orderBy: [{ vendorId: "asc" }, { dayOfWeek: "asc" }, { startTime: "asc" }],
      });

      return res.status(200).json({ success: true, data: availability });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Failed to fetch availability", error });
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
      return res.status(500).json({ success: false, message: "Failed to fetch vendor availability", error });
    }
  }
}

export const availabilityController = new AvailabilityController();
