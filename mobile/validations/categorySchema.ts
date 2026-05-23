import z from 'zod';

export const categorySchema = z.object({
  id: z.number(),
  name: z.string().min(5, 'Category name is required'),
  categoryType: z.boolean(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  includeInSummary: z.boolean().default(true),
});

export const createCategorySchema = categorySchema.omit({id: true});

export type CategoryInput = z.infer<typeof categorySchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
