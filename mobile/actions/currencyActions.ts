import { currencyApi } from '@/api/currency.api';

export const getCurrencyAction = async () => {
  const currencies = await currencyApi.getCurrencies();
  return currencies;
};
