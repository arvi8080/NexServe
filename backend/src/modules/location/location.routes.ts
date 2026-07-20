import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { validate } from "../../common/middleware/validate";
import { updateLocationSchema } from "./location.validation";
import { locationController } from "./location.controller";


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