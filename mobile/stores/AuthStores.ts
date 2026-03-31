import { queryClient } from '@/lib/queryClient';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

type AuthResponse = {
  username: string;
  access_token: string;
  refresh_token?: string;
};

type AuthState = {
  username: string | null;
  accessToken: string | null;
  isHydrated: boolean;
  initializeAuth: () => Promise<void>;
  setToken: (payload: AuthResponse) => Promise<void>;
  syncAccessToken: (token: string | null) => void;
  logOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  username: null,
  accessToken: null,
  isHydrated: false,

  initializeAuth: async () => {
    try {
      const [token, username] = await Promise.all([
        SecureStore.getItemAsync('accessToken'),
        SecureStore.getItemAsync('username'),
      ]);

      set({
        accessToken: token,
        username,
        isHydrated: true,
      });
    } catch (error) {
      console.error('Failed to initialize auth state:', error);
      set({ isHydrated: true });
    }
  },

  setToken: async (data: AuthResponse) => {
    const { access_token, refresh_token, username } = data;

    await SecureStore.setItemAsync('accessToken', access_token);
    if (refresh_token) {
      await SecureStore.setItemAsync('refreshToken', refresh_token);
    }

    await SecureStore.setItemAsync('username', username);

    set({
      accessToken: access_token,
      username,
      isHydrated: true,
    });
  },

  syncAccessToken: (token) => {
    set({ accessToken: token });
  },

  logOut: async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('username');
    set({ username: null, accessToken: null, isHydrated: true });
  },
}));

export const handleLogout = () => {
  const { logOut } = useAuthStore.getState();
  logOut();
  queryClient.clear();
};
