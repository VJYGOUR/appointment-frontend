import { useForm } from "react-hook-form";
import axiosInstance from "../api/axios";
import handleApiError from "../utils/handleApiError";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

interface ProfileFormValues {
  name: string;
  age: number;
  bio?: string;
  avatar?: string;
  profession?: string;
  interests?: string;
}

export default function CreateProfile() {
  const { setIsCreate, userProfile } = useUserStore(); // Make sure userProfile is included
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ProfileFormValues>();

  const avatarOptions = [
    "👨",
    "👩",
    "👨‍💼",
    "👩‍💼",
    "👨‍🔬",
    "👩‍🔬",
    "👨‍⚕️",
    "👩‍⚕️",
    "👨‍🎓",
    "👩‍🎓",
    "👨‍🍳",
    "👩‍🍳",
  ];

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setErrorMessage("");
      const profileData = {
        ...data,
        avatar: selectedAvatar || avatarOptions[0],
      };

      const res = await axiosInstance.post(
        "/profile/create-profile",
        profileData
      );
      console.log("Profile API Response:", res.data);

      if (res.data?.success) {
        setIsCreate();
        setSuccessMessage(res.data.message || "Profile created successfully!");

        // MAKE SURE TO STORE THE USER PROFILE DATA IN ZUSTAND
        if (res.data.user) {
          userProfile(res.data.user); // This stores the profile in Zustand
          console.log("Profile created for:", res.data.user.name);
        }

        setTimeout(() => {
          navigate("/profile-complete");
          reset();
        }, 1500);
      }
    } catch (err) {
      const error = handleApiError(err);
      setErrorMessage(error);
      console.error(error);
    }
  };

  const nameValue = watch("name");
  const bioValue = watch("bio");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="grid grid-cols-4 gap-2 rotate-45 transform scale-150">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="w-full h-16 border-2 border-white rounded-lg"
                ></div>
              ))}
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 relative z-10">
            Create Your Profile
          </h1>
          <p className="text-indigo-200 relative z-10">
            Tell us a bit about yourself
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Avatar Selection */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Choose Your Avatar
              </h3>
              <div className="grid grid-cols-6 gap-3 mb-4">
                {avatarOptions.map((avatar, index) => (
                  <div
                    key={index}
                    className={`text-3xl p-3 rounded-xl cursor-pointer transition-all duration-200 transform hover:scale-110 ${
                      selectedAvatar === avatar
                        ? "bg-indigo-100 border-2 border-indigo-500 shadow-md"
                        : "bg-gray-100 border border-gray-200 hover:bg-indigo-50"
                    }`}
                    onClick={() => setSelectedAvatar(avatar)}
                  >
                    {avatar}
                  </div>
                ))}
              </div>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Age Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                {...register("age", {
                  required: "Age is required",
                  min: { value: 1, message: "Age must be at least 1" },
                  max: { value: 120, message: "Age must be reasonable" },
                  valueAsNumber: true,
                })}
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="Enter your age"
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>

            {/* Profession Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Profession
              </label>
              <input
                type="text"
                {...register("profession")}
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="What do you do? (optional)"
              />
            </div>

            {/* Interests Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Interests
              </label>
              <input
                type="text"
                {...register("interests")}
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="Your hobbies and interests (optional)"
              />
            </div>

            {/* Bio Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                {...register("bio", {
                  maxLength: {
                    value: 200,
                    message: "Bio cannot exceed 200 characters",
                  },
                })}
                rows={3}
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="Tell us a bit about yourself (optional)"
              />
              <div className="text-xs text-gray-500 text-right">
                {bioValue?.length || 0}/200 characters
              </div>
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>

            {/* Preview Section */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Profile Preview
              </h3>
              <div className="flex items-center space-x-3">
                <div className="text-4xl">
                  {selectedAvatar || avatarOptions[0]}
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {nameValue || "Your Name"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {watch("age") ? `${watch("age")} years old` : "Age not set"}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-md"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                  Creating Profile...
                </div>
              ) : (
                "Create Profile"
              )}
            </button>

            {/* Messages */}
            {successMessage && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl animate-fadeIn">
                <p className="text-green-700 text-center font-medium">
                  {successMessage}
                </p>
              </div>
            )}

            {errorMessage && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl animate-fadeIn">
                <p className="text-red-700 text-center font-medium">
                  {errorMessage}
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Your profile helps us personalize your experience. You can update it
            anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
