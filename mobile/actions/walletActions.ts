import { walletApi } from '@/api/wallet.api';

export const getWalletByUser = async ({ signal }: { signal?: AbortSignal }) => {
  const res = await walletApi.getUserWallets({ signal });
  return res.data;
};

export const getTotalBalanceByWallet = async ({
  signal,
}: {
  signal?: AbortSignal;
}) => {
  const res = await walletApi.getWalletBalance({ signal });
  return res.data;
};

export const createWallet = async (data: any) => {
  const res = await walletApi.createWallet(data);
  return res.data;
};
