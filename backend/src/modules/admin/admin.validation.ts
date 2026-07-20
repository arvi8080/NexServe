import { z } from "zod";

export const updateVendorStatusSchema = z.object({
  status: z.enum([
    "APPROVED",
    "REJECTED",
  ]),
});