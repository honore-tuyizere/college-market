import { z } from "zod";

export const orderSchema = z.object({
  product: z.string().min(1, "Product is required"),
  days: z.coerce.number(),
});

export type orderSchemaType = z.infer<typeof orderSchema>;
