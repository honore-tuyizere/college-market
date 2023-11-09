import { z } from "zod";

export const orderSchema = z.object({
  phone: z.string().min(1, "Enter price"),
});

export type orderSchemaType = z.infer<typeof orderSchema>;
