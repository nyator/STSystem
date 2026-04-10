import { LuDot } from 'react-icons/lu';

function StatusBadge({ status = "open" }) {

    const variantColors = {
        open:          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        assigned:      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        "in progress": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        resolved:      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        closed:        "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
        reopened:      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    }

    const formatLabel = (s) =>
        s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

    const baseClass = "w-fit px-2 py-1 rounded-md font-medium flex items-center justify-center text-xs text-nowrap"
    const colorClass = variantColors[status] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"

    return (
        <div className="flex items-center justify-start w-fit">
            <div className={`${baseClass} ${colorClass}`}>
                {/* <LuDot size={16} /> */}
                {formatLabel(status)}
            </div>
        </div>
    )
}

export default StatusBadge