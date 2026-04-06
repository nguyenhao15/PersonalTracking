import { z } from 'zod';

const coerceNumber = (schema: z.ZodNumber) =>
  z
    .preprocess((val) => {
      if (typeof val === 'string' && val.trim() === '') {
        return NaN;
      }
      return Number(val);
    }, schema)
    .refine((val) => !isNaN(Number(val)), {
      message: 'Position level is required',
    });

export const transactionSchema = z.object({
  amount: coerceNumber(
    z.number().min(0, { message: 'Amount must be a positive number' }),
  ),
  date: z.date().refine((date) => !isNaN(Date.parse(date.toString())), {
    message: 'Invalid date format',
  }),
  walletId: coerceNumber(
    z.number().refine((value) => value > 0, {
      message: 'Wallet is required',
    }),
  ),
  categoryId: coerceNumber(
    z.number().refine((value) => value > 0, {
      message: 'Category is required',
    }),
  ),
  description: z.string().optional(),
  excludeReport: z.boolean().optional().default(false),
});

export type TransactionInput = z.infer<typeof transactionSchema>;
