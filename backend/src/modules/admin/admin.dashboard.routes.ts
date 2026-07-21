import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { adminDashboardController } from "./admin.dashboard.controller";

const router = Router();

router.get("/dashboard", authenticate, adminDashboardController.getStats);

export default router;
