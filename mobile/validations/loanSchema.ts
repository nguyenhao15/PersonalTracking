import z from 'zod';

const coerceNumber = (schema: z.ZodNumber) =>
  z
    .preprocess((val) => {
      if (typeof val === 'string' && val.trim() === '') {
        return NaN;
      }
      return Number(val);
    }, schema)
    .refine((val) => !isNaN(Number(val)), {
      message: 'Amount is required',
    });

export const loanSchema = z.object({
  amount: coerceNumber(
    z.number().min(1, { message: 'Amount must be greater than 0' }),
  ),
  date: z.date().refine((date) => !isNaN(Date.parse(date.toString())), {
    message: 'Invalid date format',
  }),
  walletId: coerceNumber(
    z.number().refine((value) => value > 0, {
      message: 'Wallet is required',
    }),
  ),
  type: z.enum(['borrow', 'lend']),
  description: z.string().optional(),
});

export type LoanInput = z.infer<typeof loanSchema>;
export type LoanOutput = z.output<typeof loanSchema>;
