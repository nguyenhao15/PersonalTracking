import { expensesApi } from '@/api/expenses.api';

export const getExpenses = async () => {
  try {
    const res = await expensesApi.getExpenses();
    return res.data;
  } catch (error) {
    throw error;
    console.log('Error: ', error);
  }
};
