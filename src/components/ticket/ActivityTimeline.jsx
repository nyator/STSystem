import { LuCircleDot, LuMessageSquare, LuRefreshCcwDot, LuUserPlus, LuFlag, LuTicketPlus } from "react-icons/lu"

const iconByType = {
    created: LuTicketPlus,
    assignment: LuUserPlus,
    status: LuRefreshCcwDot,
    priority: LuFlag,
    comment: LuMessageSquare,
}

function ActivityTimeline({ activity = [], emptyText = "No activity yet" }) {
    if (!activity.length) {
        return <p className="text-xs text-gray-400">{emptyText}</p>
    }

    return (
        <div className="space-y-2">
            {activity
                .slice()
                .reverse()
                .map((event) => {
                    const Icon = iconByType[event.type] || LuCircleDot
                    return (
                        <div key={event.id} className="relative flex gap-2 rounded-lg border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-gray-900">
                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                                <Icon size={13} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{event.message}</p>
                                <p className="text-[10px] text-gray-400">
                                    {event.actor ? `by ${event.actor} • ` : ""}
                                    {event.createdAt ? new Date(event.createdAt).toUTCString().slice(5, -7) : ""}
                                </p>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default ActivityTimeline
