import { create } from "zustand";
import { persist } from "zustand/middleware"; // Import persist middleware
import { authService } from "../utils/authService";

export interface UserProfile {
  _id: string;
  email?: string;
  name?: string;
  age?: number;
  mobileNumber?: string;
  emailVerified: boolean;
  mobileVerified: boolean;
  emailVerificationToken?: string;
  mobileVerificationOTP?: string;
  mobileVerificationExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;

  // ✅ Add missing fields
  profession?: string;
  interests?: string;
}


interface UserState {
  isAuthenticated: boolean;
  profile: UserProfile | null;
  isCreate: boolean;
  setIsCreate: () => void;
  authenticate: (data: string | null) => void;
  logout: () => void;
  userProfile: (profileData: UserProfile) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    // Wrap with persist middleware
    (set) => ({
      // state
      isAuthenticated: authService.isLoggedIn(),
      profile: null,
      isCreate: false,
      isLoading: false,

      // actions
      setIsCreate: () => set({ isCreate: true }),
      logout: () => {
        authService.clearToken();
        set({ isAuthenticated: false, profile: null, isCreate: false });
      },
      userProfile: (profileData: UserProfile) => set({ profile: profileData }),
      setIsLoading: (value) => set({ isLoading: value }),

      // Updated authenticate function to handle token validation
      authenticate: (token) => {
        if (token) {
          authService.setToken(token);
          set({ isAuthenticated: authService.isLoggedIn() });
        } else {
          set({ isAuthenticated: false });
        }
      },
    }),
    {
      name: "user-storage", // Unique name for storage
      // Only persist the profile data, not loading states
      partialize: (state) => ({
        profile: state.profile,
        isCreate: state.isCreate,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
