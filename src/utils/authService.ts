const TOKEN_KEY = "token";
export interface JwtPayload {
  id: string;
  email?: string;
  name?: string;
  iat?: number; // issued at
  exp?: number; // expiration time
  // add other fields your token contains
}
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
    // Get user data from token
  getUserData(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      // Decode the JWT token (without verification)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  },

  // Get user ID specifically
  getUserId(): string | null {
    const userData = this.getUserData();
    return userData?.id || userData?.id || null;
  }
};
