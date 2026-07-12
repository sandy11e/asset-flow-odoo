import React from 'react';
import { Edit2, Eye, Tool, CheckCircle } from 'lucide-react';

const MaintenanceTable = ({ data = [], onView, onEdit, onAssign, onComplete }) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'high': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'medium': return 'text-blue-700 bg-blue-50 border-blue-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'in progress': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'pending': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'scheduled': return 'text-indigo-700 bg-indigo-50 border-indigo-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-500">
            <tr>
              <th scope="col" className="px-6 py-4">Request ID</th>
              <th scope="col" className="px-6 py-4">Asset Details</th>
              <th scope="col" className="px-6 py-4">Priority & Type</th>
              <th scope="col" className="px-6 py-4">Status</th>
              <th scope="col" className="px-6 py-4">Technician</th>
              <th scope="col" className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                  No maintenance records found.
                </td>
              </tr>
            ) : (
              data.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {record.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{record.assetName}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{record.assetId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span className={\`inline-flex px-2 py-0.5 text-[10px] font-bold uppercase rounded border \${getPriorityColor(record.priority)}\`}>
                        {record.priority}
                      </span>
                      <span className="text-xs text-gray-500">{record.issueType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className={\`inline-flex px-2.5 py-1 text-xs font-medium rounded-full border \${getStatusColor(record.status)}\`}>
                        {record.status}
                      </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {record.assignedTechnician}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => onView && onView(record)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onAssign && onAssign(record)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Assign Technician"
                        disabled={record.status === 'Completed'}
                      >
                        <Tool className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onComplete && onComplete(record)}
                        className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                        title="Mark Complete"
                        disabled={record.status === 'Completed'}
                      >
                        <CheckCircle className="w-4 h-4" />
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

export default MaintenanceTable;
