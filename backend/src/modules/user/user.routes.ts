import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { userController } from "./user.controller";
import { validate } from "../../common/middleware/validate";
import { updateProfileSchema } from "./user.validation";

import {
  changePasswordSchema
} from "./user.validation";


/**
 * @openapi
 * /api/v1/user/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile returned successfully
 *   put:
 *     summary: Update current user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile updated successfully
 * /api/v1/user/change-password:
 *   patch:
 *     summary: Change current user password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Password updated successfully
 * /api/v1/user/account:
 *   delete:
 *     summary: Delete current user account
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
 */
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