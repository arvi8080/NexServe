import { AppError } from "../../common/errors/AppError";
import { ServiceRepository } from "./service.repository";




export class ServiceService {
  private repository = new ServiceRepository();

  async createService(
    userId: string,
    data: {
      title: string;
      description: string;
      category: any;
      price: number;
      duration: number;
      image?: string;
    }
  ) {
    const vendor =
      await this.repository.findVendorByUserId(userId);

    if (!vendor) {
      throw new AppError("Vendor not found", 404);
    }

    if (vendor.status !== "APPROVED") {
      throw new AppError("Vendor is not approved", 403);
    }

    return this.repository.createService({
      vendorId: vendor.id,
      ...data,
    });
  }

  async getMyServices(userId: string) {
    const vendor =
      await this.repository.findVendorByUserId(userId);

    if (!vendor) {
      throw new AppError("Vendor not found", 404);
    }

    return this.repository.getVendorServices(vendor.id);
  }

  async getAllServices() {
    return this.repository.getAllServices();
  }

  async getService(id: string) {
    const service =
      await this.repository.getServiceById(id);

    if (!service) {
      throw new AppError("Service not found", 404);
    }

    return service;
  }

  async updateService(
    userId: string,
    serviceId: string,
    data: any
  ) {
    const vendor =
      await this.repository.findVendorByUserId(userId);

    if (!vendor) {
      throw new AppError("Vendor not found", 404);
    }

    if (vendor.status !== "APPROVED") {
      throw new AppError("Vendor is not approved", 403);
    }

    const service =
      await this.repository.getServiceById(serviceId);

    if (!service) {
      throw new AppError("Service not found", 404);
    }

    if (service.vendorId !== vendor.id) {
      throw new AppError(
        "You can update only your own services",
        403
      );
    }

    return this.repository.updateService(
      serviceId,
      data
    );
  }


  async deleteService(
  userId: string,
  serviceId: string
) {

  const vendor =
    await this.repository.findVendorByUserId(userId);

  if (!vendor) {
    throw new AppError(
      "Vendor not found",
      404
    );
  }

  if (vendor.status !== "APPROVED") {
    throw new AppError(
      "Vendor is not approved",
      403
    );
  }

  const service =
    await this.repository.getServiceById(serviceId);

  if (!service) {
    throw new AppError(
      "Service not found",
      404
    );
  }

  if (service.vendorId !== vendor.id) {
    throw new AppError(
      "You can delete only your own services",
      403
    );
  }

  await this.repository.deleteService(serviceId);

  return;
}
}