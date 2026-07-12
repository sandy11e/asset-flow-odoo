import React from 'react';

const AvailabilityIndicator = ({ isAvailable, nextSlot, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 text-xs font-semibold ${className}`}>
      <span className={`w-2.5 h-2.5 rounded-full ${isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
      <span className={isAvailable ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}>
        {isAvailable ? 'Immediate Access' : `Occupied until ${nextSlot || 'further notice'}`}
      </span>
    </div>
  );
};

export default AvailabilityIndicator;
