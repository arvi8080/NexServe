import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import vendorRoutes from "../modules/vendor/vendor.routes";
import adminRoutes from "../modules/admin/admin.routes";
import adminDashboardRoutes from "../modules/admin/admin.dashboard.routes";
import chatRoutes from "../modules/chat/chat.routes";
import invoiceRoutes from "../modules/invoice/invoice.routes";
import serviceRoutes from "../modules/service/service.routes";
import bookingRoutes from "../modules/booking/booking.routes";
import reviewRoutes from "../modules/review/review.routes";
import notificationRoutes from "../modules/notification/notification.routes";
import paymentRoutes from "../modules/payment/payment.routes";
import availabilityRoutes from "../modules/availability/availability.routes";






const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/vendor", vendorRoutes);
router.use("/admin", adminRoutes);
router.use("/admin", adminDashboardRoutes);
router.use("/chat", chatRoutes);
router.use("/invoice", invoiceRoutes);
router.use("/service", serviceRoutes);
router.use("/booking", bookingRoutes);
router.use("/review", reviewRoutes);
router.use(
  "/notification",
  notificationRoutes
);
router.use("/payment", paymentRoutes);
router.use("/availability", availabilityRoutes);



export default router;