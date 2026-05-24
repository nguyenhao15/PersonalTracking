import { categoryApi } from '@/api/category.api';

export const getCategoryActions = async ({
  type,
  signal,
}: {
  type: 'expense' | 'income';
  signal?: AbortSignal;
}) => {
  const response = await categoryApi.getCategories({ type, signal });
  return response.data;
};

export const createNewCategory = async (category: any) => {
  const response = await categoryApi.createCategory(category);
  return response.data;
};