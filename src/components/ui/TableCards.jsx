function TableCards({ columns, data, height, onRowClick, getCellValue }) {
  const visibleCols = columns.filter((col) => col.key !== "actions");
  const mobileCols = visibleCols.filter((col) => col.mobile !== false);
  const actionsCol = columns.find((col) => col.key === "actions");

  return (
    <div
      className={`w-full overflow-y-auto p-2 md:hidden ${
        height === "sm" ? "" : "max-h-[calc(100vh-237px)]"
      }`}
    >
      {data.length === 0 ? (
        <div className="rounded-md border border-dashed border-gray-200 p-4 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
          No data
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 xs:grid-cols-2">
          {data.map((row, idx) => {
            const compactCols = mobileCols.length
              ? mobileCols
              : visibleCols.slice(0, 3);
          const primaryCol =
            compactCols.find((col) => col.mobilePrimary) || compactCols[0];
          const asideCol = compactCols.find((col) => col.mobileAside);
          const detailCols = compactCols
            .filter(
              (col) =>
                col.key !== primaryCol?.key && col.key !== asideCol?.key,
            )
            .slice(0, 3);

            return (
              <article
                key={idx}
                onClick={() => onRowClick?.(row.id)}
                role={onRowClick ? "button" : undefined}
                tabIndex={onRowClick ? 0 : undefined}
                className="rounded-md border border-gray-200 bg-white p-2 shadow-sm shadow-gray-200/40 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none dark:hover:bg-gray-800"
              >
                {primaryCol && (
                  <div className="flex min-w-0 items-end justify-between gap-2 border-b border-gray-100 pb-2 dark:border-gray-800">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase text-gray-400">
                        {primaryCol.title || primaryCol.key}
                      </p>
                      <div className="min-w-0 text-xs font-medium text-gray-900 dark:text-white">
                        {getCellValue(primaryCol, row, idx)}
                      </div>
                    </div>

                  {(asideCol || actionsCol) && (
                    <div className="flex shrink-0 items-center gap-2">
                      {asideCol && (
                        <div className="max-w-32 text-right">
                          {getCellValue(asideCol, row, idx)}
                        </div>
                      )}

                      {actionsCol && (
                        <div onClick={(event) => event.stopPropagation()}>
                          {getCellValue(actionsCol, row, idx)}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                )}

                <div className="flex flex-wrap gap-x-6 gap-y-1.5">
                  {detailCols.map((col) => (
                    <div key={col.key} className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase text-gray-400">
                        {col.title || col.key}
                      </p>
                      <div className="w-fit min-w-0 text-xs text-gray-700 dark:text-gray-300">
                        {getCellValue(col, row, idx)}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TableCards;
