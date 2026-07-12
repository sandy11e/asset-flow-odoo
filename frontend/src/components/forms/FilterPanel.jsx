import React from 'react';
import { Filter } from 'lucide-react';
import Button from '../ui/Button';

const FilterPanel = ({ title = 'Filters', children, onApply, onClear, className = '' }) => {
  return (
    <div className={`bg-white shadow rounded-lg border border-gray-200 p-4 ${className}`}>
      <div className="flex items-center mb-4">
        <Filter className="h-4 w-4 text-gray-400 mr-2" />
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {children}
      </div>
      
      {(onApply || onClear) && (
        <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-100">
          {onClear && (
            <Button variant="ghost" size="sm" onClick={onClear}>
              Clear
            </Button>
          )}
          {onApply && (
            <Button variant="primary" size="sm" onClick={onApply}>
              Apply Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
