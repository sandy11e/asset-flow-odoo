import React from 'react';
import { Download } from 'lucide-react';
import Button from '@/components/ui/Button';

const ExportPlaceholder = ({ onExport, className = '' }) => {
  return (
    <Button
      variant="secondary"
      size="sm"
      icon={Download}
      onClick={onExport || (() => alert('Exporting reservation report... [Simulation Placeholder]'))}
      className={className}
    >
      Export Schedule
    </Button>
  );
};

export default ExportPlaceholder;
