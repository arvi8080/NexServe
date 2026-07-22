import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { invoiceController } from "./invoice.controller";
import { asyncHandler } from "../../common/utils/asyncHandler";

/**
 * @openapi
 * /api/v1/invoice/{bookingId}:
 *   post:
 *     summary: Create an invoice for a booking
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *   get:
 *     summary: Get invoice for a booking
 *     tags: [Invoice]
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
 *         description: Invoice retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 * /api/v1/invoice:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Invoices retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
const router = Router();

router.get(
  "/",
  authenticate,
  asyncHandler(invoiceController.getAllInvoices)
);

router.post(
  "/:bookingId",
  authenticate,
  asyncHandler(invoiceController.createInvoice)
);

router.get(
  "/:bookingId",
  authenticate,
  asyncHandler(invoiceController.getInvoice)
);

export default router;
