import React from 'react'
import { LuTicket } from 'react-icons/lu'

function Card({ label, value, colors, id }) {
    return (
        <div key={id} className="border border-[#e5e7eb] dark:border-gray-700 rounded-xl overflow-clip p-2 sm:p-4 w-full relative flex flex-col sm:flex-row items-center gap-2 shadow-blue-50 dark:shadow-gray-900 shadow-md bg-white dark:bg-gray-800">
            <div className={` ${colors ? colors : "text-blue-500"} rounded-full p-2 w-fit`}>
                <LuTicket size={16} className="inline" />
            </div>
            <div className='flex flex-col sm:flex-row space-x-2 items-center z-1'>
                <p className="text-lg font-bold dark:text-white">{value}</p>
                <h3 className="text-xs font-medium text-gray-500 dark:text-gray-300 text-center sm:text-start leading-3.5">{label}</h3>
            </div>
            <LuTicket size={140} className="text-gray-100/50 dark:text-gray-700 absolute -top-5 -right-5 rotate-140" />
        </div>
    )
}

export default Card