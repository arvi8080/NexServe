import { Request, Response } from "express";
import { ReviewService } from "./review.service";

const reviewService =
  new ReviewService();

export class ReviewController {

  async create(
    req: Request,
    res: Response
  ) {

    const userId = req.user!.id;

    const review =
      await reviewService.createReview(
        userId,
        req.body
      );

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: review,
    });

  }

  async getVendorReviews(
    req: Request,
    res: Response
  ) {

    const vendorId = req.params.vendorId as string;

const reviews =
  await reviewService.getVendorReviews(vendorId);

    return res.status(200).json({
      success: true,
      data: reviews,
    });

  }

}

export const reviewController =
  new ReviewController();