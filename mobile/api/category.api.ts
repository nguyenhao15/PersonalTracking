import { CATEGORIES_API } from '@/const/api.endpoiont';
import axiosClient from '@/lib/axiosClient';

export const categoryApi = {
  getCategories: async (type: 'expense' | 'income') => {
    return await axiosClient.get(`${CATEGORIES_API}/user/categories/${type}`);
  },
};
