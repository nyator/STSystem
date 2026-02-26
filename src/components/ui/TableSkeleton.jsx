function TableSkeleton({ rows = 5 }) {
    const stickyHeaderClass = "sticky left-0 z-0 bg-gray-50 rounded-tl-xl";
    const stickyClass = "sticky left-0 z-0 bg-white rounded-bl-xl";

    const columns = [
        { key: 'id' },
        { key: 'title' },
        { key: 'customer' },
        { key: 'priority' },
        { key: 'status' },
        { key: 'createdAt', },
        { key: 'actions' },
    ]

    return (
        <div className="flex-col flex items-center w-full">
            <div className='flex flex-col rounded-xl border border-gray-200 items-center w-full'>
                <div className="w-full overflow-x-auto rounded-t-xl">
                    <table className="w-full">
                        <thead className="border-b border-gray-200 bg-gray-50 text-xs font-medium text-nowrap">
                            <tr className="w-full">
                                {columns.map((col, index) => (
                                    <th
                                        key={col.key}
                                        className={`text-left p-3 ${index === 0 ? stickyHeaderClass : ''}`}
                                    >
                                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: rows }).map((_, rowIdx) => (
                                <tr
                                    key={rowIdx}
                                    className={`border-gray-200 ${rowIdx === rows - 1 ? 'border-b-0' : 'border-b'}`}
                                >
                                    {columns.map((col, colIdx) => (
                                        <td
                                            key={col.key}
                                            className={`text-left p-2 ${colIdx === 0 ? stickyClass : ''}`}
                                        >
                                            <div className="h-4 bg-gray-200 rounded animate-pulse w-full max-w-50"></div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TableSkeleton;