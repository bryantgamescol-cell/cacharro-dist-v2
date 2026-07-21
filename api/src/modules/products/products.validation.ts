import { z } from "zod";

export const createProductSchema = z.object({

  name: z.string()
    .min(2, "El nombre es obligatorio")
    .max(150),

  description: z.string().optional(),

  purchasePrice: z.number().positive(),

  salePrice: z.number().positive(),

  stock: z.number().int().min(0),

  sku: z.string().optional(),

  barcode: z.string().optional(),

  image: z.string().optional(),

  categoryId: z.string(),

  brandId: z.string(),

  supplierId: z.string().optional(),

  active: z.boolean().optional()

});

export const updateProductSchema =
  createProductSchema.partial();