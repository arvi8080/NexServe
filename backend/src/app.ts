import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import routes from "./routes";
import { swaggerSpec } from "./docs/swagger";
import { errorHandler } from "./common/middleware/error.middleware";

const app = express();

// Razorpay webhook
app.use(
  "/api/payments/webhook",
  express.raw({
    type: "application/json",
  })
);

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Swagger Documentation
app.get("/api-docs.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use(
  ["/api-docs", "/api-docs/"],
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

// Routes
app.use("/api/v1", routes);

// Health Check
/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API server is healthy
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
app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "NexServe Backend Running Successfully",
  });
});

// Global Error Handler (always last)
app.use(errorHandler);

export default app;