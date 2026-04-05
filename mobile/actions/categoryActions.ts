import { categoryApi } from '@/api/category.api';

export const getCategoryActions = async (type: 'expense' | 'income') => {
  const response = await categoryApi.getCategories(type);
  return response.data;
};
