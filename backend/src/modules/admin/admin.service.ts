import { AdminRepository } from "./admin.repository";
import { AppError } from "../../common/errors/AppError";

export class AdminService {

  private adminRepository = new AdminRepository();

  async getPendingVendors(options?: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    return this.adminRepository.getPendingVendors(options);
  }

  async updateVendorStatus(
    vendorId: string,
    status: "APPROVED" | "REJECTED"
  ) {

    const vendor =
      await this.adminRepository.updateVendorStatus(
        vendorId,
        status
      );

    if (!vendor) {
      throw new AppError(
        "Vendor not found",
        404
      );
    }

    return vendor;
  }

}