import { CATEGORIES_API } from '@/const/api.endpoiont';
import axiosClient from '@/lib/axiosClient';

export const categoryApi = {
  getCategories: async () => {
    return await axiosClient.get(`${CATEGORIES_API}/user/categories`);
  },
};
