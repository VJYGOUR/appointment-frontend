import { create } from "zustand";
export interface UserProfile {
  _id: string;
  email?: string; // optional because mobileNumber might be used instead
  name?: string;
  age?: number;
  mobileNumber?: string; // optional because email might be used instead
  emailVerified: boolean;
  mobileVerified: boolean;
  emailVerificationToken?: string;
  mobileVerificationOTP?: string;
  mobileVerificationExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface UserState {
  isAuthenticated: boolean;
  profile: UserProfile | null;
  isCreate: boolean;
  setIsCreate: () => void;
  authenticate: () => void;
  logout: () => void;
  userProfile: (profileData: UserProfile) => void;
}

export const useUserStore = create<UserState>((set) => ({
  //state
  isAuthenticated: false,
  profile: null,
  isCreate: false,
  setIsCreate: () => {
    set({ isCreate: true });
  },
  logout: () => set({ isAuthenticated: false, profile: null }),

  userProfile: (profileData: UserProfile) => {
    set({ profile: profileData });
  },
  //actions
  authenticate: () => set({ isAuthenticated: true }),
}));
