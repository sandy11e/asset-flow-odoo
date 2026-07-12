import React from 'react';
import { FolderX } from 'lucide-react';

const EmptyState = ({ 
  icon: Icon = FolderX, 
  title = 'No Data Found', 
  description = 'There are no records to display at this time.', 
  action,
  className = ''
}) => {
  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      <Icon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">{description}</p>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
