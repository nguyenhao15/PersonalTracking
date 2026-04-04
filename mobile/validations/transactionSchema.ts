import { any, object, z } from 'zod';

interface validObject {
  id: string;
  [field: string]: any;
}

export const transactionSchema = z.object({
  amount: z.number().min(0, { message: 'Amount must be a positive number' }),
  date: z.date().refine((date) => !isNaN(Date.parse(date.toString())), {
    message: 'Invalid date format',
  }),
  walletId: z
    .object<validObject>()
    .refine((obj) => (obj as validObject).id.trim() !== '', {
      message: 'Wallet is required',
    }),
  categoryId: z
    .object<validObject>()
    .refine((obj) => (obj as validObject).id.trim() !== '', {
      message: 'Category is required',
    }),
  description: z.string().optional(),
});

export type TransactionInput = z.infer<typeof transactionSchema>;
