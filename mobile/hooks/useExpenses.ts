import { getExpenses } from '@/actions/expensesActions';
import { useQuery } from '@tanstack/react-query';

export const useGetExpenses = () => {
  return useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      const res = await getExpenses();

      return res;
    },
    throwOnError(error, query) {
      console.error('Error fetching expenses:', error);
      return true; // Rethrow the error to be caught by React Query
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
