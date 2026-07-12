import React from 'react';
import BasePageHeader from '@/components/layout/PageHeader';

const PageHeader = ({ title, subtitle, breadcrumbs, actions }) => {
  return (
    <BasePageHeader
      title={title}
      subtitle={subtitle}
      breadcrumbs={breadcrumbs}
      actions={actions}
    />
  );
};

export default PageHeader;
