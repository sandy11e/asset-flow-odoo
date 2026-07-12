import React from 'react';
import { Upload } from 'lucide-react';
import Button from '@/components/ui/Button';

const ImportPlaceholder = ({ onImport, className = '' }) => {
  return (
    <Button
      variant="secondary"
      size="sm"
      icon={Upload}
      onClick={onImport || (() => alert('Importing external bookings (.CSV)... [Simulation Placeholder]'))}
      className={className}
    >
      Import Bookings
    </Button>
  );
};

export default ImportPlaceholder;
