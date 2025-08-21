import { useForm } from "react-hook-form";
import axiosInstance from "../api/axios";

import handleApiError from "../utils/handleApiError";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authService } from "../utils/authService";

interface IFormInput {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, authenticate } = useUserStore();
  const navigate = useNavigate();
  const onSubmit = async (data: IFormInput) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      console.log(res.data);
      if (res.data.success) {
        console.log("Token from server:", res.data.token);
        authService.setToken(res.data.token);
        authenticate();
        navigate("/createProfile");
        reset();
      }
    } catch (err) {
      setError(handleApiError(err));
    }
  };
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}
        {isAuthenticated && (
          <p className="text-green-600 text-sm mt-4 text-center">
            Login successfully
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
