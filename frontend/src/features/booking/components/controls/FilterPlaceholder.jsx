import React from 'react';
import { Filter } from 'lucide-react';
import Button from '@/components/ui/Button';

const FilterPlaceholder = ({ onClick, className = '' }) => {
  return (
    <Button
      variant="secondary"
      size="sm"
      icon={Filter}
      onClick={onClick || (() => alert('Opening advanced filter drawer... [Simulation Placeholder]'))}
      className={className}
    >
      Filter Options
    </Button>
  );
};

export default FilterPlaceholder;
