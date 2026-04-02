import { DASHBOARD_API } from '@/const/api.endpoiont';
import axiosClient from '@/lib/axiosClient';

export enum GroupBy {
  DAY = 'day',
  MONTH = 'month',
  QUARTER = 'quarter',
  YEAR = 'year',
}

export interface DashboardQuery {
  startDate?: Date;
  endDate?: Date;
  groupBy?: GroupBy;

  excludeHidden?: boolean; // Mặc định ẩn các loại thu chi đã chỉ định
}

export const dashboardApi = {
  getDashboard: async (query: DashboardQuery) => {
    return await axiosClient.get(`${DASHBOARD_API}/statistics`, {
      params: query,
    });
  },
};
