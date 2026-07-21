import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { chatController } from "./chat.controller";

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
