import { CATEGORIES_API } from '@/const/api.endpoiont';
import axiosClient from '@/lib/axiosClient';

export const categoryApi = {
  getCategories: async ({
    type,
    signal,
  }: {
    type: 'expense' | 'income';
    signal?: AbortSignal;
  }) => {
    return await axiosClient.get(`${CATEGORIES_API}/user/categories/${type}`, {
      signal,
    });
  },

  createCategory: async (category: any) => {
    return await axiosClient.post(`${CATEGORIES_API}`, category);
  },
};
