import React from 'react';
import Button from '@/components/ui/Button';
import { Check, X, Calendar, User, Building } from 'lucide-react';
import SkeletonLoader from '../feedback/SkeletonLoader';
import EmptyState from '../feedback/EmptyState';

const ApprovalTable = ({ approvals = [], isLoading = false, onApprove, onReject }) => {
  if (isLoading) return <SkeletonLoader count={4} />;
  if (!approvals || approvals.length === 0) {
    return <EmptyState title="No Pending Approvals" description="All reservation authorization requests have been processed." />;
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[750px]">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-sidebar-bg text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            <th className="p-3">Request ID & Priority</th>
            <th className="p-3">Booking Title</th>
            <th className="p-3">Requested Resource</th>
            <th className="p-3">Requester & Dept</th>
            <th className="p-3">Date</th>
            <th className="p-3 text-right">Decision Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-xs">
          {approvals.map((req) => (
            <tr key={req.id} className="hover:bg-gray-50/80 dark:hover:bg-sidebar-hover transition-colors">
              <td className="p-3">
                <span className="font-bold text-gray-900 dark:text-white block">{req.id}</span>
                <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded inline-block mt-0.5">
                  {req.priority || 'Medium'} Priority
                </span>
              </td>
              <td className="p-3 font-bold text-gray-900 dark:text-white truncate max-w-[180px]">
                {req.bookingTitle}
              </td>
              <td className="p-3">
                <div className="flex items-center gap-1.5 font-medium text-gray-800 dark:text-gray-200">
                  <Building className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                  <span className="truncate max-w-[150px]">{req.resourceName}</span>
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-1 font-semibold text-gray-900 dark:text-white">
                  <User className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>{req.requesterName}</span>
                </div>
                <div className="text-[10px] text-gray-400 pl-4.5">{req.department}</div>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-1 text-gray-800 dark:text-gray-200 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span>{req.requestedDate}</span>
                </div>
              </td>
              <td className="p-3 text-right">
                {req.status === 'Pending' ? (
                  <div className="flex items-center justify-end gap-1.5">
                    <Button variant="danger" size="xs" onClick={() => onReject && onReject(req)} icon={X}>
                      Reject
                    </Button>
                    <Button variant="primary" size="xs" onClick={() => onApprove && onApprove(req)} icon={Check} className="!bg-emerald-600 hover:!bg-emerald-700">
                      Approve
                    </Button>
                  </div>
                ) : (
                  <span className="font-bold text-gray-500 uppercase text-[11px]">{req.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovalTable;
