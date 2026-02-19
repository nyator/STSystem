import React from 'react';

function Table({ columns, data = [], className = '' }) {
  const cols = (columns && columns.length) ? columns : (data.length ? Object.keys(data[0]).map(key => ({ key, title: key })) : []);

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead className="border-b-2 border-gray-200 bg-black/5 text-sm font-medium">
          <tr className="w-full">  
            {cols.map(col => (
              <th key={col.key} className="text-left p-3">{col.title || col.key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={cols.length} className="p-3 text-center">No data</td>
            </tr>
          ) : data.map((row, idx) => (
            <tr key={idx} className="border-b-2 border-gray-200">
              {cols.map(col => (
                <td key={col.key} className="text-left p-2">
                  {col.render ? col.render(row, idx) : (row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
