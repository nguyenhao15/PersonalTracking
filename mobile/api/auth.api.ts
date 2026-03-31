import { AUTH_API } from '@/const/api.endpoiont';
import axiosClient from '@/lib/axiosClient';

export const authApi = {
  login: async (data: { username: string; password: string }) => {
    return await axiosClient.post(`${AUTH_API}/login`, data);
  },

  logout: async () => {
    return await axiosClient.post(`${AUTH_API}/logout`);
  },

  
};
