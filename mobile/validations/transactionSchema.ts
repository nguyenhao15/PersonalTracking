import { z } from 'zod';

export const transactionSchema = z.object({
  amount: z.number().min(0, { message: 'Amount must be a positive number' }),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  walletId: z.string().min(1, { message: 'Wallet ID is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  description: z.string().optional(),
});

export type TransactionInput = z.infer<typeof transactionSchema>;
