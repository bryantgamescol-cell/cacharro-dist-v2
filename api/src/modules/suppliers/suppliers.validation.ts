import { z } from "zod";

export const createSupplierSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),

  email: z.email().optional(),

  phone: z.string().optional(),

  address: z.string().optional(),

  website: z.string().optional(),

  contact: z.string().optional()
});

export const updateSupplierSchema =
  createSupplierSchema.partial();