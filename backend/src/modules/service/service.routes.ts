import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { validate } from "../../common/middleware/validate";
import {
  createServiceSchema,
  updateServiceSchema,
} from "./service.validation";
import { serviceController } from "./service.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(createServiceSchema),
  serviceController.create
);

router.get(
  "/my",
  authenticate,
  serviceController.getMyServices
);

router.get(
  "/",
  serviceController.getAllServices
);

router.get(
  "/search",
  serviceController.search
);

router.get(
  "/:id",
  serviceController.getService
);

router.put(
  "/:id",
  authenticate,
  validate(updateServiceSchema),
  serviceController.update
);


router.delete(
  "/:id",
  authenticate,
  serviceController.delete
);

export default router;