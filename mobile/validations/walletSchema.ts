import z from 'zod';

export const walletSchema = z.object({
  walletName: z.string().min(1, 'Wallet name is required'),
  walletType: z.string().optional(),
  descripiton: z.string().optional(),
  currency: z.string().default('VND'),
  isActive: z.boolean().default(true),
  balance: z.number().min(0, 'Balance must be a non-negative number'),
  color: z.string().optional(),
  icon: z.string().optional(),
});
