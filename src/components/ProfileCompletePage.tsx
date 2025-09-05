import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import axiosInstance from "../api/axios";

const ProfileCompletePage = () => {
  const { profile } = useUserStore();
  const { width, height } = useWindowSize();
  const { userProfile } = useUserStore();
  const [confettiRunning, setConfettiRunning] = useState(true);
  const [showCelebration, setShowCelebration] = useState(true);

  // Stop confetti after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setConfettiRunning(false);
    }, 5000);

    const celebrationTimer = setTimeout(() => {
      setShowCelebration(false);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(celebrationTimer);
    };
  }, []);
  useEffect(() => {
    if (!profile) {
      axiosInstance.get("/profile/get-profile").then((res) => {
        if (res.data?.user) userProfile(res.data.user);
      });
    }
  }, [profile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti celebration */}
      {showCelebration && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={confettiRunning ? 200 : 0}
          recycle={false}
          gravity={0.3}
          colors={["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#3B82F6"]}
        />
      )}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            <div className="w-4 h-4 rounded-full bg-indigo-200 opacity-50"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02]">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-10 pattern-dots pattern-blue-500 pattern-bg-white pattern-size-4 pattern-opacity-20"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Profile Complete!
              </h1>
              <p className="text-indigo-200">Your profile is ready to go</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome aboard, {profile?.name}!
              </h2>
              <p className="text-gray-600">
                Your profile has been successfully created. Now you can start
                using all the features of AppointMe.
              </p>
            </div>

            {/* Profile Summary */}
            <div className="bg-indigo-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-indigo-800 mb-4">
                Your Profile Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">
                      {profile?.name || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="font-medium">
                      {profile?.age ? `${profile.age} years` : "Not provided"}
                    </p>
                  </div>
                </div>

                {profile?.profession && (
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Profession</p>
                      <p className="font-medium">{profile.profession}</p>
                    </div>
                  </div>
                )}

                {profile?.interests && (
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 极速11.5 4.5 0 015.561-5.56m5.56 5.56a4.5 4.5 0 01-5.56 5.56m-5.56-5.56a4.5 4.5 0 015.56-5.56"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Interests</p>
                      <p className="font-medium">{profile.interests}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Next Steps */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                What would you like to do next?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  to="/date"
                  className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white p-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 极速24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 极速9 9 0 0118 0z"
                    />
                  </svg>
                  Book an Appointment
                </Link>

                <Link
                  to="/dashboard"
                  className="border-2 border-indigo-300 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 p-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h极速a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  Go to Dashboard
                </Link>
              </div>
            </div>

            {/* Additional Options */}
            <div className="flex justify-center space-x-4">
              <Link
                to="/createProfile"
                className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Profile
              </Link>

              <span className="text-gray-300">•</span>

              <Link
                to="/"
                className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 极速0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Go to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Celebration message that fades out */}
        {showCelebration && (
          <div className="mt-8 text-center animate-pulse">
            <p className="text-purple-600 font-medium">
              🎉 Congratulations on completing your profile! 🎉
            </p>
          </div>
        )}
      </div>

      {/* Add custom CSS for animations */}
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh) rotate(360deg);
              opacity: 0;
            }
          }
          .animate-float {
            animation: float 15s linear infinite;
          }
          .pattern-dots {
            background-image: radial-gradient(currentColor 1px, transparent 1px);
            background-size: 10px 10px;
          }
        `}
      </style>
    </div>
  );
};

export default ProfileCompletePage;
