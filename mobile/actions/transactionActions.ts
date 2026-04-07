import { transactionApi } from '@/api/transaction.api';

export const getTransactionAction = async ({
  signal,
}: {
  signal?: AbortSignal;
}) => {
  const res = await transactionApi.getTransactions({ signal });
  return res.data;
};

export const createTransactionAction = async (data: any) => {
  const res = await transactionApi.createNewTransaction(data);
  return res.data;
};
