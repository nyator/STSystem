
function Table({ columns, title, data = [] }) {
    const cols = (columns && columns.length) ? columns : (data.length ? Object.keys(data[0]).map(key => ({ key, title: key })) : []);

    const stickyHeaderClass = "sticky left-0 z-10 bg-blue-50 rounded-tl-xl";
    const stickyClass = "sticky left-0 z-10 bg-white rounded-bl-xl";

    return (
        <div className="w-full overflow-x-auto rounded-xl">
            <h1 className="">{title}</h1>
            <div className='flex flex-col rounded-xl border-2 border-gray-200 items-center w-full '>
                <table className="w-full">
                    <thead className="border-b-2 border-gray-200 bg-blue-50 text-sm font-medium">
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
                            <tr key={idx} className={` border-gray-200 ${idx === data.length - 1 ? 'border-b-0' : ' border-b-2'}`}>
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
    );
}

export default Table;