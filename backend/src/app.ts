import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler } from "./common/middleware/error.middleware";
import routes from "./routes";


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(errorHandler);
app.use(routes);

app.use("/api/v1", routes);

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "NexServe Backend Running Successfully",
  });
});

export default app;