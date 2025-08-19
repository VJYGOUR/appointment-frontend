import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // if you're using cookies/sessions
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
