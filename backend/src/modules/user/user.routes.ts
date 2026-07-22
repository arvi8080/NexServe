import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { userController } from "./user.controller";
import { validate } from "../../common/middleware/validate";
import { updateProfileSchema } from "./user.validation";
import {
  changePasswordSchema
} from "./user.validation";
import { asyncHandler } from "../../common/utils/asyncHandler";


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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *   put:
 *     summary: Update current user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 minLength: 2
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               profileImage:
 *                 type: string
 *                 format: uri
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 * /api/v1/user/change-password:
 *   patch:
 *     summary: Change current user password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 minLength: 8
 *               newPassword:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 * /api/v1/user/account:
 *   delete:
 *     summary: Delete current user account
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
const router = Router();

router.get("/profile", authenticate, asyncHandler(userController.getProfile));

router.put(
  "/profile",
  authenticate,
  validate(updateProfileSchema),
  asyncHandler(userController.updateProfile)
);


router.patch(
  "/change-password",
  authenticate,
  validate(changePasswordSchema),
  asyncHandler(userController.changePassword)
);


router.delete(
  "/account",
  authenticate,
  asyncHandler(userController.deleteAccount)
);
export default router;