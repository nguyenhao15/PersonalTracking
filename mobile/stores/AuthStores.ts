import { queryClient } from '@/lib/queryClient';
import { UserObject } from '@/validations/userSchema';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

type AuthResponse = {
  userInfo: UserObject;
  access_token: string;
  refresh_token?: string;
};

type AuthState = {
  userInfo: UserObject | null;
  accessToken: string | null;
  isHydrated: boolean;
  initializeAuth: () => Promise<void>;
  setToken: (payload: AuthResponse) => Promise<void>;
  syncAccessToken: (token: string | null) => void;
  logOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  userInfo: null,
  accessToken: null,
  isHydrated: false,

  initializeAuth: async () => {
    try {
      const [token, userInfo] = await Promise.all([
        SecureStore.getItemAsync('accessToken'),
        SecureStore.getItemAsync('userInfo'),
      ]);

      set({
        accessToken: token,
        userInfo: userInfo ? JSON.parse(userInfo) : null,
        isHydrated: true,
      });
    } catch (error) {
      console.error('Failed to initialize auth state:', error);
      set({ isHydrated: true });
    }
  },

  setToken: async (data: AuthResponse) => {
    const { access_token, refresh_token, userInfo } = data;

    await SecureStore.setItemAsync('accessToken', access_token);
    if (refresh_token) {
      await SecureStore.setItemAsync('refreshToken', refresh_token);
    }

    await SecureStore.setItemAsync('userInfo', JSON.stringify(userInfo));

    set({
      accessToken: access_token,
      userInfo: userInfo,
      isHydrated: true,
    });
  },

  syncAccessToken: (token) => {
    set({ accessToken: token });
  },

  logOut: async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('userInfo');
    set({ userInfo: null, accessToken: null, isHydrated: true });
  },
}));

export const handleLogout = () => {
  const { logOut } = useAuthStore.getState();
  logOut();
  queryClient.clear();
};
