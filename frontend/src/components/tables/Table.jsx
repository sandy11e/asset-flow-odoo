import React from 'react';

const Table = ({ columns, data, keyField = 'id', onRowClick, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-8 text-center text-gray-500 animate-pulse">Loading data...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-8 text-center text-gray-500">No records found.</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${col.headerClassName || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr 
                key={row[keyField]} 
                onClick={() => onRowClick && onRowClick(row)}
                className={onRowClick ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${col.cellClassName || ''}`}>
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
