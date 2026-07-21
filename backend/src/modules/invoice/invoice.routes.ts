import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { invoiceController } from "./invoice.controller";

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
