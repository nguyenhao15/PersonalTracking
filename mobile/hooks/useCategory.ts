import { getCategoryActions } from '@/actions/categoryActions';
import { useQuery } from '@tanstack/react-query';

export const useGetCategories = (type: 'EXPENSE' | 'INCOME', options = {}) => {
  return useQuery({
    queryKey: ['categories', type],
    queryFn: async () => {
      const response = await getCategoryActions(type);
      return response;
    },
    staleTime: 'static',
    ...options,
  });
};
