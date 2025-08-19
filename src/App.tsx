import "react-calendar/dist/Calendar.css"; // <-- here
import { Link, Navigate, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import VerifyEmail from "./components/VerifyEmail";
import { useUserStore } from "./store/useUserStore";
import LoginForm from "./components/LoginForm";
const App: React.FC = () => {
  const { isAuthenticated } = useUserStore();
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
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
            </p>
          </div>
        }
      />
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
