import { transactionApi } from '@/api/transaction.api';

export const getTransactionAction = async () => {
  try {
    const res = await transactionApi.getTransactions();
    return res.data;
  } catch (error) {
    throw error;
  }
};
