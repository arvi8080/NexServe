import { Router } from "express";
import { authController } from "./auth.controller";
import { validate } from "../../common/middleware/validate";
import {
  registerSchema,
  loginSchema,
} from "./auth.validation";
import { authenticate } from "../../common/middleware/auth.middleware";

const router = Router();


router.get(
  "/me",
  authenticate,
  (req, res) => {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);

router.post(
  "/register",
  validate(registerSchema),
  authController.register
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login
);


router.post("/logout", authController.logout);

router.post("/refresh", authController.refresh);
export default router;