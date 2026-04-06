import {
  createTransactionAction,
  getTransactionAction,
} from '@/actions/transactionActions';
import { TransactionInput } from '@/validations/transactionSchema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const res = await getTransactionAction();
      return res;
    },
    throwOnError: true,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
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
    },
    onError: (error) => {
      throw error;
    },
  });
};
