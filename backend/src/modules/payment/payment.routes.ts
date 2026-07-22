import { Router } from "express";

import { authenticate } from "../../common/middleware/auth.middleware";
import { validate } from "../../common/middleware/validate";

import { paymentController } from "./payment.controller";
import { razorpayWebhook } from "./payment.webhook";


import {
  createOrderSchema,
  verifyPaymentSchema,
  refundPaymentSchema,
} from "./payment.validation";

/**
 * @openapi
 * /api/v1/payment/create-order:
 *   post:
 *     summary: Create a payment order
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - bookingId
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 0
 *               bookingId:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 orderId:
 *                   type: string
 * /api/v1/payment/verify:
 *   post:
 *     summary: Verify a payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - paymentId
 *               - signature
 *             properties:
 *               orderId:
 *                 type: string
 *               paymentId:
 *                 type: string
 *               signature:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 * /api/v1/payment/refund:
 *   post:
 *     summary: Refund a payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentId
 *             properties:
 *               paymentId:
 *                 type: string
 *               amount:
 *                 type: number
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment refunded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 refundId:
 *                   type: string
 * /api/v1/payment/{bookingId}:
 *   get:
 *     summary: Get payment details by booking ID
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 * /api/v1/payment/webhook:
 *   post:
 *     summary: Razorpay webhook endpoint
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 */
const router = Router();

// Webhook route MUST be defined first to avoid /webhook being matched by /:bookingId
router.post(
  "/webhook",
  razorpayWebhook
);

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
  paymentController.getPayment
);

export default router;