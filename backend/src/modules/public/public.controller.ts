import { Request, Response } from "express";
import {
  COUNTRIES,
  STATES,
  CITIES,
  PAYMENT_GATEWAYS,
  HOME_DATA,
} from "./public.data";

export class PublicController {
  getHome(_req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      data: HOME_DATA,
    });
  }

  getCountries(_req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      data: COUNTRIES,
    });
  }

  getStates(req: Request, res: Response) {
    const { countryId } = req.query;
    const data = countryId
      ? STATES.filter((s) => s.countryId === countryId)
      : STATES;

    return res.status(200).json({
      success: true,
      data,
    });
  }

  getCities(req: Request, res: Response) {
    const { countryId } = req.query;
    const data = countryId
      ? CITIES.filter((c) => c.countryId === countryId)
      : CITIES;

    return res.status(200).json({
      success: true,
      data,
    });
  }

  getPaymentGateways(req: Request, res: Response) {
    const { countryId } = req.query;
    const data = countryId
      ? PAYMENT_GATEWAYS.filter((g) => g.countryId === countryId)
      : PAYMENT_GATEWAYS;

    return res.status(200).json({
      success: true,
      data,
    });
  }
}

export const publicController = new PublicController();

