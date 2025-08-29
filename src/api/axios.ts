import axios from "axios";
import { authService } from "../utils/authService";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // if you're using cookies/sessions
  headers: {
    "Content-Type": "application/json",
  },
  // Add a request interceptor
});
axiosInstance.interceptors.request.use(async (config) => {
  const token = await authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default axiosInstance;
