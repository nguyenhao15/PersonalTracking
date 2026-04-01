import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../stores/AuthStores';
import { loginAction } from '../actions/authActions';

const USER_QUERY_KEY = ['user'] as const;
const USER_STALE_TIME = 1000 * 60 * 15;

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const response = await loginAction(data.username, data.password);
      localStorage.setItem('isLoggedIn', 'true');
      return response;
    },
    onSuccess: (data) => {
      useAuthStore.getState().setUser(data.userDTO);
      useAuthStore.getState().setToken(data);
    },
    onError: (error) => {
      console.error('Login failed: ', error);
    },
  });
};
