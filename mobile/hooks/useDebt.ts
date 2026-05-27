import {
  createDebtAction,
  getUserDebtsAction,
  getDebtByIdAction,
  updateDebtAction,
  deleteDebtAction,
  cancelDebtAction,
  markDebtAsPaidAction,
} from '@/actions/debtActions';
import { useAppQuery } from '@/lib/queryHelpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useGetDebts = () => {
  return useAppQuery({
    queryKey: ['debts'],
    request: async ({ signal }) => {
      const res = await getUserDebtsAction({ signal });
      return res;
    },
    params: {},
    throwOnError: true,
    retry: false,
  });
};

export const useCreateDebt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-debt'],
    mutationFn: async (data: any) => {
      const res = await createDebtAction(data);
      return res;
    },
    onSuccess: () => {
      // Invalidate and refetch wallets & debts
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
      queryClient.invalidateQueries({ queryKey: ['walletBalance'] });
    },
    onError: (error) => {
      throw error;
    },
  });
};

export const useCancelDebt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['cancel-debt'],
    mutationFn: async (id: number) => {
      const res = await cancelDebtAction(id);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
      queryClient.invalidateQueries({ queryKey: ['walletBalance'] });
    },
    onError: (error) => {
      throw error;
    },
  });
};

export const useMarkDebtAsPaid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['mark-debt-paid'],
    mutationFn: async (id: number) => {
      const res = await markDebtAsPaidAction(id);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
      queryClient.invalidateQueries({ queryKey: ['walletBalance'] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
