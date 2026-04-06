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

export const transferSchema = z.object({
  amount: coerceNumber(
    z.number().min(0, { message: 'Amount must be a positive number' }),
  ),
  date: z.date().refine((date) => !isNaN(Date.parse(date.toString())), {
    message: 'Invalid date format',
  }),
  fromWalletId: coerceNumber(
    z.number().refine((value) => value > 0, {
      message: 'From Wallet is required',
    }),
  ),
  toWalletId: coerceNumber(
    z.number().refine((value) => value > 0, {
      message: 'To Wallet is required',
    }),
  ),
  description: z.string().optional(),
  fee: coerceNumber(
    z.number().min(0, { message: 'Fee must be a positive number' }),
  ).optional(),
});

export type TransferInput = z.infer<typeof transferSchema>;
