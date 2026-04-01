import { useGetExpenses } from './useExpenses';
import { useGetWalletBalance, useGetWallets } from './useWallets';

export const useInitialData = () => {
  const {
    data: expenses,
    isLoading: isLoadingExpenses,
    error: expensesError,
  } = useGetExpenses();
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
    isLoadingExpenses || isLoadingWallet || isLoadingWalletBalance;
  const error =
    expensesError?.response?.data.message ||
    walletError?.response?.data.message ||
    walletBalanceError?.response?.data.message;

  return {
    expenses,
    wallet,
    isLoading,
    error,
    walletBalance,
  };
};
