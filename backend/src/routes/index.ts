import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import vendorRoutes from "../modules/vendor/vendor.routes";
import vendorDashboardRoutes from "../modules/vendor/vendor.dashboard.routes";
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
import locationRoutes from "../modules/location/location.routes";
import publicRoutes from "../modules/public/public.routes";
import customerRoutes from "../modules/customer/customer.routes";

const router = Router();

// Root API v1 Information Endpoint
router.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "GlowHome Marketplace API v1 Gateway",
    version: "1.0.0",
    endpoints: {
      auth: "/api/v1/auth",
      services: "/api/v1/service",
      bookings: "/api/v1/booking",
      customer: "/api/v1/customer",
      vendor: "/api/v1/vendor",
      admin: "/api/v1/admin",
      reviews: "/api/v1/review",
      notifications: "/api/v1/notification",
      payments: "/api/v1/payment",
      invoices: "/api/v1/invoice",
      chat: "/api/v1/chat",
      location: "/api/v1/location",
      health: "/health",
      docs: "/api-docs",
    },
  });
});

router.use("/auth", authRoutes);
router.use("/", publicRoutes);
router.use("/user", userRoutes);
router.use("/customer", customerRoutes);
router.use("/vendor", vendorRoutes);
router.use("/vendor", vendorDashboardRoutes);
router.use("/admin", adminRoutes);
router.use("/admin", adminDashboardRoutes);
router.use("/chat", chatRoutes);
router.use("/invoice", invoiceRoutes);
router.use("/service", serviceRoutes);
router.use("/vendor-services", serviceRoutes);
router.use("/booking", bookingRoutes);
router.use("/review", reviewRoutes);
router.use("/notification", notificationRoutes);
router.use("/payment", paymentRoutes);
router.use("/availability", availabilityRoutes);
router.use("/location", locationRoutes);

export default router;
