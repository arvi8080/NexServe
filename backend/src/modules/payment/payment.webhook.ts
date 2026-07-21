import { Request, Response } from "express";
import crypto from "crypto";
import { PaymentRepository } from "./payment.repository";
import { env } from "../../config/env";

const repository = new PaymentRepository();

export const razorpayWebhook = async (
  req: Request,
  res: Response
) => {

  try {

    const signature =
      req.headers["x-razorpay-signature"] as string;

    if (!signature) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Missing signature",
        });
    }

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          env.RAZORPAY_WEBHOOK_SECRET!
        )
        .update(
          JSON.stringify(req.body)
        )
        .digest("hex");

    if (signature !== expectedSignature) {

      return res
        .status(401)
        .json({
          success: false,
          message: "Invalid signature",
        });

    }

    const event =
      req.body.event;

    const payload =
      req.body.payload.payment.entity;

    if (event === "payment.captured") {

      const payment =
        await repository.findPaymentByOrderId(
          payload.order_id
        );

      if (
        payment &&
        payment.status !== "SUCCESS"
      ) {

        await repository.updatePaymentSuccess(

          payment.id,

          payload.id,

          signature

        );

      }

    }

    if (event === "payment.failed") {

      const payment =
        await repository.findPaymentByOrderId(
          payload.order_id
        );

      if (payment) {

        await repository.updatePaymentFailed(
          payment.id
        );

      }

    }

    return res.status(200).json({
      success: true,
    });

  }

  catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
    });

  }

};