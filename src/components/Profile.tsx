import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import axiosInstance from "../api/axios";
import handleApiError from "../utils/handleApiError";
import { authService } from "../utils/authService";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { profile, userProfile, logout } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosInstance.get("/profile");
        if (res.data?.user) {
          userProfile(res.data.user);
        }
      } catch (err) {
        console.log(handleApiError(err));
      }
    }
    fetchData();
  }, [userProfile]);
  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      await authService.clearToken();
      logout(); // clear user from store
      console.log(res.data.message);
      navigate("/login"); // redirect to login
      console.log(res.data.message);
    } catch (err) {
      console.log(handleApiError(err));
    }
  };
  if (!profile)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading...
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Profile
        </h1>
        <div className="space-y-2">
          <p className="text-gray-700">
            <span className="font-medium">Name:</span> {profile.name ?? "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Age:</span> {profile.age ?? "N/A"}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
