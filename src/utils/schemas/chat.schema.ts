import { z } from "zod";

export const messageSchema = z.object({
  text: z.string().min(1, "Invalid message"),
});

export type messageSchemaType = z.infer<typeof messageSchema>;
