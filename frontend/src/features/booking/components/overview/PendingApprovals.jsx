import React from 'react';
import Card from '@/components/ui/Card';
import { AlertCircle, Check, X } from 'lucide-react';
import Button from '@/components/ui/Button';

const PendingApprovals = ({ approvals = [], onApprove, onReject, className = '' }) => {
  const pending = approvals.filter((a) => a.status === 'Pending').slice(0, 3);

  return (
    <Card className={`p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          <span>Action Required: Pending Approvals</span>
        </h4>
        {pending.length > 0 && (
          <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold">
            {pending.length} New
          </span>
        )}
      </div>

      <div className="space-y-2.5">
        {pending.map((req) => (
          <div key={req.id} className="p-3 rounded-xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-2 text-xs">
            <div className="flex justify-between items-start">
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-amber-600 block uppercase">{req.id} • {req.priority}</span>
                <h5 className="font-bold text-gray-900 dark:text-white truncate">{req.bookingTitle}</h5>
                <p className="text-gray-600 dark:text-gray-300 truncate mt-0.5">{req.resourceName} ({req.requesterName})</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <Button variant="danger" size="xs" onClick={() => onReject && onReject(req)} icon={X}>
                Reject
              </Button>
              <Button variant="primary" size="xs" onClick={() => onApprove && onApprove(req)} icon={Check} className="!bg-emerald-600 hover:!bg-emerald-700">
                Approve
              </Button>
            </div>
          </div>
        ))}
        {pending.length === 0 && (
          <p className="text-xs text-gray-400 italic py-4 text-center">No pending authorization requests.</p>
        )}
      </div>
    </Card>
  );
};

export default PendingApprovals;
