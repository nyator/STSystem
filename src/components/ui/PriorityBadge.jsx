import React from 'react'
import { LuDot } from 'react-icons/lu';

function PriorityBadge({ priority = "Low" }) {

    const varaintColors = {
        low: "text-blue-700 dark:text-blue-400",
        medium: "text-yellow-600 dark:text-yellow-500",
        high: "text-red-700 dark:text-red-400",
    }

    const baseClass = "max-w-sm w-fit rounded-md py-1 mx-auto font-medium flex items-center justify-center text-xs"
    const classes = varaintColors[priority] ?? "gray";

    return (
        <div className="flex items-center justify-start w-fit">
            <div className={`${baseClass} ${classes} `}>
                {/* <LuDot size={20} /> */}
                {priority}
            </div>
        </div>
    )
}

export default PriorityBadge
