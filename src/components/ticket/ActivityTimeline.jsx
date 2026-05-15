import {
  LuCircleDot,
  LuMessageSquare,
  LuRefreshCcwDot,
  LuUser,
  LuFlag,
  LuPlus,
} from "react-icons/lu";

const iconByType = {
  created: LuPlus,
  assignment: LuUser,
  status: LuRefreshCcwDot,
  priority: LuFlag,
  comment: LuMessageSquare,
};

function ActivityTimeline({ activity = [], emptyText = "No activity yet" }) {
  if (!activity.length) {
    return <p className="text-xs text-gray-400 p-2">{emptyText}</p>;
  }

  // Define reversed list here so it's accessible for index checks
  const reversedActivity = [...activity].reverse();

  return (
    <div className="mt-2 flex flex-col">
      {reversedActivity.map((event, index) => {
        const Icon = iconByType[event.type] || LuCircleDot;
        const isLast = index === reversedActivity.length - 1;

        return (
          <div
            key={event.id || index}
            className="relative flex gap-2 px-2 pb-2"
          >
            {!isLast && (
              <span
                className="absolute left-[20px] top-[26px] h-[calc(100%-14px)] w-[1px] bg-gray-200 dark:bg-gray-700"
                aria-hidden="true"
              />
            )}

            <div className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue-300 bg-blue-50 text-blue-500 dark:border-blue-600 dark:bg-blue-900 dark:text-gray-400">
              <Icon size={12} strokeWidth={2.5} />
            </div>

            {/* Content Area */}
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="leading-tight text-gray-600 dark:text-gray-400">
                {event.actor ? (
                  <div className="flex flex-col text-[10px]">
                    <span className="font-medium text-gray-900 dark:text-gray-200">
                      {event.actor}
                    </span>{" "}
                    <span>
                      {event.type === "comment"
                        ? "added a comment"
                        : event.message.replace(event.actor, "").trim()}
                    </span>
                  </div>
                ) : (
                  event.message
                )}
              </p>

              <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">
                {event.timeAgo ||
                  (event.createdAt
                    ? new Date(event.createdAt).toLocaleDateString()
                    : "")}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ActivityTimeline;
