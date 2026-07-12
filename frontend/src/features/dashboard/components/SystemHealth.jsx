import { SummaryCard } from './SummaryCard';

export const SystemHealth = () => {
  return (
    <SummaryCard title="System Health">
      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Storage Capacity</span>
            <span className="font-medium text-gray-900">45%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary-500 h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">API Response Time</span>
            <span className="font-medium text-green-600">120ms (Excellent)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
          </div>
        </div>
      </div>
    </SummaryCard>
  );
};
