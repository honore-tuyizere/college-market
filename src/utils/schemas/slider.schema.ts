import { z } from "zod";

export const createSliderSchema = z.object({
    title: z.string().min(1, "Invalid title"),
    photo: z.any(),
    description: z.string().min(1, "Description is required"),
    type: z.string().min(1, "type is required"),
});

export type createSliderSchemaType = z.infer<typeof createSliderSchema>;
