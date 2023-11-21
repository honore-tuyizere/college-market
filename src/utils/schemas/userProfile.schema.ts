import { z } from "zod";

export const createProfileSchema = z.object({
    bankName: z.string().min(1, "Invalid bank Name"),
    bankAccount: z.string().min(1, "Invalid Bank Account"),
    phone: z.string().min(1, "Invalid Telephone number"),
});

export type createProfileSchemaType = z.infer<typeof createProfileSchema>;
