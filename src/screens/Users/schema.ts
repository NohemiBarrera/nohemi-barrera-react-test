import { z } from 'zod';

export const userSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
});

export type UserFormData = z.infer<typeof userSchema>;