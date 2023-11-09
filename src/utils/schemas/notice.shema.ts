import { z } from "zod";

export const createNoticeSchema = z.object({
    name: z.string().min(1, "Invalid name"),
    photo: z.any(),
    description: z.string().min(1, "Description is required"),
});

export type createNoticeSchemaType = z.infer<typeof createNoticeSchema>;
