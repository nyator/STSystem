import Pagination from './Pagination'

function Table({
    columns,
    title,
    data = [],
    currentPage = 1,
    totalPages = 1,
    totalItems = 0,
    onPrev,
    onNext,
}) {
    const cols =
        columns && columns.length
            ? columns
            : data.length
                ? Object.keys(data[0]).map((key) => ({ key, title: key }))
                : []

    const stickyHeaderClass =
        'sticky left-0 z-0 bg-gray-50 dark:bg-gray-700 rounded-tl-xl'
    const stickyClass =
        'sticky left-0 z-0 bg-white dark:bg-gray-800 group-hover:bg-gray-50 dark:group-hover:bg-gray-700 text-nowrap transition-all duration-100 ease-in'
    const stickyEndHeaderClass = 'sticky right-0 z-0 bg-gray-50 dark:bg-gray-700 rounded-tr-xl'
    const stickyEndClass = 'sticky right-0 bg-white dark:bg-gray-800 group-hover:bg-gray-50 dark:group-hover:bg-gray-700 text-nowrap transition-all duration-100 ease-in'

    return (
        <>
            {/* Shared edit modal — driven by selectedRowId */}
            {/* <EditTicketModal
                ticketId={selectedRowId}
                onClose={() => setSelectedRowId(null)}
            /> */}

            {/* <TicketDrawer/> */}

            <div className="flex-col flex items-center w-full">
                {title ? (
                    <h1 className="font-black text-2xl dark:text-white mb-3">{title}</h1>
                ) : null}

                <div className="flex flex-col rounded-xl border border-gray-200 dark:border-gray-700 items-center w-full max-h-screen overflow-auto">
                    <div className="w-full relative overflow-x-auto rounded-t-xl">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-xs font-medium text-nowrap sticky top-0">
                                <tr className="w-full">
                                    {cols.map((col, index) => (
                                        <th
                                            key={col.key}
                                            className={`text-left py-3 px-2 dark:text-gray-200 ${index === 0 ? stickyHeaderClass : ''
                                                } ${index === cols.length - 1 ? stickyEndHeaderClass : ''}`}
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
                                            className={`group border-gray-200 dark:border-gray-700 text-nowrap hover:bg-gray-50 dark:hover:bg-gray-700 cursor-default transition-all duration-100 ease-in ${idx === data.length - 1
                                                ? 'border-b-0'
                                                : 'border-b'
                                                }`}
                                        >
                                            {cols.map((col, index) => (
                                                <td
                                                    key={col.key}
                                                    className={`text-left p-2 dark:text-gray-300 ${index === 0 ? stickyClass : ''
                                                        } ${index === cols.length - 1 ? stickyEndClass : ''}`}
                                                    onClick={
                                                        col.key === 'actions'
                                                            ? (e) => e.stopPropagation()
                                                            : undefined
                                                    }
                                                >
                                                    {col.render
                                                        ? col.render(row, idx, data.length)
                                                        : (row[col.key] ?? '')}
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
                />
            </div>
        </>
    )
}

export default Table
