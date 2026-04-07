import { getCurrencyAction } from '@/actions/currencyActions';
import { useQuery } from '@tanstack/react-query';

export const useGetCurrency = () => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: async () => {
      const res = await getCurrencyAction();
      return res;
    },
    staleTime: Infinity, // Dữ liệu tiền tệ hiếm khi thay đổi, có thể đặt thành Infinity
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
