import React from 'react';
import { Edit2, Eye, Trash2 } from 'lucide-react';
import StatusBadge from '../controls/StatusBadge';

const AssetTable = ({ data = [], onEdit, onView, onDelete }) => {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-500">
            <tr>
              <th scope="col" className="px-6 py-4">Asset Tag</th>
              <th scope="col" className="px-6 py-4">Name & Category</th>
              <th scope="col" className="px-6 py-4">Status</th>
              <th scope="col" className="px-6 py-4">Condition</th>
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
                    {asset.assetTag}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{asset.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{asset.category?.name || 'Uncategorized'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={asset.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-600 capitalize">
                    {asset.condition?.toLowerCase() || 'Good'}
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

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-gray-100">
        {data.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-gray-400">
            No assets found.
          </div>
        ) : (
          data.map((asset) => (
            <div key={asset.id} className="p-4 bg-white hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{asset.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{asset.assetTag} &bull; {asset.category?.name}</p>
                </div>
                <StatusBadge status={asset.status} />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-gray-600">
                <div>
                  <span className="text-gray-400 block mb-0.5">Location</span>
                  {asset.location}
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Condition</span>
                  <span className="capitalize">{asset.condition?.toLowerCase() || 'Good'}</span>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-gray-100">
                <button onClick={() => onView && onView(asset)} className="text-gray-500 hover:text-indigo-600 flex items-center gap-1.5 text-xs font-medium">
                  <Eye className="w-3.5 h-3.5" /> View
                </button>
                <button onClick={() => onEdit && onEdit(asset)} className="text-gray-500 hover:text-emerald-600 flex items-center gap-1.5 text-xs font-medium">
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => onDelete && onDelete(asset)} className="text-gray-500 hover:text-rose-600 flex items-center gap-1.5 text-xs font-medium">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AssetTable;
