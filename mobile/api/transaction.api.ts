import { TRANSACTIONS_API } from '@/const/api.endpoiont';
import axiosClient from '@/lib/axiosClient';

export const transactionApi = {
  getTransactions: async () => {
    return await axiosClient.get(`${TRANSACTIONS_API}/user`);
  },
};
