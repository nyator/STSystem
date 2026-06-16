import Pagination from "./Pagination";
import TableCards from "./TableCards";

function Table({
  columns,
  title,
  data = [],
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPrev,
  onNext,
  itemLabel,
  height,
  onRowClick,
}) {
  const cols =
    columns && columns.length
      ? columns
      : data.length
        ? Object.keys(data[0]).map((key) => ({ key, title: key }))
        : [];
  const getCellValue = (col, row, idx) =>
    col.render ? col.render(row, idx, data.length) : (row[col.key] ?? "");

  // FIXED: Adjusted z-index strategies for proper overlapping hierarchy
  const stickyHeaderClass =
    "sticky left-0 z-30 bg-gray-50 dark:bg-gray-800 rounded-tl-lg text-nowrap transition-all duration-100 ease-in";
  const stickyClass =
    "sticky left-0 z-10 bg-white dark:bg-gray-900 group-hover:bg-gray-50 dark:group-hover:bg-gray-800 text-nowrap transition-all duration-100 ease-in";
  const stickyEndHeaderClass =
    "sticky right-0 z-30 bg-gray-50 dark:bg-gray-800 rounded-tr-lg";
  const stickyEndClass =
    "sticky right-0 z-10 bg-white dark:bg-gray-900 group-hover:bg-gray-50 dark:group-hover:bg-gray-800 text-nowrap transition-all duration-100 ease-in";

  return (
    <>
      <div className="flex-col flex items-start w-full">
        {title && (
          <h1 className="pl-2 text-xl font-semibold text-gray-950 dark:text-white sm:text-lg sm:font-medium">
            {title}
          </h1>
        )}

        <div className="flex w-full max-h-screen flex-col items-center overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm shadow-gray-200/50 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
          <div
            className={`hidden w-full relative overflow-x-auto md:block ${
              height === "sm" ? "" : "h-[calc(100vh-237px)]"
            }`}
          >
            <table className="w-full border-collapse">
              {/* FIXED: Changed z-0 to z-20 so the top-sticky row clears the scrolling body content */}
              <thead className="border-b z-20 border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500 text-nowrap sticky top-0 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-400 sm:text-[11px]">
                <tr className="w-full">
                  {cols.map((col, index) => (
                    <th
                      key={col.key}
                      className={`text-left px-4 py-3.5 sm:px-3 sm:py-3 ${
                        index === 0 ? stickyHeaderClass : ""
                      } ${index === cols.length - 1 ? stickyEndHeaderClass : ""}`}
                    >
                      {col.title || col.key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={cols.length}
                      className="p-3 text-center dark:text-gray-400"
                    >
                      No data
                    </td>
                  </tr>
                ) : (
                  data.map((row, idx) => (
                    <tr
                      key={idx}
                      onClick={() => onRowClick?.(row.id)}
                      className={`group border-gray-100 dark:border-gray-800 text-nowrap hover:bg-gray-50 dark:hover:bg-gray-800 cursor-default transition-all duration-100 ease-in ${
                        idx === data.length - 1 ? "border-b" : "border-b"
                      }`}
                    >
                      {cols.map((col, index) => (
                        <td
                          key={col.key}
                          className={`text-left px-4 py-4 text-sm text-gray-700 dark:text-gray-300 sm:px-3 sm:py-2.5 sm:text-xs ${
                            index === 0 ? stickyClass : ""
                          } ${index === cols.length - 1 ? stickyEndClass : ""}`}
                          onClick={
                            col.key === "actions"
                              ? (e) => e.stopPropagation()
                              : undefined
                          }
                        >
                          {getCellValue(col, row, idx)}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
          <TableCards
            columns={cols}
            data={data}
            height={height}
            onRowClick={onRowClick}
            getCellValue={getCellValue}
          />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          onPrev={onPrev}
          onNext={onNext}
          itemLabel={itemLabel}
          height={height}
        />
      </div>
    </>
  );
}

export default Table;
