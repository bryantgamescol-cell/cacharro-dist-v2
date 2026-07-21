import { z } from "zod";

export const createBrandSchema = z.object({

  name: z.string().min(2, "El nombre es obligatorio"),

  logo: z.string().optional()

});

export const updateBrandSchema =
  createBrandSchema.partial();