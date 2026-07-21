import { Request, Response, NextFunction } from "express";
import { PaymentService } from "./payment.service";

class PaymentController {

  private service =
    new PaymentService();

  async createOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const { bookingId } =
        req.body;

      const result =
        await this.service.createOrder(
          bookingId
        );

      res.status(201).json({
        success: true,
        message: "Razorpay order created",
        data: result,
      });

    } catch (error) {
      next(error);
    }

  }

  async verifyPayment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const payment =
        await this.service.verifyPayment(
          req.body
        );

      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        data: payment,
      });

    } catch (error) {
      next(error);
    }

  }

  async refundPayment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const { paymentId } =
        req.body;

      const payment =
        await this.service.refundPayment(
          paymentId
        );

      res.status(200).json({
        success: true,
        message: "Refund initiated successfully",
        data: payment,
      });

    } catch (error) {
      next(error);
    }

  }

  async getPayment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const bookingId = Array.isArray(req.params.bookingId)
        ? req.params.bookingId[0]
        : req.params.bookingId;

      const payment =
        await this.service.getPayment(
          bookingId
        );

      res.status(200).json({
        success: true,
        data: payment,
      });

    } catch (error) {
      next(error);
    }

  }

}

export const paymentController =
  new PaymentController();