import { getTransactionAction } from '@/actions/transactionActions';
import { useQuery } from '@tanstack/react-query';

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
