import { authApi } from '@/api/auth.api';

export const login = async (data: { username: string; password: string }) => {
  const res = await authApi.login(data);
  return res.data;
};

export const logout = async () => {
  const res = await authApi.logout();
  return res.data;
};
