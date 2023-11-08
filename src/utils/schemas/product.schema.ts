import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Innvalid name"),
  condition: z.string().min(24, "Select condition"),
  category: z.string().min(24, "Select category"),
  thumbnail: z.any(),
  gallery: z.any(),
  price: z.coerce.number().min(1, "Enter price"),
  description: z.string().min(1, "Description is required"),
});

export type createProductSchemaType = z.infer<typeof createProductSchema>;