import {
  createWallet,
  getTotalBalanceByWallet,
  getWalletByUser,
} from '@/actions/walletActions';
import { useAppQuery } from '@/lib/queryHelpers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetWallets = () => {
  return useAppQuery({
    queryKey: ['wallets'],
    request: async ({ signal }) => {
      const res = await getWalletByUser({ signal });
      return res;
    },
    params: {},
  });
};

export const useGetWalletBalance = () => {
  return useQuery({
    queryKey: ['walletBalance'],
    queryFn: async ({ signal }) => {
      const res = await getTotalBalanceByWallet({ signal });
      return res;
    },
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
