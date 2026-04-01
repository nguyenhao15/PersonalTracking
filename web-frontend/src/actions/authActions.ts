import { authApi } from '../api/authApi';

export const loginAction = async (username: string, password: string) => {
  const res = await authApi.login({ username, password });
  return res.data;
};
