import { z } from "zod";


export const updateLocationSchema = z.object({

 latitude: z
   .number()
   .min(-90)
   .max(90),


 longitude: z
   .number()
   .min(-180)
   .max(180),


 isOnline: z
   .boolean()

});

export const nearbyQuerySchema = z.object({
  latitude: z
    .string()
    .transform((val) => parseFloat(val))
    .pipe(z.number().min(-90).max(90)),
  longitude: z
    .string()
    .transform((val) => parseFloat(val))
    .pipe(z.number().min(-180).max(180)),
  radius: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined))
    .pipe(z.number().positive().optional()),
});
