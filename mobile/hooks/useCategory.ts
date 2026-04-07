import { getCategoryActions } from '@/actions/categoryActions';
import { useAppQuery } from '@/lib/queryHelpers';

export const useGetCategories = (type: 'expense' | 'income', options = {}) => {
  return useAppQuery({
    queryKey: ['categories', type],
    request: async ({ signal }) => getCategoryActions({ type: type, signal }),
    params: { type },
    ...options,
  });
};
