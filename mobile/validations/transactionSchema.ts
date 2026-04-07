import { z } from 'zod';

const tagEnum = z.enum(['nice-to-have', 'must-have', 'not-necessary']);

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
  baseAmount: coerceNumber(
    z.number().min(0, { message: 'Amount must be a positive number' }),
  ),
  baseCurrency: z.string().min(1, { message: 'Currency is required' }),
  originalAmount: coerceNumber(
    z.number().min(0, { message: 'Amount must be a positive number' }),
  ),
  originalCurrency: z.string().min(1, { message: 'Currency is required' }),

  exchangeRate: coerceNumber(
    z.number().min(0, { message: 'Exchange rate must be a positive number' }),
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
  tag: tagEnum,
  description: z.string().optional(),
  excludedFromReports: z.boolean().optional().default(false),
});

export type TransactionInput = z.infer<typeof transactionSchema>;
