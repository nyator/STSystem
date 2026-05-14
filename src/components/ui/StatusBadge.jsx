function StatusBadge({ status = "open" }) {

    const variantColors = {
        open:          "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20",
        assigned:      "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/20",
        "in progress": "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20",
        resolved:      "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20",
        closed:        "bg-gray-100 text-gray-600 ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700",
        reopened:      "bg-orange-50 text-orange-700 ring-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:ring-orange-500/20",
    }

    const formatLabel = (s) =>
        s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

    const baseClass = "min-w-20 px-2.5 py-1 rounded-full font-semibold flex items-center justify-center text-[11px] text-nowrap ring-1"
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
