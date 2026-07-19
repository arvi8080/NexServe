import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { validate } from "../../common/middleware/validate";
import { vendorController } from "./vendor.controller";
import { 
  vendorRegisterSchema,
  updateVendorSchema
} from "./vendor.validation";


const router = Router();


router.post(
  "/register",
  authenticate,
  validate(vendorRegisterSchema),
  vendorController.register
);

router.get(
  "/profile",
  authenticate,
  vendorController.getVendorProfile
);


router.put(
  "/profile",
  authenticate,
  validate(updateVendorSchema),
  vendorController.updateProfile
);

export default router;