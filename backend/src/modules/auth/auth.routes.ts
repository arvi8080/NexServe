import { Router } from "express";
import { authController } from "./auth.controller";
import { validate } from "../../common/middleware/validate";
import { registerSchema, loginSchema } from "./auth.validation";
import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/authorize.middleware";
import { asyncHandler } from "../../common/utils/asyncHandler";

const router = Router();

router.get(
  "/me",
  authenticate,
  authorize("CUSTOMER", "VENDOR", "ADMIN", "SUPER_ADMIN"),
  (req, res) => {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);

// GET info handler for GET /api/v1/auth/register
router.get("/register", (_req, res) => {
  res.json({
    success: true,
    message: "GlowHome User Account Registration API Endpoint",
    methodRequired: "POST",
    endpoint: "/api/v1/auth/register",
    requiredFields: ["firstName", "lastName", "email", "password", "phone", "role"]
  });
});

// GET info handler for GET /api/v1/auth/login
router.get("/login", (_req, res) => {
  res.json({
    success: true,
    message: "GlowHome Authentication Login API Endpoint",
    methodRequired: "POST",
    endpoint: "/api/v1/auth/login",
    requiredFields: ["email", "password"]
  });
});

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(authController.register)
);

router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(authController.login)
);

router.post(
  "/logout",
  authenticate,
  authorize("CUSTOMER", "VENDOR", "ADMIN", "SUPER_ADMIN"),
  asyncHandler(authController.logout)
);

router.post(
  "/refresh",
  asyncHandler(authController.refresh)
);

export default router;