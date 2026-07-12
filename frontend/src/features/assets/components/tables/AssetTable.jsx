import React from 'react';
import { Edit2, Eye, Trash2, MoreVertical } from 'lucide-react';
import StatusBadge from '../controls/StatusBadge';

const AssetTable = ({ data = [], onEdit, onView, onDelete }) => {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-500">
            <tr>
              <th scope="col" className="px-6 py-4">Asset ID</th>
              <th scope="col" className="px-6 py-4">Name & Category</th>
              <th scope="col" className="px-6 py-4">Status</th>
              <th scope="col" className="px-6 py-4">Assigned To</th>
              <th scope="col" className="px-6 py-4">Location</th>
              <th scope="col" className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                  No assets found.
                </td>
              </tr>
            ) : (
              data.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {asset.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{asset.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{asset.category} &bull; {asset.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={asset.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {asset.assignedTo}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {asset.location}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => onView && onView(asset)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onEdit && onEdit(asset)}
                        className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                        title="Edit Asset"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDelete && onDelete(asset)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                        title="Delete Asset"
                      >
                        <Trash2 className="w-4 h-4" />
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

export default AssetTable;
