import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Invalid name"),
});

export type createCategorySchemaType = z.infer<typeof createCategorySchema>;
