import React from 'react'
import { LuTicket } from 'react-icons/lu'

function Card({ label, value, colors, key }) {
    return (
        <div key={key} className="border border-[#e5e7eb] rounded-xl overflow-clip p-4 w-48 relative flex flex-col items-center sm:items-start gap-2 shadow-blue-50 shadow-md">
            <div className={` ${colors ? colors : "text-blue-500"} rounded-full p-2 w-fit`}>
                <LuTicket size={20} className="inline" />
            </div>
            <p className="text-lg font-bold">{value}</p>
            <h3 className="text-sm font-medium text-gray-500 text-center sm:text-start z-10">{label}</h3>
            <LuTicket size={140} className="text-[#e5e7eb16] absolute -top-5 -right-5 rotate-140" />
        </div>
    )
}

export default Card