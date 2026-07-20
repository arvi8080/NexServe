import { Router } from "express";
import { adminController } from "./admin.controller";
import { authenticate } from "../../common/middleware/auth.middleware";

import { validate } from "../../common/middleware/validate";
import { updateVendorStatusSchema } from "./admin.validation";


const router = Router();



router.get(
"/vendors/pending",
authenticate,
adminController.getPendingVendors
);



router.patch(
  "/vendors/:vendorId/status",
  authenticate,
  validate(updateVendorStatusSchema),
  adminController.updateVendorStatus
);



export default router;