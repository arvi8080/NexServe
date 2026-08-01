import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/authorize.middleware";
import { customerController } from "./customer.controller";
import { asyncHandler } from "../../common/utils/asyncHandler";

const router = Router();

router.get(
  "/dashboard",
  authenticate,
  authorize("CUSTOMER", "SUPER_ADMIN"),
  asyncHandler(customerController.getDashboardStats)
);

router.get(
  "/wishlist",
  authenticate,
  authorize("CUSTOMER", "SUPER_ADMIN"),
  asyncHandler(customerController.getWishlist)
);

export default router;

