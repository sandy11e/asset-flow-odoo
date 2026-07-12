import { Calendar } from 'lucide-react';

export const DateRangeSelector = () => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Calendar className="h-4 w-4 text-gray-400" />
      </div>
      <select className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 shadow-sm appearance-none">
        <option>Last 7 Days</option>
        <option>Last 30 Days</option>
        <option>This Month</option>
        <option>This Quarter</option>
        <option>Year to Date</option>
      </select>
    </div>
  );
};
