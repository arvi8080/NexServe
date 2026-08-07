import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/authorize.middleware";
import { validate, validateQuery } from "../../common/middleware/validate";
import {
  createServiceSchema,
  updateServiceSchema,
  searchQuerySchema,
  serviceQuerySchema,
} from "./service.validation";
import { serviceController } from "./service.controller";
import { asyncHandler } from "../../common/utils/asyncHandler";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("VENDOR", "SUPER_ADMIN"),
  validate(createServiceSchema),
  asyncHandler(serviceController.create)
);

router.get(
  "/my",
  authenticate,
  authorize("VENDOR", "SUPER_ADMIN"),
  asyncHandler(serviceController.getMyServices)
);

router.get(
  "/search",
  validateQuery(searchQuerySchema),
  asyncHandler(serviceController.search)
);

router.get(
  "/",
  validateQuery(serviceQuerySchema),
  asyncHandler(serviceController.getAllServices)
);

// Support both /api/v1/service/:id and /api/v1/vendor-services/service/:id
router.get(
  "/service/:id",
  asyncHandler(serviceController.getService)
);

router.get(
  "/vendor/:id",
  asyncHandler(serviceController.getAllServices)
);

router.get(
  "/:id",
  asyncHandler(serviceController.getService)
);

router.put(
  "/:id",
  authenticate,
  authorize("VENDOR", "SUPER_ADMIN"),
  validate(updateServiceSchema),
  asyncHandler(serviceController.update)
);

router.delete(
  "/:id",
  authenticate,
  authorize("VENDOR", "SUPER_ADMIN"),
  asyncHandler(serviceController.delete)
);

export default router;
