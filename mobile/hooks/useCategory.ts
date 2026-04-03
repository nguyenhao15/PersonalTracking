import { getCategoryActions } from '@/actions/categoryActions';
import { useQuery } from '@tanstack/react-query';

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await getCategoryActions();
      return response;
    },
    staleTime: 'static',
  });
};
