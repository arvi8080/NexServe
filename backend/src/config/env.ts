import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  PORT: z.string().default("5000"),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
});

export const env = envSchema.parse(process.env);