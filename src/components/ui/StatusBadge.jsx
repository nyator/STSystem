import { LuDot } from 'react-icons/lu';


function StatusBadge({ status = "Open" }) {

    const varaintColors = {
        Progress: "text-yellow-600",
        Resolved: " text-blue-700",
        Open: "text-red-700",
    }

    const baseClass = "max-w-sm w-fit text-nowrap rounded-md py-1 mx-auto font-medium flex items-center justify-center text-xs"
    const classes = varaintColors[status] ?? "gray";

    return (
        <div className="flex items-center justify-start w-fit">
            <div className={`${baseClass} ${classes}`}>
                <LuDot size={20} />
                {status}
            </div>
        </div>
    )
}

export default StatusBadge