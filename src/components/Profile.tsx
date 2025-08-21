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
  if (!profile) return <div>Loading...</div>; // handle null safely

  return (
    <div>
      <p>Name: {profile.name ?? "N/A"}</p>
      <p>Age: {profile.age ?? "N/A"}</p>
      <button onClick={handleLogout} className="cursor-pointer">
        Logout
      </button>
    </div>
  );
}
