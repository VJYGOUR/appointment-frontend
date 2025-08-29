import { useState } from "react";
import Calendar from "react-calendar";
import type {CalendarProps} from 'react-calendar'
import "react-calendar/dist/Calendar.css"; // important for styling
function DateSelect() {
    const [date, setDate] = useState<Date>(new Date());
    const handleDateChange: CalendarProps['onChange'] = (value) => {
        if (value instanceof Date) {
            setDate(value);
        }
        console.log(new Date(date));
    };
    return (
        <div>
            <Calendar onChange={handleDateChange} value={date} />
            <p className="text-center mt-4">Selected date: {date.toISOString()}</p>
        </div>
    );
}
    export default DateSelect;