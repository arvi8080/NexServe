import { Router } from "express";

import { authenticate } from "../../common/middleware/auth.middleware";
import { validate } from "../../common/middleware/validate";

import { paymentController } from "./payment.controller";
import { razorpayWebhook } from "./payment.webhook";


import {
  createOrderSchema,
  verifyPaymentSchema,
  refundPaymentSchema,
  getPaymentSchema,
} from "./payment.validation";

const router = Router();

router.post(
  "/create-order",
  authenticate,
  validate(createOrderSchema),
  paymentController.createOrder
);

router.post(
  "/verify",
  authenticate,
  validate(verifyPaymentSchema),
  paymentController.verifyPayment
);

router.post(
  "/refund",
  authenticate,
  validate(refundPaymentSchema),
  paymentController.refundPayment
);

router.get(
  "/:bookingId",
  authenticate,
  validate(getPaymentSchema),
  paymentController.getPayment
);

router.post(
  "/webhook",
  razorpayWebhook
);

export default router;