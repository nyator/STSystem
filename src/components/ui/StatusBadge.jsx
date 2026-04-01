import { LuDot } from 'react-icons/lu';

function StatusBadge({ status = "Open" }) {

    const varaintColors = {
        open: "bg-red-100 text-red-700 dark:bg-red-300 dark:text-red-700",
        assigned: "bg-blue-100 text-blue-700 dark:bg-blue-300 dark:text-blue-700",
        "in progress": "bg-yellow-100 text-yellow-700 dark:bg-yellow-200 dark:text-yellow-700",
        resolved: "bg-green-100 text-green-700 dark:bg-green-300 dark:text-green-700",
        closed: "bg-green-100 text-green-700 dark:bg-green-300 dark:text-green-700",
        reopened: "bg-green-100 text-green-700 dark:bg-green-300 dark:text-green-700",
    }

    const baseClass = "max-w-sm w-fit px-2 text-nowrap rounded-md py-1 mx-auto font-medium flex items-center justify-center text-xs"
    const classes = varaintColors[status] ?? "gray";

    return (
        <div className="flex items-center justify-start w-fit">
            <div className={`${baseClass} ${classes}`}>
                {/* <LuDot size={20} /> */}
                {status.toUpperCase()[0] + status.slice(1)}
            </div>
        </div>
    )
}

export default StatusBadge
