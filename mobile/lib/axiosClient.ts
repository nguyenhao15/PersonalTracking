import { useAuthStore } from '@/stores/AuthStores';
import axios, { AxiosHeaders } from 'axios';
import * as SecureStore from 'expo-secure-store';

const axiosClient = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_BACKEND_API}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosClient.interceptors.request.use(
  async (config) => {
    console.log('🚀 Gửi API:', config.method?.toUpperCase(), config.url);
    console.log('📦 Data:', config.data);
    const accessToken =
      useAuthStore.getState().accessToken ||
      (await SecureStore.getItemAsync('accessToken'));

    if (!accessToken) {
      return config;
    }

    const headers = AxiosHeaders.from(config.headers);
    headers.set('Authorization', `Bearer ${accessToken}`);
    config.headers = headers;

    return config;
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url ?? '';
    const isAuthRequest =
      requestUrl.includes('/auth/login') ||
      requestUrl.includes('/auth/refresh');

    console.log('✅ Nhận API:', error.response?.status, error.config.url);

    if (!originalRequest || originalRequest._retry || isAuthRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            const headers = AxiosHeaders.from(originalRequest.headers);
            headers.set('Authorization', `Bearer ${token}`);
            originalRequest.headers = headers;
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');

        if (!refreshToken) {
          await useAuthStore.getState().logOut();
          return Promise.reject(error);
        }

        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_BACKEND_API}/api/v1/auth/refresh`,
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } },
        );

        const { access_token, refresh_token } = response.data;

        await SecureStore.setItemAsync('accessToken', access_token);

        if (refresh_token) {
          await SecureStore.setItemAsync('refreshToken', refresh_token);
        }

        useAuthStore.getState().syncAccessToken(access_token);

        processQueue(null, access_token);
        const headers = AxiosHeaders.from(originalRequest.headers);
        headers.set('Authorization', `Bearer ${access_token}`);
        originalRequest.headers = headers;

        return axiosClient(originalRequest);
      } catch (error) {
        await useAuthStore.getState().logOut();
        processQueue(error, null);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
