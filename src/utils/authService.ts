const TOKEN_KEY = "token";

export const authService = {
  // Save token
  async setToken(token: string): Promise<void> {
    localStorage.setItem(TOKEN_KEY, token);
  },

  // Get token
  async getToken(): Promise<string | null> {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Remove token
  async clearToken(): Promise<void> {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Check if logged in
  async isLoggedIn(): Promise<boolean> {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};
