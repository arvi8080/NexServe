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

/**
 * @openapi
 * /api/v1/payment/create-order:
 *   post:
 *     summary: Create a payment order
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Payment order created successfully
 * /api/v1/payment/verify:
 *   post:
 *     summary: Verify a payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment verified successfully
 * /api/v1/payment/refund:
 *   post:
 *     summary: Refund a payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment refunded successfully
 * /api/v1/payment/{bookingId}:
 *   get:
 *     summary: Get payment details by booking ID
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment details returned successfully
 * /api/v1/payment/webhook:
 *   post:
 *     summary: Razorpay webhook endpoint
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 */
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