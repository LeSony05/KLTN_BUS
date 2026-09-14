// /src/context/useAuthStore.ts
import { create } from 'zustand';
import { UserRole } from '../config/enums';
import { STORAGE_KEYS } from '../config/constants';

export interface UserProfile {
  id: string;
  phone: string;
  fullName: string;
  role: UserRole;
  address?: string;
  avatarUrl?: string;
  isPhonePublic: boolean;
  memberCode?: string;
  createdAt: string;
  status: 'ACTIVE' | 'BLOCKED';
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: UserProfile) => void;
  logout: () => void;
  updateUser: (user: Partial<UserProfile>) => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  login: (token: string, user: UserProfile) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(user));
    }
    set({ token, user, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_INFO);
    }
    set({ token: null, user: null, isAuthenticated: false, isLoading: false });
  },

  updateUser: (updatedFields: Partial<UserProfile>) => {
    set((state) => {
      if (!state.user) return state;
      const newUser = { ...state.user, ...updatedFields };
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(newUser));
      }
      return { user: newUser };
    });
  },

  initialize: () => {
    if (typeof window === 'undefined') {
      set({ isLoading: false });
      return;
    }

    try {
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const userStr = localStorage.getItem(STORAGE_KEYS.USER_INFO);
      if (token && userStr) {
        const user = JSON.parse(userStr) as UserProfile;
        set({ token, user, isAuthenticated: true, isLoading: false });
      } else {
        set({ token: null, user: null, isAuthenticated: false, isLoading: false });
      }
    } catch {
      set({ token: null, user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
