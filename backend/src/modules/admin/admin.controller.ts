import { Request, Response } from "express";
import { AdminService } from "./admin.service";


const adminService =
  new AdminService();



export class AdminController {



async getPendingVendors(
req: Request,
res: Response
){

const vendors =
await adminService.getPendingVendors();


return res.status(200).json({

success:true,

data:vendors

});

}




async updateVendorStatus(
  req: Request,
  res: Response
) {

  const vendorId = req.params.vendorId as string;
  const status = req.body.status as "APPROVED" | "REJECTED";

  const vendor =
    await adminService.updateVendorStatus(
      vendorId,
      status
    );

  return res.status(200).json({
    success: true,
    message: "Vendor status updated",
    data: vendor,
  });

}


}


export const adminController =
new AdminController();