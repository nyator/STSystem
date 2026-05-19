import { LuTicket } from "react-icons/lu";

function Card({ label, value, colors, id }) {
  return (
    <div
      key={id}
      className="group w-full rounded-lg border border-gray-200 bg-white px-4 shadow-sm shadow-gray-200/60 transition-colors hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none dark:hover:border-gray-700 "
    >
      <div className="flex min-h-14 items-center justify-between gap-3">
        <div
          className={`${colors ? colors : "bg-blue-50 text-blue-600"} flex h-10 w-10 shrink-0 items-center justify-center rounded-md sm:h-8 sm:w-8`}
        >
          <LuTicket size={18} className="inline sm:size-4" />
        </div>

        {/* FIXED: Added 'min-w-0' and 'w-full' here so the flex block respects boundaries */}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-2">
          {/* FIXED: Added 'shrink-0' so the value never gets squished by long labels */}
          <p className="shrink-0 text-lg font-semibold tracking-normal text-gray-950 dark:text-white sm:text-lg">
            {value}
          </p>
          <h3 className="truncate text-sm font-medium leading-5 text-gray-500 dark:text-gray-400 sm:mt-1 sm:text-xs sm:leading-4">
            {label}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Card;
