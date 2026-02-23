import React from 'react'
import { LuChevronDown } from 'react-icons/lu';

function PriorityBadge({ priority = "Low" }) {

    const varaintColors = {
        Low: "bg-green-100 text-green-700",
        Medium: "bg-yellow-100 text-yellow-700",
        High: "bg-red-100 text-red-700",
    }

    const baseClass = "max-w-sm w-fit rounded-md py-1 px-2 mx-auto font-medium flex items-center justify-center text-xs"
    const classes = varaintColors[priority] ?? "gray";

    return (
        <div className="flex items-center justify-start w-fit">
            <div className={`${baseClass} ${classes} `}>
                {priority}
                {/* <LuChevronDown size={12} className="ml-1" /> */}
            </div>
        </div>
    )
}

export default PriorityBadge