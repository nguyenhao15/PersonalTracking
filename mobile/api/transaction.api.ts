import { TRANSACTIONS_API } from '@/const/api.endpoiont';
import axiosClient from '@/lib/axiosClient';

export const transactionApi = {
  getTransactions: async ({ signal }: { signal?: AbortSignal }) => {
    return await axiosClient.get(`${TRANSACTIONS_API}/user`, { signal });
  },

  createNewTransaction: async (data: any) => {
    return await axiosClient.post(TRANSACTIONS_API, data);
  },
};
