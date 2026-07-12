import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

export const RefreshButton = ({ onRefresh }) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = async () => {
    setIsSpinning(true);
    if (onRefresh) {
      await onRefresh();
    } else {
      await new Promise(res => setTimeout(res, 500)); // Default mock delay
    }
    setIsSpinning(false);
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 border border-gray-300 rounded-lg bg-white text-gray-500 hover:text-primary-600 hover:border-primary-500 hover:bg-primary-50 transition-colors shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
      aria-label="Refresh Dashboard"
    >
      <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin text-primary-600' : ''}`} />
    </button>
  );
};
