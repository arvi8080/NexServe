import { Request, Response } from "express";
import { VendorService } from "./vendor.service";

const vendorService = new VendorService();


export class VendorController {


  async register(
    req: Request,
    res: Response
  ) {

    const vendor =
      await vendorService.registerVendor(
        req.user!.id,
        req.body
      );


    return res.status(201).json({
      success: true,
      message: "Vendor registration submitted",
      data: vendor,
    });

  }



  async getVendorProfile(
    req: Request,
    res: Response
  ) {

    const vendor =
      await vendorService.getVendorProfile(
        req.user!.id
      );


    return res.status(200).json({
      success: true,
      data: vendor,
    });

  }

  async updateProfile(
  req: Request,
  res: Response
) {

  const vendor =
    await vendorService.updateVendorProfile(
      req.user!.id,
      req.body
    );


  return res.status(200).json({
    success: true,
    message: "Vendor profile updated successfully",
    data: vendor,
  });

}

}


export const vendorController =
  new VendorController();