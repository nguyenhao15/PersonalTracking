import z from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  categoryType: z.enum(
    ['expense', 'income'],
    'Category type must be either "expense" or "income"',
  ),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  includeInSummary: z.boolean().default(true),
});

export type CategoryInput = z.infer<typeof categorySchema>;
