import { useState } from "react";
import Calendar from "react-calendar";
import type {CalendarProps} from 'react-calendar'
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
    const [singleSlot, setSingleSlot] = useState<string>('');
    const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
    const [bookingData, setBookingData] = useState<BookingData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleDateChange: CalendarProps['onChange'] = async (value) => {
        if (value instanceof Date) {
            setDate(value);
            setBookingSuccess(false);
            const res = await axiosInstance.get(`/slots/getSlots/${value.toISOString()}`);
            console.log(res.data);
            setSlots(res.data.availableSlots);
        }
    };

    const bookAppointment = async (data: string) => {
        if (!data) {
            alert('Please select a time slot first');
            return;
        }
        
        try {
            setIsLoading(true);
            const userId = authService.getUserId();
            
            if (!userId) {
                alert('Please log in to book an appointment');
                return;
            }
            
            const res = await axiosInstance.post('appointment/create', {dateTimeF: data, userId});
            console.log(res.data);
            
            // Set booking success state with the appointment data
            setBookingSuccess(true);
            setBookingData({
                date: new Date(data).toLocaleDateString(),
                time: new Date(data).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                }),
                confirmation: res.data.confirmationId || `APP-${Date.now()}`
            });
        } catch(err) {
            handleApiError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const resetBooking = () => {
        setBookingSuccess(false);
        setSingleSlot('');
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Select Appointment Date & Time</h2>
            
            {bookingSuccess && bookingData ? (
                <div className="text-center py-8">
                    <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                        <div className="flex justify-center mb-4">
                            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-green-800 mb-2">Appointment Booked Successfully!</h3>
                        <p className="text-gray-700 mb-1">Your appointment has been confirmed for:</p>
                        <p className="text-lg font-medium text-gray-900 mb-1">{bookingData.date} at {bookingData.time}</p>
                        <p className="text-sm text-gray-600 mt-4">Confirmation #: {bookingData.confirmation}</p>
                        
                        <button 
                            onClick={resetBooking}
                            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                        >
                            Book Another Appointment
                        </button>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg text-left">
                        <h4 className="font-semibold text-blue-800 mb-2">What to expect next:</h4>
                        <ul className="list-disc list-inside text-sm text-blue-700">
                            <li>You will receive a confirmation email shortly</li>
                            <li>Please arrive 10 minutes before your scheduled time</li>
                            <li>Bring any necessary documents with you</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                        <Calendar 
                            onChange={handleDateChange} 
                            value={date} 
                            className="border rounded-lg p-2 shadow-sm"
                        />
                        <p className="text-center mt-4 text-gray-700 font-medium">
                            Selected date: <span className="text-blue-600">{date.toLocaleDateString()}</span>
                        </p>
                    </div>
                    
                    <div className="md:w-1/2">
                        {slots.length > 0 ? (
                            <div className="time-slots">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Available Time Slots</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {slots.map((slot) => (
                                    <button
                                        key={slot}
                                        className={`time-slot-btn py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                                        singleSlot === slot 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-gray-100 text-gray-800 hover:bg-blue-100'
                                        }`}
                                        onClick={() => setSingleSlot(slot)}
                                    >
                                        {new Date(slot).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                        })}
                                    </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-50 rounded-lg p-4 text-center">
                                <p className="text-gray-500">Select a date to see available time slots</p>
                            </div>
                        )}
                        
                        {singleSlot && (
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <p className="text-gray-700 mb-2">
                                    Selected time: <span className="font-semibold text-blue-700">
                                        {new Date(singleSlot).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                    </span>
                                </p>
                                <button 
                                    onClick={() => bookAppointment(singleSlot)}
                                    disabled={isLoading}
                                    className={`w-full py-2 rounded-md text-white transition-colors font-medium shadow-md ${
                                        isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : 'Book Appointment'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DateSelect;