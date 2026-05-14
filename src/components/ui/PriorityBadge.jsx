function PriorityBadge({ priority = "Low" }) {

    const varaintColors = {
        low: "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700",
        medium: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20",
        high: "bg-red-50 text-red-700 ring-red-200 dark:bg-red-500/10 dark:text-red-300 dark:ring-red-500/20",
    }

    const baseClass = "w-fit rounded-full px-2.5 py-1 font-semibold flex items-center justify-center text-[11px] ring-1"
    const classes = varaintColors[priority] ?? "gray";

    return (
        <div className="flex items-center justify-start w-fit">
            <div className={`${baseClass} ${classes} `}>
                {/* <LuDot size={20} /> */}
                {priority.toUpperCase()[0] + priority.slice(1)}
            </div>
        </div>
    )
}

export default PriorityBadge
