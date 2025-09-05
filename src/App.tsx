import "react-calendar/dist/Calendar.css";
import { Navigate, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
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

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Global Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                AppointMe
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-6 font-medium text-gray-700">
              <Link to="/" className="hover:text-indigo-600 transition-colors">
                Home
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/date"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Book
                  </Link>
                  <Link
                    to="/createProfile"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="ml-4 px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-700 hover:bg-gray-100"
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
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-md px-4 py-3 space-y-3">
            <Link
              to="/"
              className="block text-gray-700 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="block text-gray-700 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/date"
                  className="block text-gray-700 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Book
                </Link>
                <Link
                  to="/createProfile"
                  className="block text-gray-700 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-500 font-medium hover:text-red-600 transition"
                >
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="block text-gray-700 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-gray-700 font-medium"
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
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-md flex justify-around py-2 z-50">
          <Link
            to="/"
            className="flex flex-col items-center text-gray-600 hover:text-indigo-700"
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
            className="flex flex-col items-center text-gray-600 hover:text-indigo-700"
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
            className="flex flex-col items-center text-gray-600 hover:text-indigo-700"
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
            className="flex flex-col items-center text-gray-600 hover:text-indigo-700"
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
            className="flex flex-col items-center text-red-500 hover:text-red-600"
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
