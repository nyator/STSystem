import React from 'react'
import { LuTicket } from 'react-icons/lu'

function Card({ label, value, colors, id }) {
    return (
        <div key={id} className="border border-[#e5e7eb] rounded-xl overflow-clip p-2 sm:p-4 w-28 sm:w-48  relative flex flex-col sm:flex-row items-center gap-2 shadow-blue-50 shadow-md">
            <div className={` ${colors ? colors : "text-blue-500"} rounded-full p-2 w-fit`}>
                <LuTicket size={16} className="inline" />
            </div>
            <div className='flex flex-col sm:flex-row space-x-2 items-center'>
                <p className="text-lg font-bold">{value}</p>
                <h3 className="text-sm font-medium text-gray-500 text-center sm:text-start leading-3.5">{label}</h3>
            </div>
            <LuTicket size={140} className="text-[#e5e7eb16] absolute -top-5 -right-5 rotate-140" />
        </div>
    )
}

export default Card