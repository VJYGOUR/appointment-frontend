const TOKEN_KEY = "token";

export interface JwtPayload {
  id: string;
  email?: string;
  name?: string;
  iat?: number; // issued at
  exp?: number; // expiration time
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

  // Check if logged in (and token is valid)
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Check if token is expired
    const userData = this.getUserData();
    if (userData?.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return userData.exp > currentTime;
    }

    return true;
  },

  // Get user data from token
  getUserData(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      // Decode the JWT token (without verification)
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  },

  // Get user ID specifically
  getUserId(): string | null {
    const userData = this.getUserData();
    return userData?.id || null;
  },

  // Get user name from token
  getUserName(): string | null {
    const userData = this.getUserData();
    return userData?.name || null;
  },
};
