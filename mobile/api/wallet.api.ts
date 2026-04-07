import { WALLET_API } from '@/const/api.endpoiont';
import axiosClient from '@/lib/axiosClient';

export const walletApi = {
  getUserWallets: () => {
    return axiosClient.get(`${WALLET_API}/user/all`);
  },

  getWalletBalance: () => {
    return axiosClient.get(`${WALLET_API}/user/total-balance`);
  },

  createWallet: (data: any) => {
    return axiosClient.post(WALLET_API, data);
  },
};
