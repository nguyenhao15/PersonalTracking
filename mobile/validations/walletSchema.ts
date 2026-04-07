import z from 'zod';

export interface WalletType {
  label: string;
  value: string;
}

export const WalletTypeEnum: WalletType[] = [
  { label: 'Tiền mặt', value: 'cash' },
  { label: 'Tài khoản ngân hàng', value: 'bank_account' },
  { label: 'Thẻ tín dụng', value: 'credit_card' },
  { label: 'Ví điện tử', value: 'e_wallet' },
  { label: 'Tài khoản đầu tư', value: 'investment_account' },
];

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
export const walletSchema = z.object({
  walletName: z.string().min(1, 'Wallet name is required'),
  walletType: z.string().default('cash'),
  description: z.string().optional(),
  currency: z.string().default('VND'),
  isActive: z.boolean().default(true),
  balance: coerceNumber(
    z.number().min(0, 'Balance must be a non-negative number'),
  ),
  color: z.string().optional(),
  icon: z.string().optional(),
});

export type WalletSchema = z.infer<typeof walletSchema>;
