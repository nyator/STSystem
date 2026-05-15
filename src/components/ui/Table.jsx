import Pagination from "./Pagination";

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

  const stickyHeaderClass =
    "sticky left-0 z-0 bg-gray-50 dark:bg-gray-800 rounded-tl-lg";
  const stickyClass =
    "sticky left-0 z-0 bg-white dark:bg-gray-900 group-hover:bg-gray-50 dark:group-hover:bg-gray-800 text-nowrap transition-all duration-100 ease-in";
  const stickyEndHeaderClass =
    "sticky right-0 z-0 bg-gray-50 dark:bg-gray-800 rounded-tr-lg";
  const stickyEndClass =
    "sticky right-0 bg-white dark:bg-gray-900 group-hover:bg-gray-50 dark:group-hover:bg-gray-800 text-nowrap transition-all duration-100 ease-in";

  return (
    <>
      {/* Shared edit modal — driven by selectedRowId */}
      {/* <EditTicketModal
          ticketId={selectedRowId}
          onClose={() => setSelectedRowId(null)}
      /> */}

      {/* <TicketDrawer /> */}

      <div className="flex-col flex items-center w-full">
        {title && (
          <h1 className="mb-3 text-lg font-semibold text-gray-950 dark:text-white">
            {title}
          </h1>
        )}

        <div className="flex w-full max-h-screen flex-col items-center overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm shadow-gray-200/50 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
          <div
            className={`w-full relative overflow-x-auto ${
              height === "sm" ? "" : "h-[calc(100vh-237px)]"
            }`}
          >
            <table className="w-full border-collapse">
              <thead className="border-b z-5 border-gray-200 bg-gray-50 text-[11px] font-semibold uppercase tracking-wide text-gray-500 text-nowrap sticky top-0 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-400">
                <tr className="w-full">
                  {cols.map((col, index) => (
                    <th
                      key={col.key}
                      className={`text-left py-3 px-3 ${
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
                          className={`text-left px-3 py-2.5 text-gray-700 dark:text-gray-300 ${
                            index === 0 ? stickyClass : ""
                          } ${index === cols.length - 1 ? stickyEndClass : ""}`}
                          onClick={
                            col.key === "actions"
                              ? (e) => e.stopPropagation()
                              : undefined
                          }
                        >
                          {col.render
                            ? col.render(row, idx, data.length)
                            : (row[col.key] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

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
