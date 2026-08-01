import { Router } from "express";
import { publicController } from "./public.controller";

const router = Router();

/**
 * Public endpoints - accessible without authentication.
 * Serves landing-page content, country/state/city lookup,
 * and payment gateway configuration for a given country.
 */
router.get("/home", publicController.getHome);
router.get("/countries", publicController.getCountries);
router.get("/states", publicController.getStates);
router.get("/cities", publicController.getCities);
router.get("/payment-gateways", publicController.getPaymentGateways);

export default router;

