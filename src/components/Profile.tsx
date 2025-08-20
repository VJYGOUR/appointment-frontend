import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import axiosInstance from "../api/axios";
import handleApiError from "../utils/handleApiError";

export default function Profile() {
  const { profile, userProfile } = useUserStore();
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
  if (!profile) return <div>Loading...</div>; // handle null safely

  return (
    <div>
      <p>Name: {profile.name ?? "N/A"}</p>
      <p>Age: {profile.age ?? "N/A"}</p>
    </div>
  );
}
