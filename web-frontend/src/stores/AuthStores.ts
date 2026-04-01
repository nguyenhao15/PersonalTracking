import { create } from 'zustand';
import type { UserResponseObjectType } from '../validations/userSchema';
import { queryClient } from '../lib/queryClient';

type AuthState = {
  user: UserResponseObjectType | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  setToken: (token: {
    accsess_token: string;
    refresh_token: string;
    username: string;
  }) => void;
  setUser: (user: UserResponseObjectType | null) => void;
  logOut: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  setUser: (user) => set({ user }),
  setToken: (token) =>
    set({
      accessToken: token.accsess_token,
      refreshToken: token.refresh_token,
    }),

  logOut: () => set({ user: null, accessToken: null, refreshToken: null }),
}));

export const handleLogout = () => {
  const { logOut } = useAuthStore.getState();
  logOut();
  localStorage.removeItem('isLoggedIn');
  queryClient.clear();
  localStorage.clear();
};
