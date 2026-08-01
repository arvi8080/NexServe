import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("5000"),

  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required")
    .default("postgresql://postgres:postgres@localhost:5432/glowhome"),

  JWT_ACCESS_SECRET: z
    .string()
    .min(32)
    .default("GlowHome_Access_Secret_Key_2026_123456789"),
  JWT_REFRESH_SECRET: z
    .string()
    .min(32)
    .default("GlowHome_Refresh_Secret_Key_2026_987654321"),

  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),

  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional(),
});

export const env = envSchema.parse(process.env);