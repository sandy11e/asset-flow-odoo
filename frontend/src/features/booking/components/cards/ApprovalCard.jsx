import React from 'react';
import Card from '@/components/ui/Card';
import { Check, X, Calendar, User, Building, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

const ApprovalCard = ({ approval, onApprove, onReject, className = '' }) => {
  if (!approval) return null;

  return (
    <Card className={`p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover space-y-3 ${className}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
            {approval.id} • {approval.priority} Priority
          </span>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mt-0.5 truncate">{approval.bookingTitle}</h4>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 text-xs font-semibold shrink-0">
          {approval.status}
        </span>
      </div>

      <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-sidebar-bg text-xs space-y-1.5 text-gray-600 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <Building className="w-3.5 h-3.5 text-primary-500" />
          <span>Resource: <strong className="text-gray-900 dark:text-white">{approval.resourceName}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-3.5 h-3.5 text-blue-500" />
          <span>Requester: <strong className="text-gray-900 dark:text-white">{approval.requesterName} ({approval.department})</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-purple-500" />
          <span>Requested Date: <strong className="text-gray-900 dark:text-white">{approval.requestedDate}</strong></span>
        </div>
        {approval.comments && (
          <p className="text-[11px] text-gray-500 italic pt-1 border-t border-gray-200/60 dark:border-gray-700/60">
            "{approval.comments}"
          </p>
        )}
      </div>

      {approval.status === 'Pending' && (
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <Button variant="danger" size="xs" onClick={() => onReject && onReject(approval)} icon={X}>
            Reject
          </Button>
          <Button variant="primary" size="xs" onClick={() => onApprove && onApprove(approval)} icon={Check} className="!bg-emerald-600 hover:!bg-emerald-700">
            Approve
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ApprovalCard;
