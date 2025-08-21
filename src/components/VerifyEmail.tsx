import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // or next/router if Next.js
import axiosInstance from "../api/axios";
import handleApiError from "../utils/handleApiError";

export default function VerifyEmail() {
  const { token } = useParams<{ token: string }>(); // get token from URL
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axiosInstance.get(`/auth/verify-email/${token}`);
        setMessage(res.data?.message || "Your email has been verified!");
        setStatus("success");
        navigate("/login");
      } catch (err) {
        setMessage(handleApiError(err));
        setStatus("error");
      }
    };

    if (token) verifyEmail();
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
        {status === "loading" && (
          <p className="text-blue-600 text-lg font-medium">
            Verifying your email...
          </p>
        )}
        {status === "success" && (
          <p className="text-green-600 text-lg font-medium">{message}</p>
        )}
        {status === "error" && (
          <p className="text-red-500 text-lg font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
