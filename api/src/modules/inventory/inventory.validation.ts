import { z } from "zod";

export const createMovementSchema = z.object({

  productId: z.string(),

  type: z.enum([
    "ENTRY",
    "EXIT",
    "ADJUSTMENT"
  ]),

  quantity: z.number().int().positive(),

  reason: z.string().optional()

});