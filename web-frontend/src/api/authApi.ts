import axiosClient from '../lib/axiosClient';

export const authApi = {
  login: (data: { username: string; password: string }) => {
    return axiosClient.post('/auth/login', data);
  },

  refreshToken: (refreshToken: string) => {
    return axiosClient.post('/auth/refresh-token', null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
  },
};
