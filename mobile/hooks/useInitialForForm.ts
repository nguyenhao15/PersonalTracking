import { formatPrice } from '@/utils/formatValue';
import { useGetCategories } from './useCategory';
import { useInitialData } from './useInitialData';

interface UseInitialForFormProps {
  type?: 'expense' | 'income';
}
export const useInitialForForm = ({ type }: UseInitialForFormProps) => {
  const { wallet, isLoading: isLoadingWallet } = useInitialData();
  const {
    data,
    isLoading: isLoadingCategories,
    error,
  } = useGetCategories(type || 'expense');

  const formatedWallet = wallet
    ? wallet.map((w: any) => ({
        titleField: w.walletName,
        descriptionField: 'Số dư: ' + formatPrice(w.balance),
        ...w,
      }))
    : [];

  const formatedCategories = data
    ? data.map((c: any) => ({
        titleField: c.name,
        descriptionField: c.description || '',
        ...c,
      }))
    : [];

  return {
    categories: formatedCategories,
    wallets: formatedWallet,
    isLoading: isLoadingWallet || isLoadingCategories,
    error,
  };
};
