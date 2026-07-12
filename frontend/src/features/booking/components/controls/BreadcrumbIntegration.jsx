import React from 'react';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';

const BreadcrumbIntegration = ({ items = [] }) => {
  return (
    <div className="mb-2">
      <Breadcrumbs items={items} />
    </div>
  );
};

export default BreadcrumbIntegration;
