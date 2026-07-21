import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { chatController } from "./chat.controller";

/**
 * @openapi
 * /api/v1/chat/{bookingId}/messages:
 *   post:
 *     summary: Send a chat message
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Message sent successfully
 *   get:
 *     summary: Get chat messages for a booking
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 */
const router = Router();

router.post(
  "/:bookingId/messages",
  authenticate,
  chatController.sendMessage
);

router.get(
  "/:bookingId/messages",
  authenticate,
  chatController.getMessages
);

export default router;
