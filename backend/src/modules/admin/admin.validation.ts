import { z } from "zod";

export const updateVendorStatusSchema = z.object({
  status: z.enum([
    "APPROVED",
    "REJECTED",
  ]),
});

export const pendingVendorsQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int().positive().optional()),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int().positive().optional()),
  search: z
    .string()
    .optional(),
});
