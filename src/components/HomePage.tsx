import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { authService } from "../utils/authService";
import { useEffect } from "react";

const HomePage = () => {
  const { isAuthenticated, logout, profile } = useUserStore();

  // Check if token is actually valid on component mount
  useEffect(() => {
    const token = authService.getToken();
    if (token && !authService.isLoggedIn()) {
      // Token exists but is expired
      logout(); // Automatically log out if token is expired
    }
  }, [logout]);

  const handleLogout = () => {
    logout();
  };

  // Get name from either profile or token
  const userName = profile?.name || authService.getUserName() || "User";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header with navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              AppointMe
            </h1>
          </div>

          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">
                Welcome, {userName}!
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center"
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Welcome Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition duration-300">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-full h-16 border-2 border-white rounded-lg"
                    ></div>
                  ))}
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 relative z-10">
                AppointMe
              </h1>
              <p className="text-blue-100 relative z-10">
                Schedule appointments with ease
              </p>
            </div>

            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center shadow-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              <p className="text-gray-600 text-center mb-8 text-lg">
                {isAuthenticated
                  ? "Manage your appointments and profile"
                  : "Get started by registering or logging into your account"}
              </p>

              <div className="space-y-4">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/register"
                      className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-4 px-4 rounded-xl transition-all duration-200 text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      Create Account
                    </Link>

                    <Link
                      to="/login"
                      className="block w-full border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 font-medium py-4 px-4 rounded-xl transition-all duration-200 text-center shadow-sm hover:shadow-md"
                    >
                      Sign In
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/dashboard"
                      className="block w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-medium py-4 px-4 rounded-xl transition-all duration-200 text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
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
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                      Go to Dashboard
                    </Link>

                    <Link
                      to="/date"
                      className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-4 px-4 rounded-xl transition-all duration-200 text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Book Appointment
                    </Link>

                    <Link
                      to="/createProfile"
                      className="block w-full border-2 border-indigo-300 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium py-4 px-4 rounded-xl transition-all duration-200 text-center shadow-sm hover:shadow-md flex items-center justify-center"
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Edit Profile
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
              <p className="text-xs text-gray-500">
                By continuing, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>

          {/* Right Column - Features/Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Why Choose AppointMe?
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: "⏰",
                    title: "24/7 Availability",
                    desc: "Book appointments anytime, anywhere",
                  },
                  {
                    icon: "🔔",
                    title: "Smart Reminders",
                    desc: "Never miss an appointment with our alerts",
                  },
                  {
                    icon: "📊",
                    title: "Easy Management",
                    desc: "Manage all your appointments in one place",
                  },
                  {
                    icon: "🔒",
                    title: "Secure & Private",
                    desc: "Your data is always protected",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-2xl mr-3">{feature.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-700">
                        {feature.title}
                      </h3>
                      <p className="text-gray-500 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isAuthenticated && (
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl">
                <h2 className="text-xl font-bold mb-4">Your Next Steps</h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
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
                    Complete your profile
                  </li>
                  <li className="flex items-center">
                    <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
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
                    Book your first appointment
                  </li>
                  <li className="flex items-center">
                    <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
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
                    Set up notifications
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Animated dots */}
        <div className="mt-12 text-center">
          <div className="inline-flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
