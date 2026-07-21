import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { validate } from "../../common/middleware/validate";
import {
  createServiceSchema,
  updateServiceSchema,
} from "./service.validation";
import { serviceController } from "./service.controller";

/**
 * @openapi
 * /api/v1/service:
 *   post:
 *     summary: Create a service
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Service created successfully
 *   get:
 *     summary: Get all services
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Services retrieved successfully
 * /api/v1/service/my:
 *   get:
 *     summary: Get current user's services
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User services retrieved successfully
 * /api/v1/service/search:
 *   get:
 *     summary: Search services
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Search results returned successfully
 * /api/v1/service/{id}:
 *   get:
 *     summary: Get service by ID
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Service retrieved successfully
 *   put:
 *     summary: Update a service
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Service updated successfully
 *   delete:
 *     summary: Delete a service
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Service deleted successfully
 */
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