import { useForm } from "react-hook-form";

import axiosInstance from "../api/axios";
import handleApiError from "../utils/handleApiError";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

interface ProfileFormValues {
  name: string;
  age: number;
}

export default function CreateProfile() {
  const { setIsCreate } = useUserStore();
  const [d, setD] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ProfileFormValues>();

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const res = await axiosInstance.post("/profile/create-profile", data);

      if (res.data?.success) {
        setIsCreate();
        setD(res.data.message);
        navigate("/getProfile");
        reset();
        // update Zustand store
      }

      // clear form after success
    } catch (err) {
      console.error(handleApiError(err));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Create Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name field */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border rounded-lg p-2"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Age field */}
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            {...register("age", {
              required: "Age is required",
              min: { value: 1, message: "Age must be at least 1" },
            })}
            className="w-full border rounded-lg p-2"
            placeholder="Enter your age"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Profile"}
        </button>

        {/* Success message */}
        {isSubmitSuccessful && <p className="text-green-600 mt-2">{d}</p>}
      </form>
    </div>
  );
}
