import { z } from "zod";

export const createPurposeSchema = z.object({
  name: z.string().min(1, "Invalid name"),
});

export type createPurposeSchemaType = z.infer<typeof createPurposeSchema>;
