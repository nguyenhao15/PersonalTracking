import { walletApi } from '@/api/wallet.api';

export const getWalletByUser = async () => {
  const res = await walletApi.getUserWallets();
  return res.data;
};

export const getTotalBalanceByWallet = async () => {
  const res = await walletApi.getWalletBalance();
  return res.data;
};
