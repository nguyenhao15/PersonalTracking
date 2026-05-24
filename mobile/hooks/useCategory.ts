import { createNewCategory, getCategoryActions } from '@/actions/categoryActions';
import { useAppQuery } from '@/lib/queryHelpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useGetCategories = (type: 'expense' | 'income', options = {}) => {
  return useAppQuery({
    queryKey: ['categories', type],
    request: async ({ signal }) => getCategoryActions({ type: type, signal }),
    params: { type },
    ...options,
  });
};

export const useCreateNewCategoru = (options ={}) => {
  const queryClient = useQueryClient( )
  return useMutation({
    mutationKey: ['create-category'],
    mutationFn: async (category: any) => {
      return await createNewCategory(category);
    },
    ...options,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['categories', variables.categoryType], (prev: any[]) => {
        return [...prev, data];
      });
    },
  });
};
