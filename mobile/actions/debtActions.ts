import { debtApi } from '@/api/debt.api';

export const getUserDebtsAction = async ({ signal }: { signal?: AbortSignal } = {}) => {
  const res = await debtApi.getUserDebts({ signal });
  return res.data;
};

export const getDebtByIdAction = async (id: number, { signal }: { signal?: AbortSignal } = {}) => {
  const res = await debtApi.getDebtById(id, { signal });
  return res.data;
};

export const createDebtAction = async (data: any) => {
  const res = await debtApi.createDebt(data);
  return res.data;
};

export const updateDebtAction = async (id: number, data: any) => {
  const res = await debtApi.updateDebt(id, data);
  return res.data;
};

export const deleteDebtAction = async (id: number) => {
  const res = await debtApi.deleteDebt(id);
  return res.data;
};

export const cancelDebtAction = async (id: number) => {
  const res = await debtApi.cancelDebt(id);
  return res.data;
};

export const markDebtAsPaidAction = async (id: number) => {
  const res = await debtApi.markDebtAsPaid(id);
  return res.data;
};
