import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(1, "requiredUsername"),
    email: z.string().email("invalidEmail"),
    password: z.string().min(6, "passwordTooShort"),
    confirmPassword: z.string().min(6, "passwordTooShort"),
    first_name: z.string().min(1, "requiredFirstName"),
    last_name: z.string().min(1, "requiredLastName"),
    nickname: z.string().optional(),
    phone: z.string().min(10, "invalidPhone").regex(/^\d+$/, "numericOnly"),
    department: z.string().min(1, "requiredDepartment"), // Will be parsed to number in submit
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwordMismatch",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
