import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { userController } from "./user.controller";
import { validate } from "../../common/middleware/validate";
import { updateProfileSchema } from "./user.validation";

import {
  changePasswordSchema
} from "./user.validation";


const router = Router();

router.get("/profile", authenticate, userController.getProfile);

router.put(
  "/profile",
  authenticate,
  validate(updateProfileSchema),
  userController.updateProfile
);


router.patch(
  "/change-password",
  authenticate,
  validate(changePasswordSchema),
  userController.changePassword
);


router.delete(
  "/account",
  authenticate,
  userController.deleteAccount
);
export default router;