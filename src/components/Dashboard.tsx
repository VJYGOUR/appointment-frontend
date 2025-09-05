import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

// Mock data for appointments (replace with API calls)
const mockAppointments = [
  {
    id: 1,
    title: "Dental Checkup",
    date: "2023-06-15",
    time: "10:00 AM",
    doctor: "Dr. Sarah Johnson",
    status: "confirmed",
    type: "Dental",
  },
  {
    id: 2,
    title: "Therapy Session",
    date: "2023-06-18",
    time: "2:30 PM",
    doctor: "Dr. Michael Chen",
    status: "pending",
    type: "Mental Health",
  },
  {
    id: 3,
    title: "Annual Physical",
    date: "2023-06-22",
    time: "9:15 AM",
    doctor: "Dr. Emily Rodriguez",
    status: "confirmed",
    type: "General",
  },
];

// Mock stats data
const mockStats = {
  totalAppointments: 12,
  completed: 8,
  upcoming: 3,
  cancelled: 1,
};

const Dashboard = () => {
  const { profile } = useUserStore();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [appointments] = useState(mockAppointments);
  const [stats] = useState(mockStats);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Filter appointments based on active tab
  const filteredAppointments = appointments.filter((apt) => {
    if (activeTab === "upcoming")
      return apt.status === "confirmed" || apt.status === "pending";
    if (activeTab === "completed") return apt.status === "completed";
    if (activeTab === "cancelled") return apt.status === "cancelled";
    return true;
  });

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (
    status: "confirmed" | "pending" | "cancelled" | "completed" | string
  ): string => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-lg flex items-center justify-center mr-3">
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
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-xs text-gray-500">
                {currentTime.toLocaleDateString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-800 font-medium">
                {profile?.name ? profile.name.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {getGreeting()}, {profile?.name || "User"}!
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your appointments today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-indigo-500">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2极速7a2 2 极速00-2-2H5a2 2 0 00-2 2v12极速2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Appointments
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalAppointments}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.completed}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="w-12极速12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
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
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.upcoming}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.cancelled}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointments Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Your Appointments
                </h3>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      activeTab === "upcoming"
                        ? "bg-indigo-100 text-indigo-800"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Upcoming
                  </button>
                  <button
                    onClick={() => setActiveTab("completed")}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      activeTab === "completed"
                        ? "bg-indigo-100 text-indigo-800"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => setActiveTab("cancelled")}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      activeTab === "cancelled"
                        ? "bg-indigo-100 text-indigo-800"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Cancelled
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <div key={appointment.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {appointment.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            With {appointment.doctor}
                          </p>
                          <div className="flex items-center mt-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-gray-400 mr-1"
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
                            <span className="text-xs text-gray-500">
                              {formatDate(appointment.date)} at{" "}
                              {appointment.time}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              appointment.status
                            )}`}
                          >
                            {appointment.status.charAt(0).toUpperCase() +
                              appointment.status.slice(1)}
                          </span>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-12 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4极速3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <h3 className="mt-4 text-sm font-medium text-gray-900">
                      No appointments
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {activeTab === "upcoming"
                        ? "Get started by scheduling your first appointment."
                        : `You don't have any ${activeTab} appointments.`}
                    </p>
                    <div className="mt-6">
                      <Link
                        to="/date"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="-ml-1 mr-2 h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Book Appointment
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions & Profile Summary */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Quick Actions
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                <Link
                  to="/date"
                  className="flex items-center px-6 py-4 hover:bg-gray-50 transition"
                >
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
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
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Book New Appointment
                    </h4>
                    <p className="text-sm text-gray-600">
                      Schedule a new appointment
                    </p>
                  </div>
                </Link>

                <Link
                  to="/createProfile"
                  className="flex items-center px-6 py-4 hover:bg-gray-50 transition"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="current极速"
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
                    <h4 className="font-medium text-gray-900">
                      Update Profile
                    </h4>
                    <p className="text-sm text-gray-600">
                      Edit your personal information
                    </p>
                  </div>
                </Link>

                <button className="w-full flex items-center px-6 py-4 hover:bg-gray-50 transition">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Notification Settings
                    </h4>
                    <p className="text-sm text-gray-600">
                      Manage your preferences
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Profile Summary
                </h3>
              </div>
              <div className="px-6 py-4">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-medium text-indigo-800">
                      {profile?.name
                        ? profile.name.charAt(0).toUpperCase()
                        : "U"}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {profile?.name || "User"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {profile?.email || "No email provided"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {profile?.age && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Age</span>
                      <span className="text-sm font-medium text-gray-900">
                        {profile.age} years
                      </span>
                    </div>
                  )}

                  {profile?.profession && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Profession</span>
                      <span className="text-sm font-medium text-gray-900">
                        {profile.profession}
                      </span>
                    </div>
                  )}

                  {profile?.interests && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Interests</span>
                      <span className="text-sm font-medium text-gray-900">
                        {profile.interests}
                      </span>
                    </div>
                  )}

                  <div className="pt-3">
                    <Link
                      to="/createProfile"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      View full profile →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
