import {
  createWallet,
  getTotalBalanceByWallet,
  getWalletByUser,
} from '@/actions/walletActions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetWallets = () => {
  return useQuery({
    queryKey: ['wallets'],
    queryFn: async () => {
      const res = await getWalletByUser();
      return res;
    },
    staleTime: 'static',
  });
};

export const useGetWalletBalance = () => {
  return useQuery({
    queryKey: ['walletBalance'],
    queryFn: async () => {
      const res = await getTotalBalanceByWallet();
      return res;
    },
    staleTime: 'static',
  });
};

export const useCreateWallet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await createWallet(data);
      return res;
    },
    onSuccess: (variances, data) => {
      queryClient.setQueryData(['wallets'], (prevData: any) => {
        if (prevData) {
          return [...prevData, data];
        }
        return [data];
      });
      queryClient.setQueryData(['walletBalance'], (prevData: any) => {
        if (prevData) {
          return prevData + data.balance;
        }
        return data.balance;
      });
    },
  });
};
