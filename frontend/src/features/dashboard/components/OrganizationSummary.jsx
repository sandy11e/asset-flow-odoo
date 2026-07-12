import { SummaryCard } from './SummaryCard';

export const OrganizationSummary = () => {
  return (
    <SummaryCard title="Organization Overview">
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-gray-50">
          <span className="text-sm text-gray-500">Total Departments</span>
          <span className="font-semibold text-gray-900">12</span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-gray-50">
          <span className="text-sm text-gray-500">Total Employees</span>
          <span className="font-semibold text-gray-900">348</span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-gray-50">
          <span className="text-sm text-gray-500">Asset Categories</span>
          <span className="font-semibold text-gray-900">8</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Locations</span>
          <span className="font-semibold text-gray-900">3</span>
        </div>
      </div>
    </SummaryCard>
  );
};
