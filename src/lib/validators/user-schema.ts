import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }).optional().or(z.literal('')),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }).optional().or(z.literal('')),
  roleId: z.coerce.number().min(1, { message: 'Role is required.' }),
  isActive: z.boolean().default(true),
});

export type UserFormValues = z.infer<typeof userSchema>;
