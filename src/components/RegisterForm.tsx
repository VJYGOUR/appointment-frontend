import { useState } from "react";
import axiosInstance from "../api/axios"; // <-- use your custom axios.ts
import { useForm } from "react-hook-form";
import handleApiError from "../utils/handleApiError";

interface RegisterResponse {
  message: string;
  status?: string;
  userId?: string;
}
interface RegisterInput {
  email: string;
  password: string;
}

export default function RegisterForm() {
  const { register, handleSubmit, reset } = useForm<RegisterInput>();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true); // ✅ set loading before request
    setMessage(null);
    try {
      const res = await axiosInstance.post<RegisterResponse>(
        "/auth/register/email",
        data
      );
      setMessage({ text: res.data.message, type: "success" });
      reset();
    } catch (err) {
      setMessage({ text: handleApiError(err), type: "error" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Register</h2>

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full p-2 mb-3 border rounded-md"
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "password is required" })}
          className="w-full p-2 mb-3 border rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.type === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
}
