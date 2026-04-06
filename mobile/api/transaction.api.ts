import { TRANSACTIONS_API } from '@/const/api.endpoiont';
import axiosClient from '@/lib/axiosClient';

export const transactionApi = {
  getTransactions: async () => {
    return await axiosClient.get(`${TRANSACTIONS_API}/user`);
  },

  createNewTransaction: async (data: any) => {
    return await axiosClient.post(TRANSACTIONS_API, data);
  },
};
