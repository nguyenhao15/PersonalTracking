import { transactionApi } from '@/api/transaction.api';

export const getTransactionAction = async () => {
  const res = await transactionApi.getTransactions();
  return res.data;
};

export const createTransactionAction = async (data: any) => {
  const res = await transactionApi.createNewTransaction(data);
  return res.data;
};
