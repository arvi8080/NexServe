import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/authorize.middleware";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { vendorDashboardController } from "./vendor.dashboard.controller";

const router = Router();

router.get("/dashboard", authenticate, authorize("VENDOR", "SUPER_ADMIN"), asyncHandler(vendorDashboardController.getDashboardStats));
router.get("/earnings", authenticate, authorize("VENDOR", "SUPER_ADMIN"), asyncHandler(vendorDashboardController.getEarnings));
router.get("/wallet", authenticate, authorize("VENDOR", "SUPER_ADMIN"), asyncHandler(vendorDashboardController.getWallet));
router.get("/transactions", authenticate, authorize("VENDOR", "SUPER_ADMIN"), asyncHandler(vendorDashboardController.getTransactionHistory));
router.post("/withdraw", authenticate, authorize("VENDOR", "SUPER_ADMIN"), asyncHandler(vendorDashboardController.requestWithdrawal));
router.get("/withdrawals", authenticate, authorize("VENDOR", "SUPER_ADMIN"), asyncHandler(vendorDashboardController.getWithdrawalHistory));
router.get("/verification", authenticate, authorize("VENDOR", "SUPER_ADMIN"), asyncHandler(vendorDashboardController.getVerificationStatus));
router.get("/security", authenticate, authorize("VENDOR", "SUPER_ADMIN"), asyncHandler(vendorDashboardController.getSecuritySettings));
router.put("/security", authenticate, authorize("VENDOR", "SUPER_ADMIN"), asyncHandler(vendorDashboardController.updateSecuritySettings));
router.put("/change-password", authenticate, authorize("VENDOR", "SUPER_ADMIN"), asyncHandler(vendorDashboardController.changePassword));

export default router;
