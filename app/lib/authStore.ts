// import { create } from 'zustand';

// type User = {
//   id: string;
//   username: string;
//   avatarUrl: string;
//   email: string;
// } | null;

// type AuthStore = {
//   user: User;
//   setUser: (user: User) => void;
//   logout: () => void;
// };

// export const useAuthStore = create<AuthStore>((set) => ({
//   user: null,
//   setUser: (user) => set({ user }),
//   logout: () => set({ user: null }),
// }));


import { create } from "zustand";

interface User {
  username: string;
  avatarUrl: string;
  isLoggedIn: boolean;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
