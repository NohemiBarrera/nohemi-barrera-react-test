import { z } from 'zod';

export const productSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  price: z
    .number()
    .min(0.01, 'Price must be greater than 0')
    .max(999999.99, 'Price must not exceed 999,999.99'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
  category: z
    .string()
    .min(2, 'Category must be at least 2 characters')
    .max(50, 'Category must not exceed 50 characters'),
});

export type ProductFormData = z.infer<typeof productSchema>;