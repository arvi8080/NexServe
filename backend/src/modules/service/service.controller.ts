import { Request, Response } from "express";
import { ServiceService } from "./service.service";

const serviceService =
  new ServiceService();

export class ServiceController {

  async create(
    req: Request,
    res: Response
  ) {

    const service =
      await serviceService.createService(
        req.user!.id,
        req.body
      );

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });

  }
  async getMyServices(
  req: Request,
  res: Response
) {

  const services =
    await serviceService.getMyServices(req.user!.id);

  return res.status(200).json({
    success: true,
    data: services,
  });

}

async getAllServices(
  _req: Request,
  res: Response
) {

  const services =
    await serviceService.getAllServices();

  return res.status(200).json({
    success: true,
    data: services,
  });

}

async getService(
  req: Request,
  res: Response
) {

  const service =
    await serviceService.getService(req.params.id as string);

  return res.status(200).json({
    success: true,
    data: service,
  });

}

async update(
  req: Request,
  res: Response
) {

  const service =
    await serviceService.updateService(
      req.user!.id,
      req.params.id as string,
      req.body
    );

  return res.status(200).json({
    success: true,
    message: "Service updated successfully",
    data: service,
  });

}

async delete(
  req: Request,
  res: Response
) {

  await serviceService.deleteService(
    req.user!.id,
    req.params.id as string
  );

  return res.status(200).json({
    success: true,
    message: "Service deleted successfully",
  });

}

}

export const serviceController =
  new ServiceController();