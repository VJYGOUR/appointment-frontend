import { create } from "zustand";
interface UserState {
  isAuthenticated: boolean;
  authenticate: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  //state
  isAuthenticated: false,

  //actions
  authenticate: () => set({ isAuthenticated: true }),
}));
