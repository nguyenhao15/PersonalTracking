import { login, logout } from '@/actions/authActions';
import { useAuthStore } from '@/stores/AuthStores';
import { useMutation } from '@tanstack/react-query';

const USER_QUERY_KEY = ['user'] as const;
const USER_STALE_TIME = 1000 * 60 * 15;

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const response = await login(data);
      return response;
    },
    onSuccess: async (data) => {
      await useAuthStore.getState().setToken(data);
    },
    onError: (error) => {
      console.error('Login failed: ', error);
    },
  });
};

export const useLogOut = () => {
  return useMutation({
    mutationFn: async () => {
      await logout();
      useAuthStore.getState().logOut();
    },
    onSuccess: () => {},
    onError: (error) => {
      console.error('Logout failed: ', error);
    },
  });
};
