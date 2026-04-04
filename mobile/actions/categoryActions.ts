import { categoryApi } from '@/api/category.api';

export const getCategoryActions = async (type: 'EXPENSE' | 'INCOME') => {
  const response = await categoryApi.getCategories(type);
  return response.data;
};
