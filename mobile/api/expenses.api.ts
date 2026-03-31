import { EXPENSES_API } from '@/const/api.endpoiont';
import axiosClient from '@/lib/axiosClient';

export const expensesApi = {
  getExpenses: async () => {
    return await axiosClient.get(`${EXPENSES_API}/user`);
  },
};
