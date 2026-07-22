import { z } from "zod";

export const createServiceSchema = z.object({
  title: z
    .string()
    .min(3),

  description: z
    .string()
    .min(10),

  category: z.enum([
    "FACIAL",
    "HAIR_CUT",
    "HAIR_SPA",
    "HAIR_COLOR",
    "WAXING",
    "THREADING",
    "MANICURE",
    "PEDICURE",
    "PARTY_MAKEUP",
    "BRIDAL_MAKEUP",
  ]),

  price: z
    .number()
    .positive(),

  duration: z
    .number()
    .int()
    .positive(),

  image: z
    .string()
    .url()
    .optional(),
});

export const updateServiceSchema = z.object({
  title: z
    .string()
    .min(3)
    .optional(),

  description: z
    .string()
    .min(10)
    .optional(),

  category: z.enum([
    "FACIAL",
    "HAIR_CUT",
    "HAIR_SPA",
    "HAIR_COLOR",
    "WAXING",
    "THREADING",
    "MANICURE",
    "PEDICURE",
    "PARTY_MAKEUP",
    "BRIDAL_MAKEUP",
  ]).optional(),

  price: z
    .number()
    .positive()
    .optional(),

  duration: z
    .number()
    .int()
    .positive()
    .optional(),

  image: z
    .string()
    .url()
    .optional(),

  isActive: z
    .boolean()
    .optional(),
});

export const serviceQuerySchema = z.object({
  category: z
    .enum([
      "FACIAL",
      "HAIR_CUT",
      "HAIR_SPA",
      "HAIR_COLOR",
      "WAXING",
      "THREADING",
      "MANICURE",
      "PEDICURE",
      "PARTY_MAKEUP",
      "BRIDAL_MAKEUP",
    ])
    .optional(),
  minPrice: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined))
    .pipe(z.number().min(0).optional()),
  maxPrice: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined))
    .pipe(z.number().min(0).optional()),
  city: z
    .string()
    .optional(),
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
});

export const searchQuerySchema = z.object({
  q: z
    .string()
    .optional(),
  category: z
    .enum([
      "FACIAL",
      "HAIR_CUT",
      "HAIR_SPA",
      "HAIR_COLOR",
      "WAXING",
      "THREADING",
      "MANICURE",
      "PEDICURE",
      "PARTY_MAKEUP",
      "BRIDAL_MAKEUP",
    ])
    .optional(),
  city: z
    .string()
    .optional(),
  minPrice: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined))
    .pipe(z.number().min(0).optional()),
  maxPrice: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined))
    .pipe(z.number().min(0).optional()),
});
