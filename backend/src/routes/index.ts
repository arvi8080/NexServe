import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import vendorRoutes from "../modules/vendor/vendor.routes";
import adminRoutes from "../modules/admin/admin.routes";
import serviceRoutes from "../modules/service/service.routes";


const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/vendor", vendorRoutes);
router.use("/admin", adminRoutes);
router.use("/service", serviceRoutes);

export default router;