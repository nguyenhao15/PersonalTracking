import { DEBT_API } from '@/const/api.endpoiont';
import axiosClient from '@/lib/axiosClient';

export const debtApi = {
  getUserDebts: ({ signal }: { signal?: AbortSignal } = {}) => {
    return axiosClient.get(DEBT_API, { signal });
  },

  getDebtById: (id: number, { signal }: { signal?: AbortSignal } = {}) => {
    return axiosClient.get(`${DEBT_API}/${id}`, { signal });
  },

  createDebt: (data: any) => {
    return axiosClient.post(DEBT_API, data);
  },

  updateDebt: (id: number, data: any) => {
    return axiosClient.patch(`${DEBT_API}/${id}`, data);
  },

  deleteDebt: (id: number) => {
    return axiosClient.delete(`${DEBT_API}/${id}`);
  },

  cancelDebt: (id: number) => {
    return axiosClient.post(`${DEBT_API}/${id}/cancel`);
  },

  markDebtAsPaid: (id: number) => {
    return axiosClient.post(`${DEBT_API}/${id}/mark-as-paid`);
  },
};
export default debtApi;
