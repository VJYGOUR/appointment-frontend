import { useState } from "react";
import Calendar from "react-calendar";
import type { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axiosInstance from "../api/axios";
import handleApiError from "../utils/handleApiError";
import { authService } from "../utils/authService";

// Define types for our booking data
interface BookingData {
  date: string;
  time: string;
  confirmation: string;
}

function DateSelect() {
  const [date, setDate] = useState<Date>(new Date());
  const [slots, setSlots] = useState<string[]>([]);
  const [singleSlot, setSingleSlot] = useState<string>("");
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(true);

  const handleDateChange: CalendarProps["onChange"] = async (value) => {
    if (value instanceof Date) {
      setDate(value);
      setBookingSuccess(false);
      setSingleSlot("");

      // Add a slight delay for a smoother UX
      setTimeout(async () => {
        try {
          const res = await axiosInstance.get(
            `/slots/getSlots/${value.toISOString()}`
          );
          console.log(res.data);
          setSlots(res.data.availableSlots);
        } catch (error) {
          console.error("Error fetching slots:", error);
          setSlots([]);
        }
      }, 300);
    }
  };

  const bookAppointment = async (data: string) => {
    if (!data) {
      alert("Please select a time slot first");
      return;
    }

    try {
      setIsLoading(true);
      const userId = authService.getUserId();

      if (!userId) {
        alert("Please log in to book an appointment");
        return;
      }

      const res = await axiosInstance.post("appointment/create", {
        dateTimeF: data,
        userId,
      });
      console.log(res.data);

      // Set booking success state with the appointment data
      setBookingSuccess(true);
      setBookingData({
        date: new Date(data).toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: new Date(data).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        confirmation: res.data.confirmationId || `APP-${Date.now()}`,
      });
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetBooking = () => {
    setBookingSuccess(false);
    setSingleSlot("");
    setIsCalendarOpen(true);
  };

  // Format time for display
  const formatTimeDisplay = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Book Your Appointment
          </h2>
          <p className="text-indigo-200">
            Select a date and time that works best for you
          </p>
        </div>

        {bookingSuccess && bookingData ? (
          <div className="p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="animate-scale-in">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Appointment Confirmed!
                </h3>

                <div className="bg-green-50 rounded-xl p-6 mb-6 border border-green-200">
                  <div className="flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-green-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span className="text-lg font-semibold text-green-800">
                      {bookingData.date}
                    </span>
                  </div>

                  <div className="flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-green-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span className="text-lg font-semibold text-green-800">
                      {bookingData.time}
                    </span>
                  </div>

                  <div className="bg-white rounded-lg p-3 mt-4">
                    <p className="text-sm text-gray-600">Confirmation Code</p>
                    <p className="text-lg font-mono font-bold text-indigo-700">
                      {bookingData.confirmation}
                    </p>
                  </div>
                </div>

                <div className="mb-6 p-4 bg-blue-50 rounded-xl text-left border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 极速 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      ></path>
                    </svg>
                    What to expect next
                  </h4>
                  <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                    <li>Confirmation email with details</li>
                    <li>Reminder 24 hours before your appointment</li>
                    <li>Please arrive 10-15 minutes early</li>
                  </ul>
                </div>

                <button
                  onClick={resetBooking}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 transform hover:-translate-y-1 shadow-md font-medium"
                >
                  Book Another Appointment
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Calendar Section */}
              <div className="lg:w-1/2">
                <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Select a Date
                    </h3>
                    <button
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      {isCalendarOpen ? "Collapse" : "Expand"}
                    </button>
                  </div>

                  {isCalendarOpen && (
                    <div className="animate-fade-in">
                      <Calendar
                        onChange={handleDateChange}
                        value={date}
                        className="border-0 rounded-lg bg-white p-2 shadow-sm"
                        minDate={new Date()}
                        tileClassName={({ date, view }) =>
                          view === "month" && date.getDay() === 0
                            ? "text-red-500"
                            : null
                        }
                      />
                    </div>
                  )}

                  <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200 shadow-xs">
                    <p className="text-sm text-gray-600">Selected date</p>
                    <p className="text-lg font-semibold text-indigo-700">
                      {date.toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Time Slots Section */}
              <div className="lg:w-1/2">
                <div className="bg-gray-50 rounded-xl p-4 shadow-sm h-full">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Available Time Slots
                  </h3>

                  {slots.length > 0 ? (
                    <div className="animate-fade-in">
                      <p className="text-sm text-gray-600 mb-4">
                        Choose a time that works for you
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        {slots.map((slot) => (
                          <button
                            key={slot}
                            className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                              singleSlot === slot
                                ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-md"
                                : "bg-white text-gray-800 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 shadow-xs"
                            }`}
                            onClick={() => setSingleSlot(slot)}
                          >
                            {formatTimeDisplay(slot)}
                          </button>
                        ))}
                      </div>

                      {singleSlot && (
                        <div className="mt-6 p-4 bg-white rounded-xl border border-indigo-100 shadow-sm animate-slide-up">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-sm text-gray-600">
                                Ready to book
                              </p>
                              <p className="font-semibold text-indigo-700">
                                {formatTimeDisplay(singleSlot)}
                              </p>
                            </div>
                            <button
                              onClick={() => setSingleSlot("")}
                              className="p-1 text-gray-400 hover:text-gray-600"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                ></path>
                              </svg>
                            </button>
                          </div>

                          <button
                            onClick={() => bookAppointment(singleSlot)}
                            disabled={isLoading}
                            className={`w-full py-3 rounded-xl text-white transition-all duration-300 font-medium shadow-md ${
                              isLoading
                                ? "bg-indigo-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 transform hover:-translate-y-0.5"
                            }`}
                          >
                            {isLoading ? (
                              <span className="flex items-center justify-center">
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Securing your slot...
                              </span>
                            ) : (
                              <span className="flex items-center justify-center">
                                <svg
                                  className="w-5 h-5 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                  ></path>
                                </svg>
                                Confirm Appointment
                              </span>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 animate-pulse">
                      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-indigo-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-gray-500">
                        {date
                          ? "Select a date to see available time slots"
                          : "Loading available slots..."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add custom animations */}
      <style>
        {`
          @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-scale-in {
            animation: scaleIn 0.5s ease-out;
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out;
          }
          .animate-slide-up {
            animation: slideUp 0.3s ease-out;
          }
          
          /* Custom calendar styles */
          .react-calendar {
            border: none;
            width: 100%;
            font-family: inherit;
          }
          .react-calendar__tile--active {
            background: linear-gradient(135deg, #6366F1, #8B5CF6);
            color: white;
          }
          .react-calendar__tile--now {
            background: #EFF6FF;
            color: #6366F1;
          }
        `}
      </style>
    </div>
  );
}

export default DateSelect;
