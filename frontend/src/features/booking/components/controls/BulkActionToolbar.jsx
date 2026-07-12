import React from 'react';
import { Trash2, CheckCircle2, X, Download } from 'lucide-react';
import Button from '@/components/ui/Button';

const BulkActionToolbar = ({
  selectedCount = 0,
  onClearSelection,
  onCancelSelected,
  onExportSelected,
  className = '',
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className={`flex items-center justify-between p-3 bg-primary-600 text-white rounded-xl shadow-lg transition-all animate-in fade-in-50 duration-200 ${className}`}>
      <div className="flex items-center gap-2.5">
        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
          {selectedCount}
        </span>
        <span className="text-xs sm:text-sm font-bold">Reservations Selected</span>
      </div>

      <div className="flex items-center gap-2">
        {onCancelSelected && (
          <Button variant="danger" size="xs" onClick={onCancelSelected} icon={Trash2}>
            Cancel Selected
          </Button>
        )}
        {onExportSelected && (
          <Button variant="secondary" size="xs" onClick={onExportSelected} icon={Download} className="!bg-white/10 !text-white hover:!bg-white/20 !border-transparent">
            Export (.CSV)
          </Button>
        )}
        <Button variant="ghost" size="xs" onClick={onClearSelection} icon={X} className="!text-white hover:!bg-white/10">
          Clear
        </Button>
      </div>
    </div>
  );
};

export default BulkActionToolbar;
