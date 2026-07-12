import React from 'react';
import { Trash2, CheckSquare, X } from 'lucide-react';
import Button from '@/components/ui/Button';

const BulkActionToolbar = ({ selectedCount = 0, onClearSelection, onDeleteSelected, onExportSelected, className = '' }) => {
  if (selectedCount <= 0) return null;

  return (
    <div className={`bg-primary-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-200 ${className}`}>
      <div className="flex items-center gap-2.5">
        <CheckSquare className="w-5 h-5 text-primary-200" />
        <span className="text-xs sm:text-sm font-semibold">
          {selectedCount} item{selectedCount > 1 ? 's' : ''} selected
        </span>
        <button
          onClick={onClearSelection}
          className="ml-2 text-xs text-primary-200 hover:text-white underline focus:outline-none"
        >
          Clear
        </button>
      </div>

      <div className="flex items-center gap-2">
        {onExportSelected && (
          <Button variant="secondary" size="sm" onClick={onExportSelected} className="bg-primary-700 text-white border-primary-500 hover:bg-primary-800 text-xs py-1 px-2.5">
            Export
          </Button>
        )}
        {onDeleteSelected && (
          <Button variant="danger" size="sm" onClick={onDeleteSelected} icon={Trash2} className="text-xs py-1 px-2.5">
            Delete Selected
          </Button>
        )}
      </div>
    </div>
  );
};

export default BulkActionToolbar;
