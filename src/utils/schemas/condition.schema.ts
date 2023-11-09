import { z } from "zod";

export const createConditionSchema = z.object({
  name: z.string().min(1, "Invalid name"),
});

export type createConditionSchemaType = z.infer<typeof createConditionSchema>;
