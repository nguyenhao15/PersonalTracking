import { useGetTransactions } from './useTransaction';
import { useGetWalletBalance, useGetWallets } from './useWallets';

export const useInitialData = () => {
  const {
    data: transactions,
    isLoading: isLoadingTransactions,
    error: transactionsError,
  } = useGetTransactions();

  const {
    data: wallet,
    isLoading: isLoadingWallet,
    error: walletError,
  } = useGetWallets();

  const {
    data: walletBalance,
    isLoading: isLoadingWalletBalance,
    error: walletBalanceError,
  } = useGetWalletBalance();

  const isLoading =
    isLoadingTransactions || isLoadingWallet || isLoadingWalletBalance;
  const error =
    (transactionsError as any)?.response?.data?.message ||
    (walletError as any)?.response?.data?.message ||
    (walletBalanceError as any)?.response?.data?.message;

  return {
    transactions,
    wallet,
    isLoading,
    error,
    walletBalance,
  };
};
