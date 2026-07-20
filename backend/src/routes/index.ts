import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import vendorRoutes from "../modules/vendor/vendor.routes";
import adminRoutes from "../modules/admin/admin.routes";
import serviceRoutes from "../modules/service/service.routes";
import bookingRoutes from "../modules/booking/booking.routes";
import reviewRoutes from "../modules/review/review.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/vendor", vendorRoutes);
router.use("/admin", adminRoutes);
router.use("/service", serviceRoutes);
router.use("/booking", bookingRoutes);
router.use("/reviews", reviewRoutes);

export default router;