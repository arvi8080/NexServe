import { VendorRepository } from "./vendor.repository";
import { AppError } from "../../common/errors/AppError";


export class VendorService {

  private vendorRepository = new VendorRepository();


  async registerVendor(
    userId: string,
    data: {
      businessName: string;
      description?: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      country: string;
    }
  ) {

    const existingVendor =
      await this.vendorRepository.findByUserId(userId);


    if (existingVendor) {
      throw new AppError(
        "Vendor profile already exists",
        409
      );
    }


    return this.vendorRepository.createVendor({
      userId,
      ...data,
    });

  }



  async getVendorProfile(userId: string) {

    const vendor =
      await this.vendorRepository.getVendorProfile(userId);


    if (!vendor) {
      throw new AppError(
        "Vendor profile not found",
        404
      );
    }


    return vendor;

  }

  async updateVendorProfile(
  userId: string,
  data: {
    businessName?: string;
    description?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
  }
) {

  const vendor =
    await this.vendorRepository.findByUserId(
      userId
    );


  if (!vendor) {
    throw new AppError(
      "Vendor profile not found",
      404
    );
  }


  return this.vendorRepository.updateVendorProfile(
    userId,
    data
  );

}

}