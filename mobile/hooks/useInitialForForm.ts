import { formatPrice } from '@/utils/formatValue';
import { useGetCategories } from './useCategory';
import { useInitialData } from './useInitialData';

interface UseInitialForFormProps {
  type?: 'EXPENSE' | 'INCOME';
}
export const useInitialForForm = ({ type }: UseInitialForFormProps) => {
  const { wallet, isLoading: isLoadingWallet } = useInitialData();
  const {
    data,
    isLoading: isLoadingCategories,
    error,
  } = useGetCategories(type || 'EXPENSE');

  const formatedWallet = wallet
    ? wallet.map((w: any) => ({
        name: w.walletName,
        description: formatPrice(w?.balance),
        ...w,
      }))
    : [];

  return {
    categories: data || [],
    wallets: formatedWallet,
    isLoading: isLoadingWallet || isLoadingCategories,
    error,
  };
};
