import { dashboardApi, DashboardQuery } from '@/api/dashboard.api';

export const getDashboardDataAction = async (query: DashboardQuery) => {
  const response = await dashboardApi.getDashboard(query);
  return response.data;
};
