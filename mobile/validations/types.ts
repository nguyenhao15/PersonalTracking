export abstract class BaseObject {
  id?: string | number;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string | number;
  updatedBy?: string | number;
}

export interface WalletObject extends BaseObject {
  walletName?: string;
  balance?: number;
  walletType?: number;
  description?: string;
  isActive: boolean;
  currency?: string;
}

export interface TransactionObject extends BaseObject {
  description?: string;
  amount?: number;
  originalAmount: number;
  date?: string;
  categoryId?: string;
  walletId?: string | number;
  category?: {
    id?: string | number;
    name?: string;
  };
  wallet?: {
    id?: string | number;
    walletName?: string;
  };
  transactionType?: string;
}
