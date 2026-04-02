import { getDashboardDataAction } from '@/actions/dashboardActions';
import { DashboardQuery } from '@/api/dashboard.api';
import { useQuery } from '@tanstack/react-query';

export const useGetDashboardData = (query: DashboardQuery, options = {}) => {
  return useQuery({
    queryKey: ['dashboard', query],
    queryFn: async () => {
      const response = await getDashboardDataAction(query);
      return response;
    },
    ...options,
    staleTime: 'static',
    refetchOnMount: false,
  });
};
