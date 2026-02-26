
function Table({ columns, title, data = [] }) {
    const cols = (columns && columns.length) ? columns : (data.length ? Object.keys(data[0]).map(key => ({ key, title: key })) : []);

    const stickyHeaderClass = "sticky left-0 z-0 bg-gray-50 rounded-tl-xl";
    const stickyClass = "sticky left-0 z-0 bg-white rounded-bl-xl text-nowrap";
    

    return (
        <div className="flex-col flex items-center w-full">
            <h1 className="font-black text-2xl">{title}</h1>
            <div className='flex flex-col rounded-xl border border-gray-200 items-center w-full'>
                <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-sm rounded-t-xl">
                    <table className="w-full">
                        <thead className="border-b border-gray-200 bg-gray-50 text-xs font-medium text-nowrap">
                            <tr className="w-full">
                                {cols.map((col, index) => (
                                    <th
                                        key={col.key}
                                        className={`text-left p-3 ${index === 0 ? stickyHeaderClass : ''}`}
                                    >
                                        {col.title || col.key}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={cols.length} className="p-3 text-center">No data</td>
                                </tr>
                            ) : data.map((row, idx) => (
                                <tr key={idx} className={` border-gray-200 text-nowrap  ${idx === data.length - 1 ? 'border-b-0' : ' border-b'}`}>
                                    {cols.map((col, index) => (
                                        <td
                                            key={col.key}
                                            className={`text-left p-2 ${index === 0 ? stickyClass : ''}`}
                                        >
                                            {col.render ? col.render(row, idx) : (row[col.key] ?? '')}
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

export default Table;