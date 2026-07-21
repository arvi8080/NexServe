import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { invoiceController } from "./invoice.controller";

/**
 * @openapi
 * /api/v1/invoice/{bookingId}:
 *   post:
 *     summary: Create an invoice for a booking
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *   get:
 *     summary: Get invoice for a booking
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Invoice retrieved successfully
 * /api/v1/invoice:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Invoices retrieved successfully
 */
const router = Router();

router.post(
  "/:bookingId",
  authenticate,
  invoiceController.createInvoice
);

router.get(
  "/:bookingId",
  authenticate,
  invoiceController.getInvoice
);

router.get(
  "/",
  authenticate,
  invoiceController.getAllInvoices
);

export default router;
