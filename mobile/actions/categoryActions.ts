import { categoryApi } from '@/api/category.api';

export const getCategoryActions = async () => {
  const response = await categoryApi.getCategories();
  return response.data;
};
