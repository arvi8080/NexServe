import { z } from "zod";


export const vendorRegisterSchema = z.object({

  businessName: z
    .string()
    .min(3),

  description: z
    .string()
    .optional(),

  phone: z
    .string()
    .min(10),

  address: z
    .string()
    .min(5),

  city: z
    .string()
    .min(2),

  state: z
    .string()
    .min(2),

  country: z
    .string()
    .min(2),

});



export const updateVendorSchema = z.object({

  businessName: z
    .string()
    .min(3)
    .optional(),

  description: z
    .string()
    .optional(),

  phone: z
    .string()
    .min(10)
    .optional(),

  address: z
    .string()
    .min(5)
    .optional(),

  city: z
    .string()
    .min(2)
    .optional(),

  state: z
    .string()
    .min(2)
    .optional(),

  country: z
    .string()
    .min(2)
    .optional(),

});