import { AdminRepository } from "./admin.repository";
import { AppError } from "../../common/errors/AppError";

export class AdminService {

  private adminRepository = new AdminRepository();

  async getPendingVendors() {
    return this.adminRepository.getPendingVendors();
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