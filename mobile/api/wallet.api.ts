import { WALLET_API } from '@/const/api.endpoiont';
import axiosClient from '@/lib/axiosClient';

export const walletApi = {
  getUserWallets: ({ signal }: { signal?: AbortSignal }) => {
    return axiosClient.get(`${WALLET_API}/user/all`, { signal });
  },

  getWalletBalance: ({ signal }: { signal?: AbortSignal }) => {
    return axiosClient.get(`${WALLET_API}/user/total-balance`, { signal });
  },

  createWallet: (data: any) => {
    return axiosClient.post(WALLET_API, data);
  },
};
