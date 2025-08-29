import "react-calendar/dist/Calendar.css"; // <-- here
import { Link, Navigate, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import VerifyEmail from "./components/VerifyEmail";
import { useUserStore } from "./store/useUserStore";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import CreateProfile from "./components/CreateProfile";
import DateSelect from "./components/DateSelect";
const App: React.FC = () => {
  const { isAuthenticated, isCreate } = useUserStore();
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/date" element={<DateSelect />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      <Route
        path="/"
        element={
          <div className="flex justify-center items-center min-h-screen bg-yellow-500">
            <p className="text-lg">
              Go to{" "}
              <Link to="/register" className="text-blue-600 underline">
                Register
              </Link>
              or{" "}
              <Link to="/login" className="text-blue-600 underline">
                Login
              </Link>
              or{" "}
              <Link to="/createProfile" className="text-blue-600 underline">
                createProfile
              </Link>
            </p>
          </div>
        }
      />
      <Route
        path="/getProfile"
        element={
          isCreate ? <Profile /> : <Navigate to="createProfile" replace />
        }
      />
      <Route path="/createProfile" element={<CreateProfile />} />
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <p>login succesfuly</p>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default App;
