import { useState } from "react";
import { parseISO, isValid } from "date-fns";

export default function DatePicker({ onRangeChange = () => { } }) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleChange = (start, end) => {
        if (start && end && isValid(parseISO(start)) && isValid(parseISO(end))) {
            onRangeChange({ start: parseISO(start), end: parseISO(end) });
        } else {
            onRangeChange(null);
        }
    };

    return (
        <div className="flex flex-col items-center gap-2 text-sm bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
            <p className='text-xs text-start w-full font-semibold text-gray-800 dark:text-gray-200 mb-1 px-1' >Date </p>
            <div className="text-xs flex flex-col">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                        setStartDate(e.target.value);
                        handleChange(e.target.value, endDate);
                    }}
                    className="outline-none text-gray-600 dark:text-gray-300 cursor-pointer bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 ease-in"
                />
            </div>
            <div className="text-xs flex flex-col">
                <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => {
                        setEndDate(e.target.value);
                        handleChange(startDate, e.target.value);
                    }}
                    className="outline-none text-gray-600 dark:text-gray-300 cursor-pointer bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 ease-in"
                />
            </div>
        </div>
    );
}