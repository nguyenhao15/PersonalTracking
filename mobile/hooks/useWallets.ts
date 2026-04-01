import {
  getTotalBalanceByWallet,
  getWalletByUser,
} from '@/actions/walletActions';
import { useQuery } from '@tanstack/react-query';

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
