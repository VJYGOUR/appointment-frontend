import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { authService } from "../utils/authService";
import { useEffect } from "react";

const HomePage = () => {
  const { isAuthenticated, logout, profile } = useUserStore();

  useEffect(() => {
    const token = authService.getToken();
    if (token && !authService.isLoggedIn()) {
      logout();
    }
  }, [logout]);

  const userName = profile?.name || authService.getUserName() || "User";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80"
          alt="background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3 justify-center sm:justify-start"></div>
          {isAuthenticated && (
            <div className="relative w-full min-h-[80vh] bg-gradient-to-br from-indigo-100 to-purple-200 rounded-3xl shadow-lg p-6 overflow-hidden mb-10 flex flex-col items-center justify-center space-y-8">
              {/* Decorative floating shapes */}
              <div className="absolute top-10 left-10 w-24 h-24 bg-indigo-300 rounded-full opacity-30 animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-300 rounded-full opacity-30 animate-pulse"></div>

              {/* Greeting */}
              <h1 className="text-indigo-700 font-extrabold text-4xl sm:text-5xl md:text-6xl text-center drop-shadow-lg">
                Welcome, {userName}!
              </h1>
              <p className="text-gray-600 text-center text-base sm:text-lg md:text-xl max-w-3xl">
                Here’s what you can do today: manage your appointments, update
                your profile, and explore your dashboard—all in one place.
              </p>

              {/* Interactive cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
                {[
                  {
                    title: "Upcoming Appointments",
                    desc: "Check your next meetings and reminders",
                    color: "from-indigo-500 to-indigo-600",
                    icon: "📅",
                    link: "/date",
                  },
                  {
                    title: "Edit Profile",
                    desc: "Update your information and preferences",
                    color: "from-purple-500 to-purple-600",
                    icon: "👤",
                    link: "/createProfile",
                  },
                  {
                    title: "Dashboard",
                    desc: "View statistics and manage your account",
                    color: "from-green-500 to-emerald-600",
                    icon: "📊",
                    link: "/dashboard",
                  },
                ].map((card, i) => (
                  <Link
                    key={i}
                    to={card.link}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg text-white bg-gradient-to-r ${card.color} hover:scale-105 transition-transform duration-200`}
                  >
                    <span className="text-4xl mb-2">{card.icon}</span>
                    <h3 className="font-bold text-lg mb-1 text-center">
                      {card.title}
                    </h3>
                    <p className="text-sm text-center">{card.desc}</p>
                  </Link>
                ))}
              </div>

              {/* Optional bottom stats or motivational info */}
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <div className="bg-white/80 backdrop-blur-md rounded-xl px-4 py-2 shadow-md text-gray-700 font-medium">
                  You have <span className="font-bold">3</span> upcoming
                  appointments
                </div>
                <div className="bg-white/80 backdrop-blur-md rounded-xl px-4 py-2 shadow-md text-gray-700 font-medium">
                  Profile completion: <span className="font-bold">75%</span>
                </div>
                <div className="bg-white/80 backdrop-blur-md rounded-xl px-4 py-2 shadow-md text-gray-700 font-medium">
                  Notifications: <span className="font-bold">On</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Welcome Card */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
            <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 p-10 text-center">
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=1600&q=80"
                alt="appointments"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white relative z-10 drop-shadow-lg">
                AppointMe
              </h2>
              <p className="text-blue-100 relative z-10 mt-2 text-base sm:text-lg">
                Schedule appointments with ease
              </p>
            </div>

            <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-50 rounded-full flex items-center justify-center shadow-inner">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 sm:h-12 sm:w-12 text-indigo-600"
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

                <p className="text-gray-600 text-center mb-8 text-base sm:text-lg">
                  {isAuthenticated
                    ? "Manage your appointments and profile"
                    : "Get started by registering or logging into your account"}
                </p>

                <div className="space-y-4">
                  {!isAuthenticated ? (
                    <>
                      <Link
                        to="/register"
                        className="block w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:scale-105 text-white font-medium py-4 px-4 rounded-xl transition transform duration-200 text-center shadow-lg"
                      >
                        Create Account
                      </Link>

                      <Link
                        to="/login"
                        className="block w-full border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700 font-medium py-4 px-4 rounded-xl transition-all duration-200 text-center shadow-md"
                      >
                        Sign In
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/dashboard"
                        className="block w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:scale-105 text-white font-medium py-4 px-4 rounded-xl transition transform duration-200 text-center shadow-lg flex items-center justify-center"
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
                        className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 text-white font-medium py-4 px-4 rounded-xl transition transform duration-200 text-center shadow-lg flex items-center justify-center"
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
                        className="block w-full border-2 border-indigo-300 bg-indigo-50 hover:bg-indigo-100 hover:scale-105 text-indigo-700 font-medium py-4 px-4 rounded-xl transition transform duration-200 text-center shadow-md flex items-center justify-center"
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

              <div className="bg-gray-50 mt-10 p-6 text-center border-t border-gray-100 rounded-b-3xl">
                <p className="text-xs text-gray-500">
                  By continuing, you agree to our Terms of Service and Privacy
                  Policy
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
                Why Choose AppointMe?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  <div
                    key={index}
                    className="flex items-start space-x-3 bg-gray-50 p-4 rounded-xl hover:shadow-md transition"
                  >
                    <span className="text-3xl">{feature.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-700 text-lg">
                        {feature.title}
                      </h3>
                      <p className="text-gray-500 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isAuthenticated && (
              <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 sm:p-10 text-white shadow-2xl">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
                  Your Next Steps
                </h2>
                <ul className="space-y-3">
                  {[
                    "Complete your profile",
                    "Book your first appointment",
                    "Set up notifications",
                  ].map((step, i) => (
                    <li
                      key={i}
                      className="flex items-center text-sm sm:text-base"
                    >
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
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
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer Animation */}
        <div className="mt-16 text-center">
          <div className="inline-flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
