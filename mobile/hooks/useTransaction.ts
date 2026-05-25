import {
  createTransactionAction,
  getTransactionAction,
} from '@/actions/transactionActions';
import { useAppQuery } from '@/lib/queryHelpers';
import { TransactionInput } from '@/validations/transactionSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useGetTransactions = () => {
  return useAppQuery({
    queryKey: ['transactions'],
    request: async ({ signal }) => {
      const res = await getTransactionAction({ signal });
      return res;
    },
    params: {},
    throwOnError: true,
    retry: false,
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-transaction'],
    mutationFn: async (data: TransactionInput) => {
      const res = await createTransactionAction(data);
      return res;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
      queryClient.invalidateQueries({ queryKey: ['walletBalance'] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
