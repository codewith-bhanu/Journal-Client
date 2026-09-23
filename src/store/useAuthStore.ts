import { create } from "zustand";

const API_URL = "http://localhost:3003/api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        set({ error: data.message || "Login failed", isLoading: false });
        return false;
      }
      
      set({ 
        user: data.data.user, 
        accessToken: data.data.accessToken,
        isLoading: false 
      });
      return true;
    } catch (err: any) {
      set({ error: err.message || "An error occurred", isLoading: false });
      return false;
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        set({ error: data.message || "Registration failed", isLoading: false });
        return false;
      }
      
      set({ 
        user: data.data.user, 
        accessToken: data.data.accessToken,
        isLoading: false 
      });
      return true;
    } catch (err: any) {
      set({ error: err.message || "An error occurred", isLoading: false });
      return false;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      set({ user: null, accessToken: null, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
