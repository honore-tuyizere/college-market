import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Innvalid name"),
  condition: z.string().min(24, "Select condition"),
  category: z.string().min(24, "Select category"),
  purpose: z.string().min(24, "Select purpose"),
  thumbnail: z.any(),
  gallery: z.any(),
  price: z.coerce.number().min(1, "Enter price"),
  isAvailable: z.boolean().optional(),
  description: z.string().min(1, "Description is required"),
});

export const filterProductSchema = z.object({
  categories: z.array(z.string()),
  colleges: z.array(z.string()),
});

export type createProductSchemaType = z.infer<typeof createProductSchema>;
export type filterProductSchemaType = z.infer<typeof filterProductSchema>;
