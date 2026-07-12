import React from 'react';
import { Edit2, Eye, RotateCcw, Send } from 'lucide-react';
import StatusChip from '../controls/StatusChip';

const AllocationTable = ({ data = [], onView, onTransfer, onReturn }) => {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-500">
            <tr>
              <th scope="col" className="px-6 py-4">Alloc ID</th>
              <th scope="col" className="px-6 py-4">Asset Details</th>
              <th scope="col" className="px-6 py-4">Assigned To</th>
              <th scope="col" className="px-6 py-4">Status</th>
              <th scope="col" className="px-6 py-4">Date</th>
              <th scope="col" className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                  No allocations found.
                </td>
              </tr>
            ) : (
              data.map((alloc) => (
                <tr key={alloc.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {alloc.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{alloc.assetName}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{alloc.assetId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{alloc.assignedTo}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{alloc.department}</div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusChip status={alloc.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {alloc.allocatedDate}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => onView && onView(alloc)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onTransfer && onTransfer(alloc)}
                        className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                        title="Transfer Asset"
                        disabled={alloc.status === 'Returned'}
                      >
                        <Send className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onReturn && onReturn(alloc)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                        title="Return Asset"
                        disabled={alloc.status === 'Returned'}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllocationTable;
