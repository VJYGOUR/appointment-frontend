const TOKEN_KEY = "token";

export const authService = {
  // Save token
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  // Get token
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Remove token
  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Check if logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};
