import "react-calendar/dist/Calendar.css";
import { Navigate, Route, Routes } from "react-router-dom";
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
  const { isAuthenticated, isCreate } = useUserStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
  );
};

export default App;
