import "react-calendar/dist/Calendar.css";
import { Navigate, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import RegisterForm from "./components/RegisterForm";
import VerifyEmail from "./components/VerifyEmail";
import { useUserStore } from "./store/useUserStore";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import CreateProfile from "./components/CreateProfile";
import DateSelect from "./components/DateSelect";
import HomePage from "./components/HomePage";
import ProfileCompletePage from "./components/ProfileCompletePage";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  const { isAuthenticated, isCreate, logout } = useUserStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved theme preference or prefer OS setting
    const savedTheme = localStorage.getItem("theme");
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Global Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800/90 backdrop-blur-md border-b border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                AppointMe
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg
                    className="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center space-x-6 font-medium text-gray-300">
                <Link
                  to="/"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Home
                </Link>
                {isAuthenticated && (
                  <>
                    <Link
                      to="/dashboard"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/date"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Book
                    </Link>
                    <Link
                      to="/createProfile"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="ml-4 px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      Logout
                    </button>
                  </>
                )}
                {!isAuthenticated && (
                  <>
                    <Link
                      to="/login"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-indigo-400 hover:bg-gray-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gray-800/95 backdrop-blur-md border-t border-gray-700 shadow-lg px-4 py-3 space-y-3">
            <Link
              to="/"
              className="block text-gray-300 font-medium hover:text-indigo-400"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="block text-gray-300 font-medium hover:text-indigo-400"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/date"
                  className="block text-gray-300 font-medium hover:text-indigo-400"
                  onClick={() => setMenuOpen(false)}
                >
                  Book
                </Link>
                <Link
                  to="/createProfile"
                  className="block text-gray-300 font-medium hover:text-indigo-400"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-500 font-medium hover:text-red-400 transition"
                >
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="block text-gray-300 font-medium hover:text-indigo-400"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-gray-300 font-medium hover:text-indigo-400"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Page Content */}
      <div className="pt-16 flex-1 pb-16 md:pb-0">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/date" element={<DateSelect />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/getProfile"
            element={
              isCreate ? <Profile /> : <Navigate to="createProfile" replace />
            }
          />
          <Route path="/createProfile" element={<CreateProfile />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile-complete" element={<ProfileCompletePage />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </div>

      {/* Bottom Nav for Mobile */}
      {isAuthenticated && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-gray-800/90 backdrop-blur-md border-t border-gray-700 shadow-lg flex justify-around py-2 z-50">
          <Link
            to="/"
            className="flex flex-col items-center text-gray-300 hover:text-indigo-400"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m-4 0h8"
              />
            </svg>
            <span className="text-xs">Home</span>
          </Link>
          <Link
            to="/dashboard"
            className="flex flex-col items-center text-gray-300 hover:text-indigo-400"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span className="text-xs">Dashboard</span>
          </Link>
          <Link
            to="/date"
            className="flex flex-col items-center text-gray-300 hover:text-indigo-400"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs">Book</span>
          </Link>
          <Link
            to="/createProfile"
            className="flex flex-col items-center text-gray-300 hover:text-indigo-400"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A9.969 9.969 0 0112 15c2.21 0 4.244.72 5.879 1.929M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-xs">Profile</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex flex-col items-center text-red-500 hover:text-red-400"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="text-xs">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
