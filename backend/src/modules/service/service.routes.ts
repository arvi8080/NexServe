import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { validate, validateQuery } from "../../common/middleware/validate";
import {
  createServiceSchema,
  updateServiceSchema,
  searchQuerySchema,
  serviceQuerySchema,
} from "./service.validation";
import { serviceController } from "./service.controller";
import { asyncHandler } from "../../common/utils/asyncHandler";

/**
 * @openapi
 * /api/v1/service:
 *   post:
 *     summary: Create a service
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *               - price
 *               - duration
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *               description:
 *                 type: string
 *                 minLength: 10
 *               category:
 *                 type: string
 *                 enum: [FACIAL, HAIR_CUT, HAIR_SPA, HAIR_COLOR, WAXING, THREADING, MANICURE, PEDICURE, PARTY_MAKEUP, BRIDAL_MAKEUP]
 *               price:
 *                 type: number
 *                 minimum: 0
 *               duration:
 *                 type: integer
 *                 minimum: 1
 *               image:
 *                 type: string
 *                 format: uri
 *     responses:
 *       201:
 *         description: Service created successfully
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
 *     summary: Get all services
 *     tags: [Service]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [FACIAL, HAIR_CUT, HAIR_SPA, HAIR_COLOR, WAXING, THREADING, MANICURE, PEDICURE, PARTY_MAKEUP, BRIDAL_MAKEUP]
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Services retrieved successfully
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
 * /api/v1/service/my:
 *   get:
 *     summary: Get current user's services
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User services retrieved successfully
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
 * /api/v1/service/search:
 *   get:
 *     summary: Search services
 *     tags: [Service]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [FACIAL, HAIR_CUT, HAIR_SPA, HAIR_COLOR, WAXING, THREADING, MANICURE, PEDICURE, PARTY_MAKEUP, BRIDAL_MAKEUP]
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Search results returned successfully
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
 * /api/v1/service/{id}:
 *   get:
 *     summary: Get service by ID
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *   put:
 *     summary: Update a service
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               title:
 *                 type: string
 *                 minLength: 3
 *               description:
 *                 type: string
 *                 minLength: 10
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               duration:
 *                 type: integer
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Service updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *   delete:
 *     summary: Delete a service
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
const router = Router();

router.post(
  "/",
  authenticate,
  validate(createServiceSchema),
  asyncHandler(serviceController.create)
);

router.get(
  "/my",
  authenticate,
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

router.get(
  "/:id",
  asyncHandler(serviceController.getService)
);

router.put(
  "/:id",
  authenticate,
  validate(updateServiceSchema),
  asyncHandler(serviceController.update)
);


router.delete(
  "/:id",
  authenticate,
  asyncHandler(serviceController.delete)
);

export default router;
