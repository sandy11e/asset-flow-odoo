import React, { useState, useRef } from 'react';
import { MoreVertical, Edit3, Trash2, Eye } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';

const ActionDropdown = ({ onView, onEdit, onDelete, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-lg text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-sidebar-hover transition-colors focus:outline-none"
        aria-label="Actions"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-36 rounded-lg bg-white dark:bg-sidebar-bg shadow-lg border border-gray-100 dark:border-gray-700 py-1 z-50 divide-y divide-gray-100 dark:divide-gray-700">
          {onView && (
            <button
              onClick={() => { setIsOpen(false); onView(); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-sidebar-hover text-left transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-gray-400" />
              <span>View Details</span>
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => { setIsOpen(false); onEdit(); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-sidebar-hover text-left transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-500" />
              <span>Edit</span>
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => { setIsOpen(false); onDelete(); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Delete</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;
