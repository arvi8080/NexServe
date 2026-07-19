import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  profileImage: z.string().url().optional(),

  
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
});