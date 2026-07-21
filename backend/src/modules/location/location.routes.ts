import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { validate } from "../../common/middleware/validate";
import { updateLocationSchema } from "./location.validation";
import { locationController } from "./location.controller";


/**
 * @openapi
 * /api/v1/location:
 *   patch:
 *     summary: Update user location
 *     tags: [Location]
 *     responses:
 *       200:
 *         description: Location updated successfully
 * /api/v1/location/nearby:
 *   get:
 *     summary: Get nearby services or locations
 *     tags: [Location]
 *     responses:
 *       200:
 *         description: Nearby locations retrieved successfully
 */
const router = Router();

router.patch(
"/",
authenticate,
validate(updateLocationSchema),
locationController.update
);


router.get(
"/nearby",
locationController.nearby
);


export default router;