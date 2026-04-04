import { CATEGORIES_API } from '@/const/api.endpoiont';
import axiosClient from '@/lib/axiosClient';

export const categoryApi = {
  getCategories: async (type: 'EXPENSE' | 'INCOME') => {
    return await axiosClient.get(`${CATEGORIES_API}/user/categories/${type}`);
  },
};
