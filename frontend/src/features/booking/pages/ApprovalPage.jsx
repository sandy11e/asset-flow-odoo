import React, { useState } from 'react';
import { useBookingData } from '../hooks/useBookingData';
import PageHeader from '../components/controls/PageHeader';
import ApprovalTable from '../components/tables/ApprovalTable';
import ApprovalCard from '../components/cards/ApprovalCard';
import ApprovalDialog from '../components/dialogs/ApprovalDialog';
import RejectDialog from '../components/dialogs/RejectDialog';
import BookingSearch from '../components/controls/BookingSearch';
import { CheckCircle2, AlertCircle, Grid, List, ShieldAlert } from 'lucide-react';

const ApprovalPage = () => {
  const { approvals, isLoading, approveRequest, rejectRequest } = useBookingData();

  const [viewMode, setViewMode] = useState('table'); // table | grid
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');

  const [selectedApproval, setSelectedApproval] = useState(null);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  const filtered = approvals.filter((a) => {
    const matchesQuery =
      a.bookingTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.requesterName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.resourceName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'All' || a.priority === filterPriority;
    return matchesQuery && matchesPriority;
  });

  const pendingCount = approvals.filter((a) => a.status === 'Pending').length;

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <PageHeader
        title="Manager Authorization & Approval Queue"
        subtitle="Review, authorize, or decline pending reservation requests submitted across all department teams."
        breadcrumbs={[
          { label: 'AssetFlow ERP', path: '/' },
          { label: 'Reservations Hub', path: '/booking/dashboard' },
          { label: 'Approval Queue' },
        ]}
      />

      {/* KPI Overview Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 flex items-center justify-between">
          <div>
            <span className="text-2xl font-extrabold text-amber-900 dark:text-amber-200 block">{pendingCount}</span>
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">Awaiting Decision</span>
          </div>
          <AlertCircle className="w-8 h-8 text-amber-500" />
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 flex items-center justify-between">
          <div>
            <span className="text-2xl font-extrabold text-emerald-900 dark:text-emerald-200 block">
              {approvals.filter((a) => a.status === 'Approved').length}
            </span>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Approved This Week</span>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>

        <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 flex items-center justify-between">
          <div>
            <span className="text-2xl font-extrabold text-purple-900 dark:text-purple-200 block">4.2 hrs</span>
            <span className="text-xs font-semibold text-purple-700 dark:text-purple-400">Average Turnaround</span>
          </div>
          <ShieldAlert className="w-8 h-8 text-purple-500" />
        </div>
      </div>

      {/* Controls & Filter Bar */}
      <div className="p-4 bg-white dark:bg-sidebar-hover rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <BookingSearch
            value={searchQuery}
            onSearch={setSearchQuery}
            placeholder="Search pending requests, staff, rooms..."
          />

          <div className="flex items-center gap-1">
            {['All', 'High', 'Medium', 'Low'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  filterPriority === p
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-gray-100 dark:bg-sidebar-bg text-gray-600 dark:text-gray-300'
                }`}
              >
                {p === 'All' ? 'All Priorities' : `${p} Priority`}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center bg-gray-100 dark:bg-sidebar-bg p-1 rounded-xl border border-gray-200 dark:border-gray-700 shrink-0">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white dark:bg-sidebar-hover shadow-xs text-primary-600' : 'text-gray-500'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-white dark:bg-sidebar-hover shadow-xs text-primary-600' : 'text-gray-500'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Queue Display */}
      {viewMode === 'table' ? (
        <ApprovalTable
          approvals={filtered}
          isLoading={isLoading}
          onApprove={(req) => { setSelectedApproval(req); setIsApproveOpen(true); }}
          onReject={(req) => { setSelectedApproval(req); setIsRejectOpen(true); }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((req) => (
            <ApprovalCard
              key={req.id}
              approval={req}
              onApprove={(r) => { setSelectedApproval(r); setIsApproveOpen(true); }}
              onReject={(r) => { setSelectedApproval(r); setIsRejectOpen(true); }}
            />
          ))}
          {filtered.length === 0 && !isLoading && (
            <div className="col-span-full p-12 text-center text-gray-400 bg-white dark:bg-sidebar-hover rounded-xl border border-gray-200 dark:border-gray-700">
              No authorization requests found matching current filter parameters.
            </div>
          )}
        </div>
      )}

      {/* Dialogs */}
      <ApprovalDialog
        isOpen={isApproveOpen}
        onClose={() => setIsApproveOpen(false)}
        approval={selectedApproval}
        onConfirm={async (id, comments) => {
          await approveRequest(id, comments);
        }}
      />

      <RejectDialog
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        approval={selectedApproval}
        onConfirm={async (id, reason) => {
          await rejectRequest(id, reason);
        }}
      />
    </div>
  );
};

export default ApprovalPage;
