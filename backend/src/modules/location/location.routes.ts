import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { validate, validateQuery } from "../../common/middleware/validate";
import { updateLocationSchema, nearbyQuerySchema } from "./location.validation";
import { locationController } from "./location.controller";
import { asyncHandler } from "../../common/utils/asyncHandler";


/**
 * @openapi
 * /api/v1/location:
 *   patch:
 *     summary: Update user location
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - latitude
 *               - longitude
 *             properties:
 *               latitude:
 *                 type: number
 *                 format: double
 *               longitude:
 *                 type: number
 *                 format: double
 *     responses:
 *       200:
 *         description: Location updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 * /api/v1/location/nearby:
 *   get:
 *     summary: Get nearby services or locations
 *     tags: [Location]
 *     parameters:
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: number
 *         required: true
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: number
 *         required: true
 *       - in: query
 *         name: radius
 *         schema:
 *           type: number
 *         description: Radius in kilometers
 *         required: false
 *     responses:
 *       200:
 *         description: Nearby locations retrieved successfully
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

router.patch(
"/",
authenticate,
validate(updateLocationSchema),
asyncHandler(locationController.update)
);


router.get(
"/nearby",
validateQuery(nearbyQuerySchema),
asyncHandler(locationController.nearby)
);


export default router;
