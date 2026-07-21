import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener mínimo 2 caracteres")
    .max(100),

  description: z
    .string()
    .max(255)
    .optional()
});