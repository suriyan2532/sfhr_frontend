import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "requiredUsername"),
  password: z.string().min(1, "requiredPassword"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
